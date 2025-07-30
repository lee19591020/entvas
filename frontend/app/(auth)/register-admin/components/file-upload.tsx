import { Box, Typography } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import Image from "next/image";
import { useState, useRef, useEffect } from "react";
import { FileUploadData, RegisterAdminPayload } from "../types";
import { useFormContext, useFormState } from "react-hook-form";



const FileUpload = () => {

  const { setValue } = useFormContext();
  const { errors } =
    useFormState<RegisterAdminPayload>();

  const [preview, setPreview] = useState<FileUploadData | null>(null);
  const [error, setError] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);


  const handleDrop = (event: React.DragEvent<HTMLDivElement>) => {
    event.preventDefault();
    event.stopPropagation();
    const droppedFile = event.dataTransfer.files[0];
    handleFile(droppedFile);
  };

  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const selectedFile = event.target.files?.[0];
    handleFile(selectedFile);
  };

  const handleFile = (selectedFile: File | undefined) => {
    if (!selectedFile) return;
    const fileType = selectedFile.type;
    if (!fileType.startsWith("image/")) {
      setError("Only images are allowed.");
      return;
    }
    setError(null);
    const objectUrl = URL.createObjectURL(selectedFile);
    const fileName = selectedFile.name;
    const fileExtension = fileName.split('.').pop() || '';
    const reader = new FileReader();
    reader.readAsDataURL(selectedFile);
    reader.onload = () => {
      const base64Data = reader.result as string;
      setPreview({
        fileBase64: base64Data,
        fileBlob: objectUrl,
        fileExt: fileExtension,
        filename: fileName
      });
    };
  };

  // Handle click to open file dialog
  const handleClick = () => {
    fileInputRef.current?.click();
  };

  useEffect(() => {
    if(preview){
      setValue('imageData', preview.fileBase64);
      setValue('ext', preview.fileExt);
    }
  },[preview, setValue])

  return (
    <Box
      sx={{
        border: "2px dashed #1976d2",
        borderRadius: "12px",
        padding: "20px",
        textAlign: "center",
        cursor: "pointer",
        transition: "all 0.3s ease-in-out",
        "&:hover": {
          backgroundColor: "#e3f2fd",
          borderColor: "#1565c0",
        },
        "& input": {
          display: "none",
        },
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        color: "#1976d2",
        fontSize: "16px",
        fontWeight: "500",
        "& .icon": {
          fontSize: "48px",
          marginBottom: "8px",
          color: "#1976d2",
        },
      }}
      onClick={handleClick} // Opens file browser on click
      onDrop={handleDrop}
      onDragOver={(event) => event.preventDefault()}
      onDragEnter={(event) => event.preventDefault()}
    >
      <Typography variant="h6">Upload a File</Typography>
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleFileSelect}
        accept="image/*"
      />
      <CloudUploadIcon className="icon" />
      <Typography>Click or Drag & Drop to upload</Typography>

      {/* Error message */}
      {error || errors?.ext?.message && (
        <Typography color="error" variant="body2" mt={1}>
          {error || errors?.ext?.message}
        </Typography>
      )}

      {/* File preview */}
      {preview && (
        <Box mt={2}>
          {preview.fileBlob.includes("video") ? (
            <video width="100%" controls>
              <source src={preview.fileBlob} type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          ) : (
            <Image
              src={preview.fileBlob}
              alt="Preview"
              width={200}
              height={300}
              style={{ maxHeight: 300, objectFit: "contain" }}
            />
          )}
        </Box>
      )}
    </Box>
  );
};

export default FileUpload;
