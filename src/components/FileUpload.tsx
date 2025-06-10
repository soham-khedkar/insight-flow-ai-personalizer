
import { useState, useCallback } from 'react';
import { motion } from 'framer-motion';
import { Upload, File, CheckCircle, AlertCircle, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { useToast } from '@/hooks/use-toast';

interface FileUploadProps {
  onUploadComplete: (fileData: any) => void;
}

export const FileUpload = ({ onUploadComplete }: FileUploadProps) => {
  const [isDragging, setIsDragging] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [files, setFiles] = useState<Array<{ file: File; status: 'pending' | 'processing' | 'complete' | 'error'; data?: any; error?: string }>>([]);
  const { toast } = useToast();

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const processFile = async (file: File) => {
    const formData = new FormData();
    formData.append('file', file);

    try {
      const { data, error } = await supabase.functions.invoke('process-data-file', {
        body: formData
      });

      if (error) throw error;
      return data;
    } catch (error) {
      console.error('Error processing file:', error);
      throw error;
    }
  };

  const handleFiles = async (selectedFiles: FileList) => {
    const validFiles = Array.from(selectedFiles).filter(file => {
      const validTypes = [
        'text/csv',
        'application/pdf',
        'application/json',
        'application/vnd.ms-excel',
        'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
        'text/plain'
      ];
      return validTypes.includes(file.type) || file.name.endsWith('.csv');
    });

    if (validFiles.length === 0) {
      toast({
        title: "Invalid file type",
        description: "Please upload CSV, PDF, JSON, Excel, or text files only.",
        variant: "destructive",
      });
      return;
    }

    const newFiles = validFiles.map(file => ({ 
      file, 
      status: 'pending' as const 
    }));
    
    setFiles(prev => [...prev, ...newFiles]);
    setUploading(true);

    for (let i = 0; i < newFiles.length; i++) {
      const fileIndex = files.length + i;
      
      setFiles(prev => prev.map((f, idx) => 
        idx === fileIndex ? { ...f, status: 'processing' } : f
      ));

      try {
        const result = await processFile(newFiles[i].file);
        
        setFiles(prev => prev.map((f, idx) => 
          idx === fileIndex ? { ...f, status: 'complete', data: result } : f
        ));

        onUploadComplete(result);
        
        toast({
          title: "File processed successfully",
          description: `${newFiles[i].file.name} has been processed and data extracted.`,
        });
      } catch (error) {
        setFiles(prev => prev.map((f, idx) => 
          idx === fileIndex ? { 
            ...f, 
            status: 'error', 
            error: error instanceof Error ? error.message : 'Processing failed' 
          } : f
        ));

        toast({
          title: "Processing failed",
          description: `Failed to process ${newFiles[i].file.name}`,
          variant: "destructive",
        });
      }
    }

    setUploading(false);
  };

  const handleDrop = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files) {
      handleFiles(e.dataTransfer.files);
    }
  }, []);

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      handleFiles(e.target.files);
    }
  };

  const removeFile = (index: number) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'complete': return <CheckCircle className="w-4 h-4 text-green-600" />;
      case 'error': return <AlertCircle className="w-4 h-4 text-red-600" />;
      case 'processing': return <div className="w-4 h-4 border-2 border-blue-600 border-t-transparent rounded-full animate-spin" />;
      default: return <File className="w-4 h-4 text-gray-600" />;
    }
  };

  return (
    <div className="space-y-4">
      <motion.div
        className={`border-3 border-dashed rounded-xl p-8 text-center transition-all ${
          isDragging 
            ? 'border-purple-500 bg-purple-50' 
            : 'border-gray-300 hover:border-purple-400 hover:bg-gray-50'
        }`}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <Upload className="w-12 h-12 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-black text-black mb-2">
          Drop files here or click to upload
        </h3>
        <p className="text-gray-600 font-bold mb-4">
          Support for CSV, PDF, JSON, Excel files
        </p>
        <input
          type="file"
          multiple
          accept=".csv,.pdf,.json,.xlsx,.xls,.txt"
          onChange={handleFileSelect}
          className="hidden"
          id="file-upload"
        />
        <label
          htmlFor="file-upload"
          className="inline-flex items-center px-4 py-2 bg-purple-500 text-white rounded-xl border-2 border-black shadow-brutal hover:translate-x-1 hover:translate-y-1 hover:shadow-none transition-all font-bold cursor-pointer"
        >
          <Upload className="w-4 h-4 mr-2" />
          Choose Files
        </label>
      </motion.div>

      {files.length > 0 && (
        <div className="space-y-2">
          <h4 className="font-black text-black">Uploaded Files</h4>
          {files.map((fileItem, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="flex items-center justify-between p-3 bg-white rounded-lg border-2 border-black shadow-brutal"
            >
              <div className="flex items-center space-x-3">
                {getStatusIcon(fileItem.status)}
                <div>
                  <p className="font-bold text-black">{fileItem.file.name}</p>
                  <p className="text-sm text-gray-600">
                    {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                  {fileItem.error && (
                    <p className="text-sm text-red-600 font-bold">{fileItem.error}</p>
                  )}
                </div>
              </div>
              <button
                onClick={() => removeFile(index)}
                className="p-1 hover:bg-gray-100 rounded"
              >
                <X className="w-4 h-4 text-gray-600" />
              </button>
            </motion.div>
          ))}
        </div>
      )}
    </div>
  );
};
