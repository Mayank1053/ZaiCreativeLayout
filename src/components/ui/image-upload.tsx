"use client";

import { useState, useCallback, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { Button } from "@/components/ui/button";
import Image from "next/image";
import { ImagePlus, Trash, X } from "lucide-react";
import { toast } from "sonner";

interface ImageUploadProps {
  disabled?: boolean;
  value: string[];           // Existing Cloudinary URLs
  onChange: (value: string[]) => void; // Update existing URLs (remove)
  onFilesAdded: (files: File[]) => void; // Pass new files to parent
  pendingFiles: File[];      // Standard File objects for preview
  onRemovePending: (index: number) => void;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
  disabled,
  value,
  onChange,
  onFilesAdded,
  pendingFiles,
  onRemovePending
}) => {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  const onDrop = useCallback((acceptedFiles: File[]) => {
    // Filter and validate files
    const validFiles = acceptedFiles.filter(file => {
      if (file.size > 5 * 1024 * 1024) {
        toast.error(`File ${file.name} too large (max 5MB)`);
        return false;
      }
      return true;
    });

    if (validFiles.length > 0) {
      onFilesAdded(validFiles);
      toast.success(`${validFiles.length} image(s) selected.`);
    }
  }, [onFilesAdded]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'image/*': ['.jpeg', '.png', '.webp', '.jpg']
    },
    disabled: disabled,
  });

  if (!isMounted) {
    return null;
  }

  return (
    <div>
      <div className="mb-4 flex items-center gap-4 flex-wrap">
        {/* Existing Images (URLs) */}
        {value.map((url) => (
          <div
            key={url}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-border group"
          >
            <div className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                onClick={() => onChange(value.filter((val) => val !== url))}
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <Trash className="h-4 w-4" />
              </Button>
            </div>
            <Image fill className="object-cover" alt="Image" src={url} />
          </div>
        ))}

        {/* Pending Images (Files) */}
        {pendingFiles.map((file, index) => (
          <div
            key={`pending-${index}`}
            className="relative w-[200px] h-[200px] rounded-md overflow-hidden border border-border group opacity-80"
          >
             <div className="absolute inset-0 flex items-center justify-center bg-black/10 z-0">
                 <span className="text-white text-xs font-medium px-2 py-1 bg-black/50 rounded-full">Preview</span>
             </div>
            <div className="z-10 absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
              <Button
                type="button"
                onClick={() => onRemovePending(index)}
                variant="destructive"
                size="icon"
                className="h-8 w-8"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>
            {/* Create object URL for preview */}
            <Image 
                fill 
                className="object-cover" 
                alt="Preview" 
                src={URL.createObjectURL(file)} 
                onLoad={() => {
                    // Optional: revoke object URL to free memory if we were managing state strictly, 
                    // but safely relying on browser GC for short lived forms is okay-ish (or use a useEffect in a sub-component).
                }}
            />
          </div>
        ))}
      </div>
      
      <div
        {...getRootProps()}
        className={`
          border-2 border-dashed rounded-lg p-10 
          flex flex-col items-center justify-center gap-4 
          cursor-pointer transition-colors
          ${isDragActive ? "border-primary bg-primary/10" : "border-muted-foreground/25 hover:border-primary/50"}
          ${disabled && "opacity-50 cursor-not-allowed"}
        `}
      >
        <input {...getInputProps()} />
        <div className="flex flex-col items-center gap-2 text-center">
          <div className="p-4 rounded-full bg-secondary">
            <ImagePlus className="h-8 w-8 text-secondary-foreground" />
          </div>
          <div>
            <p className="font-semibold">Click to upload or drag and drop</p>
            <p className="text-xs text-muted-foreground mt-1">
              SVG, PNG, JPG or WebP (max 5MB)
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageUpload;
