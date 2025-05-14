// DocumentUpload.tsx
import React, { useState } from 'react';
import { uploadZipToStorage, registerExtractedFiles } from '@/services/zipService';

export const DocumentUpload = () => {
  const [file, setFile] = useState<File | null>(null);

  const handleUpload = async () => {
    if (!file) return;
    const uploaded = await uploadZipToStorage(file);
    if (uploaded) {
      await registerExtractedFiles(file.name);
      alert("Upload and extraction complete!");
    }
  };

  return (
    <div className="p-4 border rounded-xl">
      <input type="file" accept=".zip" onChange={(e) => setFile(e.target.files?.[0] || null)} />
      <button onClick={handleUpload} className="bg-blue-600 text-white p-2 rounded mt-2">Upload ZIP</button>
    </div>
  );
};
