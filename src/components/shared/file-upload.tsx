"use client";

import React, { useCallback, useState } from "react";
import { Upload, X, ImageIcon } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileUploadProps {
  onFileSelect: (file: File | undefined) => void;
  accept?: string;
  maxSizeMB?: number;
  label?: string;
  description?: string;
  className?: string;
  value?: File;
}

export function FileUpload({
  onFileSelect,
  accept = "image/*",
  maxSizeMB = 5,
  label = "Upload File",
  description = "Drag and drop or click to upload",
  className,
  value,
}: FileUploadProps) {
  const [preview, setPreview] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const processFile = useCallback(
    (file: File) => {
      setError(null);

      // Validate file size
      if (file.size > maxSizeMB * 1024 * 1024) {
        setError(`File size must be under ${maxSizeMB}MB`);
        return;
      }

      // Validate file type
      if (accept !== "*" && !file.type.match(accept.replace("*", ".*"))) {
        setError("Invalid file type");
        return;
      }

      // Create preview for images
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onloadend = () => {
          setPreview(reader.result as string);
        };
        reader.readAsDataURL(file);
      }

      onFileSelect(file);
    },
    [accept, maxSizeMB, onFileSelect]
  );

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const handleFileInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) processFile(file);
    },
    [processFile]
  );

  const clearFile = useCallback(() => {
    setPreview(null);
    setError(null);
    onFileSelect(undefined);
  }, [onFileSelect]);

  const hasFile = preview || value;

  return (
    <div className={cn("space-y-2", className)}>
      <div
        className={cn(
          "relative group border-2 border-dashed rounded-xl transition-all duration-300 cursor-pointer overflow-hidden",
          isDragging
            ? "border-primary bg-primary/5 scale-[1.02]"
            : hasFile
            ? "border-primary/40 bg-primary/5"
            : "border-muted-foreground/25 hover:border-primary/50 hover:bg-muted/50"
        )}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        onDrop={handleDrop}
      >
        <input
          type="file"
          accept={accept}
          onChange={handleFileInput}
          className="absolute inset-0 w-full h-full opacity-0 cursor-pointer z-10"
          id={`file-upload-${label.replace(/\s/g, "-").toLowerCase()}`}
        />

        {hasFile ? (
          <div className="relative p-4">
            <div className="flex items-center gap-4">
              {preview ? (
                <div className="relative h-20 w-20 rounded-lg overflow-hidden border border-border shrink-0">
                  <img
                    src={preview}
                    alt="Preview"
                    className="h-full w-full object-cover"
                  />
                </div>
              ) : (
                <div className="h-20 w-20 rounded-lg bg-muted flex items-center justify-center shrink-0">
                  <ImageIcon className="h-8 w-8 text-muted-foreground" />
                </div>
              )}
              <div className="flex-1 min-w-0">
                <p className="text-sm font-medium truncate">
                  {value?.name || "File selected"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {value
                    ? `${(value.size / 1024 / 1024).toFixed(2)} MB`
                    : "Ready to upload"}
                </p>
              </div>
              <button
                type="button"
                onClick={(e) => {
                  e.stopPropagation();
                  clearFile();
                }}
                className="relative z-20 p-1.5 rounded-full bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors"
              >
                <X className="h-4 w-4" />
              </button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center p-8 text-center">
            <div
              className={cn(
                "h-12 w-12 rounded-full flex items-center justify-center mb-3 transition-colors",
                isDragging
                  ? "bg-primary/20 text-primary"
                  : "bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary"
              )}
            >
              <Upload className="h-5 w-5" />
            </div>
            <p className="text-sm font-medium text-foreground">{label}</p>
            <p className="text-xs text-muted-foreground mt-1">{description}</p>
            <p className="text-xs text-muted-foreground mt-0.5">
              Max size: {maxSizeMB}MB
            </p>
          </div>
        )}
      </div>

      {error && (
        <p className="text-xs text-destructive font-medium flex items-center gap-1">
          <X className="h-3 w-3" />
          {error}
        </p>
      )}
    </div>
  );
}
