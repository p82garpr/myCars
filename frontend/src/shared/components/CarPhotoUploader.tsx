'use client';

import { useState, useCallback } from 'react';
import Image from 'next/image';

interface CarPhotoUploaderProps {
  onPhotosSelected: (photos: File[], mainPhotoIndex: number) => void;
}

export const CarPhotoUploader: React.FC<CarPhotoUploaderProps> = ({ onPhotosSelected }) => {
  const [selectedFiles, setSelectedFiles] = useState<File[]>([]);
  const [previews, setPreviews] = useState<string[]>([]);
  const [mainPhotoIndex, setMainPhotoIndex] = useState<number>(0);
  const [isDragging, setIsDragging] = useState(false);

  const handleFileSelect = useCallback((files: File[]) => {
    const validFiles = Array.from(files).filter(file => file.type.startsWith('image/'));
    
    if (validFiles.length === 0) return;

    setSelectedFiles(prev => [...prev, ...validFiles]);
    
    validFiles.forEach(file => {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreviews(prev => [...prev, reader.result as string]);
      };
      reader.readAsDataURL(file);
    });

    onPhotosSelected([...selectedFiles, ...validFiles], mainPhotoIndex);
  }, [selectedFiles, mainPhotoIndex, onPhotosSelected]);

  const handleDrop = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const files = Array.from(e.dataTransfer.files);
    handleFileSelect(files);
  }, [handleFileSelect]);

  const handleDragOver = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const removePhoto = useCallback((index: number) => {
    setSelectedFiles(prev => prev.filter((_, i) => i !== index));
    setPreviews(prev => prev.filter((_, i) => i !== index));
    if (mainPhotoIndex === index) {
      setMainPhotoIndex(0);
    } else if (mainPhotoIndex > index) {
      setMainPhotoIndex(prev => prev - 1);
    }
    onPhotosSelected(
      selectedFiles.filter((_, i) => i !== index),
      mainPhotoIndex === index ? 0 : mainPhotoIndex > index ? mainPhotoIndex - 1 : mainPhotoIndex
    );
  }, [selectedFiles, mainPhotoIndex, onPhotosSelected]);

  const setMainPhoto = useCallback((index: number) => {
    setMainPhotoIndex(index);
    onPhotosSelected(selectedFiles, index);
  }, [selectedFiles, onPhotosSelected]);

  return (
    <div className="space-y-4">
      <label className="block text-sm font-medium text-gray-700 mb-1">
        Fotos del vehículo
      </label>
      
      {/* Área de drop y preview */}
      <div
        className={`relative border-2 border-dashed rounded-lg p-4 transition-colors ${
          isDragging ? 'border-primary-500 bg-primary-50' : 'border-gray-300 hover:border-primary-400'
        }`}
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
      >
        {/* Previews de fotos */}
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mb-4">
          {previews.map((preview, index) => (
            <div
              key={index}
              className={`relative aspect-square rounded-lg overflow-hidden group ${
                index === mainPhotoIndex ? 'ring-2 ring-primary-500' : ''
              }`}
            >
              <Image
                src={preview}
                alt={`Preview ${index + 1}`}
                fill
                className="object-cover"
              />
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-opacity flex items-center justify-center opacity-0 group-hover:opacity-100">
                <div className="flex space-x-2">
                  <button
                    type="button"
                    onClick={() => setMainPhoto(index)}
                    className="p-1 bg-white rounded-full text-gray-700 hover:text-primary-600"
                    title="Establecer como principal"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                    </svg>
                  </button>
                  <button
                    type="button"
                    onClick={() => removePhoto(index)}
                    className="p-1 bg-white rounded-full text-gray-700 hover:text-red-600"
                    title="Eliminar foto"
                  >
                    <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                  </button>
                </div>
              </div>
              {index === mainPhotoIndex && (
                <div className="absolute top-2 left-2 bg-primary-500 text-white text-xs px-2 py-1 rounded-full">
                  Principal
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Área de drop y selección */}
        <div className="flex items-center justify-center">
          <label className="w-full cursor-pointer">
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={(e) => handleFileSelect(Array.from(e.target.files || []))}
              className="hidden"
            />
            <div className="text-center p-6">
              <svg
                className="mx-auto h-12 w-12 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              <p className="mt-1 text-sm text-gray-600">
                Arrastra y suelta fotos aquí o
                <span className="text-primary-600 hover:text-primary-500 ml-1">
                  selecciona archivos
                </span>
              </p>
              <p className="mt-1 text-xs text-gray-500">PNG, JPG, GIF hasta 10MB</p>
            </div>
          </label>
        </div>
      </div>
    </div>
  );
}; 