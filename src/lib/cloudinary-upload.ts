import axios from "axios";

export async function uploadToCloudinary(file: File) {
  const timestamp = Math.round(new Date().getTime() / 1000);
  
  // 1. Get signature
  const { data: { signature } } = await axios.post("/api/cloudinary/sign", {
    paramsToSign: {
      timestamp: timestamp,
      upload_preset: process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET,
    }
  });

  // 2. Upload to Cloudinary
  const formData = new FormData();
  formData.append("file", file);
  formData.append("api_key", process.env.NEXT_PUBLIC_CLOUDINARY_API_KEY!);
  formData.append("timestamp", timestamp.toString());
  formData.append("signature", signature);
  formData.append("upload_preset", process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET!);

  const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
  const { data } = await axios.post(
    `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
    formData
  );

  return data.secure_url;
}
