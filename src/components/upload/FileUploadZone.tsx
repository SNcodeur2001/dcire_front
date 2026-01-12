import { useState, type DragEvent, type ChangeEvent } from 'react';

interface FileUploadZoneProps {
  onFileSelect: (file: File) => void;
}

export default function FileUploadZone({ onFileSelect }: FileUploadZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLLabelElement>) => {
    e.preventDefault();
    setIsDragging(false);
    
    const files = e.dataTransfer.files;
    if (files.length > 0 && files[0].type === 'application/pdf') {
      onFileSelect(files[0]);
    }
  };

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files.length > 0) {
      onFileSelect(files[0]);
    }
  };

  return (
    <div>
      <label 
        className="text-xs md:text-sm font-medium mb-2 block"
        style={{ color: 'var(--color-gray-700)' }}
      >
        Document scanné (PDF)
      </label>
      
      <label
        htmlFor="file-upload"
        className={`
          flex flex-col items-center justify-center py-8 md:py-12 lg:py-16 px-4 md:px-6 lg:px-8 rounded-sm border-2 border-dashed
          transition-all cursor-pointer
          ${isDragging ? 'border-(--color-primary) bg-(--color-bg-orange)' : 'border-(--color-gray-300) hover:border-(--color-gray-400)'}
        `}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <div 
          className="w-10 h-10 md:w-12 md:h-12 rounded-full flex items-center justify-center mb-3 md:mb-4"
          style={{ backgroundColor: '#FED7AA' }}
        >
          <img 
            src="/icons/upload.svg" 
            alt="" 
            className="w-5 h-4 md:w-6 md:h-5 lg:w-7 lg:h-6"
            style={{ filter: 'invert(43%) sepia(95%) saturate(2476%) hue-rotate(359deg) brightness(99%) contrast(98%)' }}
          />
        </div>
        
        <p 
          className="text-sm md:text-base font-medium mb-1 text-center"
          style={{ color: 'var(--color-gray-700)' }}
        >
          Cliquez pour importer ou glissez le fichier
        </p>
        
        <p 
          className="text-xs md:text-sm font-normal text-center"
          style={{ color: 'var(--color-gray-500)' }}
        >
          PDF uniquement, max 10MB
        </p>
        
        <input
          id="file-upload"
          type="file"
          accept=".pdf"
          className="hidden"
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
}