
import React, { useState, useRef } from 'react';
import { toast } from 'sonner';
import { 
  File, 
  Image, 
  FileText, 
  X, 
  Upload as UploadIcon,
  Plus,
  AlertTriangle
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Progress } from '@/components/ui/progress';

type FileItem = {
  id: string;
  file: File;
  progress: number;
  type: string;
  uploaded: boolean;
  error?: string;
};

const FileUploader = () => {
  const [files, setFiles] = useState<FileItem[]>([]);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    
    if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
      handleFiles(Array.from(e.dataTransfer.files));
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      handleFiles(Array.from(e.target.files));
    }
  };

  const handleClickUpload = () => {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  };

  const handleFiles = (newFiles: File[]) => {
    // Filter allowed file types
    const allowedTypes = ['application/pdf', 'application/msword', 'application/vnd.openxmlformats-officedocument.wordprocessingml.document', 'image/jpeg', 'image/png'];
    
    const validFiles = newFiles.filter(file => allowedTypes.includes(file.type));
    
    if (validFiles.length !== newFiles.length) {
      toast.error('Some files were skipped. Only PDF, DOCX, and images are allowed.');
    }
    
    if (validFiles.length === 0) return;

    const newFileItems: FileItem[] = validFiles.map(file => ({
      id: Math.random().toString(36).substr(2, 9),
      file,
      progress: 0,
      type: file.type,
      uploaded: false
    }));

    setFiles(prev => [...prev, ...newFileItems]);

    // Simulate upload progress
    newFileItems.forEach(fileItem => {
      simulateUpload(fileItem.id);
    });
  };

  const simulateUpload = (fileId: string) => {
    let progress = 0;
    const interval = setInterval(() => {
      progress += Math.floor(Math.random() * 10) + 5;
      
      if (progress >= 100) {
        progress = 100;
        clearInterval(interval);
        
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId 
              ? { ...f, progress: 100, uploaded: true } 
              : f
          )
        );
        
        toast.success('File uploaded successfully');
      } else {
        setFiles(prev => 
          prev.map(f => 
            f.id === fileId ? { ...f, progress } : f
          )
        );
      }
    }, 300);
  };

  const removeFile = (fileId: string) => {
    setFiles(prev => prev.filter(f => f.id !== fileId));
    toast.info('File removed');
  };

  const getFileIcon = (fileType: string) => {
    if (fileType.includes('image')) {
      return <Image className="text-xerox-500" size={24} />;
    } else if (fileType.includes('pdf')) {
      return <FileText className="text-red-500" size={24} />;
    } else if (fileType.includes('word') || fileType.includes('document')) {
      return <FileText className="text-blue-500" size={24} />;
    } else {
      return <File className="text-gray-500" size={24} />;
    }
  };

  return (
    <div className="w-full space-y-6">
      <div 
        className={`
          border-2 border-dashed rounded-xl p-8 text-center transition-all duration-200 
          ${isDragging ? 'border-xerox-500 bg-xerox.0' : 'border-gray-300 hover:border-xerox-400'} 
          ${files.length > 0 ? 'h-40' : 'h-60'}
        `} 
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleFileChange}
          multiple
          accept=".pdf,.docx,.doc,.jpg,.jpeg,.png"
          className="hidden"
        />

        <div className="flex flex-col items-center justify-center h-full space-y-4">
          <div className="p-4 bg-xerox-50 rounded-full">
            <UploadIcon className="text-xerox-500 h-8 w-8" />
          </div>
          <div>
            <h3 className="text-lg font-medium text-gray-700">
              Drag and drop your files here
            </h3>
            <p className="text-sm text-gray-500 mt-1">
              or <button className="text-xerox-600 font-medium hover:underline" onClick={handleClickUpload}>browse files</button>
            </p>
          </div>
          <p className="text-xs text-gray-500">
            Supports PDF, DOCX, JPG, PNG (max 10MB each)
          </p>
        </div>
      </div>

      {files.length > 0 && (
        <div className="bg-white rounded-xl shadow-soft p-4 animate-slide-up">
          <h3 className="text-sm font-medium text-gray-700 mb-3 px-2">
            Uploaded Files ({files.length})
          </h3>
          <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto scroll-hidden">
            {files.map((fileItem) => (
              <div key={fileItem.id} className="flex items-center p-3 hover:bg-gray-50 rounded-lg">
                <div className="mr-3">
                  {getFileIcon(fileItem.type)}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 truncate">
                    {fileItem.file.name}
                  </p>
                  <div className="flex items-center mt-1">
                    <div className="w-full mr-2">
                      <Progress value={fileItem.progress} className="h-1" />
                    </div>
                    <span className="text-xs text-gray-500 whitespace-nowrap">
                      {fileItem.progress}%
                    </span>
                  </div>
                  <p className="text-xs text-gray-500 mt-1">
                    {(fileItem.file.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
                <div>
                  {fileItem.uploaded ? (
                    <button
                      onClick={() => removeFile(fileItem.id)}
                      className="p-1 rounded-full hover:bg-gray-200 text-gray-500"
                      aria-label="Remove file"
                    >
                      <X size={16} />
                    </button>
                  ) : fileItem.error ? (
                    <AlertTriangle className="text-red-500" size={16} />
                  ) : (
                    <span className="text-xs text-xerox-600">Uploading...</span>
                  )}
                </div>
              </div>
            ))}
          </div>
          <div className="mt-4 flex justify-end">
            <Button 
              size="sm" 
              variant="outline" 
              className="text-gray-600 mr-2"
              onClick={() => setFiles([])}
            >
              Clear All
            </Button>
            <Button 
              size="sm" 
              className="bg-xerox hover:bg-xerox-600"
              onClick={handleClickUpload}
            >
              <Plus size={16} className="mr-1" /> Add More
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FileUploader;
