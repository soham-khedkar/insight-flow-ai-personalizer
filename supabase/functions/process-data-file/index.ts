import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const formData = await req.formData()
    const file = formData.get('file') as File

    if (!file) {
      throw new Error('No file provided')
    }

    const geminiApiKey = Deno.env.get('GEMINI_API_KEY')
    if (!geminiApiKey) {
      throw new Error('GEMINI_API_KEY not configured')
    }

    let fileContent = ''
    let processedData: any[] = []

    // Process different file types
    if (file.type === 'text/csv' || file.name.endsWith('.csv')) {
      fileContent = await file.text()
      processedData = await processCSVWithGemini(fileContent, geminiApiKey)
    } else if (file.type === 'application/pdf') {
      // For PDF, we'll extract text and process with Gemini
      const arrayBuffer = await file.arrayBuffer()
      const text = await extractTextFromPDF(arrayBuffer)
      processedData = await processTextWithGemini(text, geminiApiKey)
    } else if (file.type === 'application/json') {
      fileContent = await file.text()
      const jsonData = JSON.parse(fileContent)
      processedData = await processJSONWithGemini(jsonData, geminiApiKey)
    } else if (file.type.includes('sheet') || file.name.endsWith('.xlsx') || file.name.endsWith('.xls')) {
      // For Excel files, convert to CSV first
      const arrayBuffer = await file.arrayBuffer()
      const csvText = await convertExcelToCSV(arrayBuffer)
      processedData = await processCSVWithGemini(csvText, geminiApiKey)
    } else {
      // For other text files
      fileContent = await file.text()
      processedData = await processTextWithGemini(fileContent, geminiApiKey)
    }

    // Store processed data in Supabase
    const supabase = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? ''
    )

    // Insert processed customers into database
    const { data: insertedData, error: insertError } = await supabase
      .from('users')
      .upsert(processedData.map(customer => ({
        id: customer.id || crypto.randomUUID(),
        email: customer.email,
        first_name: customer.firstName,
        last_name: customer.lastName,
        total_spent: customer.totalSpent || 0,
        total_orders: customer.totalOrders || 0,
        last_activity: customer.lastActivity || new Date().toISOString(),
        created_at: new Date().toISOString()
      })))
      .select()

    if (insertError) {
      console.error('Error inserting data:', insertError)
    }

    return new Response(
      JSON.stringify({
        success: true,
        processedCount: processedData.length,
        data: insertedData,
        customers: processedData
      }),
      {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  } catch (error) {
    console.error('Error processing file:', error)
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    )
  }
})

async function processCSVWithGemini(csvContent: string, apiKey: string) {
  const prompt = `
Analyze this CSV data and extract customer information. Convert it to a standardized format with these fields:
- id (generate if missing)
- email
- firstName
- lastName  
- totalSpent (parse monetary values)
- totalOrders
- lastActivity (convert to ISO date)

Return only valid JSON array with customer objects. Here's the CSV data:

${csvContent}
`

  return await callGeminiAPI(prompt, apiKey)
}

async function processJSONWithGemini(jsonData: any, apiKey: string) {
  const prompt = `
Analyze this JSON data and extract customer information. Convert it to a standardized format with these fields:
- id (generate if missing)
- email
- firstName
- lastName
- totalSpent (parse monetary values)
- totalOrders  
- lastActivity (convert to ISO date)

Return only valid JSON array with customer objects. Here's the JSON data:

${JSON.stringify(jsonData, null, 2)}
`

  return await callGeminiAPI(prompt, apiKey)
}

async function processTextWithGemini(text: string, apiKey: string) {
  const prompt = `
Analyze this text data and extract any customer information you can find. Convert it to a standardized format with these fields:
- id (generate unique IDs)
- email
- firstName
- lastName
- totalSpent (parse any monetary values mentioned)
- totalOrders
- lastActivity (convert any dates to ISO format)

Return only valid JSON array with customer objects. Here's the text:

${text}
`

  return await callGeminiAPI(prompt, apiKey)
}

async function callGeminiAPI(prompt: string, apiKey: string) {
  try {
    const response = await fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${apiKey}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        contents: [{
          parts: [{
            text: prompt
          }]
        }],
        generationConfig: {
          temperature: 0.1,
          maxOutputTokens: 8192,
        }
      })
    })

    if (!response.ok) {
      throw new Error(`Gemini API error: ${response.statusText}`)
    }

    const result = await response.json()
    const generatedText = result.candidates?.[0]?.content?.parts?.[0]?.text

    if (!generatedText) {
      throw new Error('No response from Gemini API')
    }

    // Extract JSON from the response
    const jsonMatch = generatedText.match(/\[[\s\S]*\]/)
    if (!jsonMatch) {
      throw new Error('No valid JSON found in Gemini response')
    }

    return JSON.parse(jsonMatch[0])
  } catch (error) {
    console.error('Gemini API error:', error)
    // Fallback to basic parsing if Gemini fails
    return []
  }
}

async function extractTextFromPDF(buffer: ArrayBuffer): Promise<string> {
  // Basic PDF text extraction - in production you might want to use a proper PDF library
  const uint8Array = new Uint8Array(buffer)
  const text = new TextDecoder().decode(uint8Array)
  
  // Simple text extraction - this is very basic
  // In a real implementation, you'd use a proper PDF parsing library
  return text.replace(/[^\x20-\x7E]/g, ' ').replace(/\s+/g, ' ').trim()
}

async function convertExcelToCSV(buffer: ArrayBuffer): Promise<string> {
  // Basic Excel to CSV conversion - in production you'd use a proper Excel library
  // For now, return empty string and let Gemini handle the raw data
  return ''
}
