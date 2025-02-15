"use client";

import { useState } from "react";
import jsQR from "jsqr";

export default function QRImageScanner({ onScan }: { onScan?: (data: string) => void }) {
  const [scannedData, setScannedData] = useState<string | null>(null);

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.src = e.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Set canvas size to match the image
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0, img.width, img.height);

        // Extract QR Code
        const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
        const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

        if (qrCode) {
          setScannedData(qrCode.data);
          if (onScan) onScan(qrCode.data); // Pass scanned value to parent if provided
        } else {
          setScannedData("No QR code found.");
        }
      };
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="flex flex-col items-center gap-4 p-4 bg-green-200 text-black rounded-xl shadow-lg">
      <h2 className="text-lg font-bold">Upload QR Code Image</h2>
      <input type="file" accept="image/*" onChange={handleImageUpload} className="p-2 border rounded-md" />
      {scannedData && (
        <p className="text-sm text-gray-600 break-all">
          <strong>Scanned Value:</strong> {scannedData}
        </p>
      )}
    </div>
  );
}
