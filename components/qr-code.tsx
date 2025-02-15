import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { QRCodeCanvas } from "qrcode.react";

interface QRGeneratorProps {
  getValue: () => string; // Function to dynamically get the QR value
  
}


export default function QRGenerator({ getValue }: QRGeneratorProps) {
    console.log("AAAAAAA: ",getValue);
  const [qrValue, setQrValue] = useState<string | null>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);

  const handleGenerateQR = () => {
    const value = getValue();
    if (value) {
      setQrValue(value);
    }
  };

  const downloadQR = () => {
    if (!canvasRef.current) return;
    
    const canvas = canvasRef.current;
    const image = canvas.toDataURL("image/jpeg");

    const link = document.createElement("a");
    link.href = image;
    link.download = "qr-code.jpg";
    link.click();
  };

  return (
    <div className="flex flex-col items-center gap-4 p-6 bg-gray-100 rounded-lg shadow-lg">
      <Button onClick={handleGenerateQR} className="bg-blue-500 text-white px-4 py-2 rounded-lg">
        GET QR
      </Button>
      
      {qrValue && (
        <div className="flex flex-col items-center gap-4">
          <div className="bg-white p-4 rounded-lg">
            <QRCodeCanvas
              value={qrValue}
              size={200}
              bgColor="white"
              fgColor="black"
              includeMargin={true}
              ref={canvasRef}
            />
          </div>
          <Button onClick={downloadQR} className="bg-green-500 text-white px-4 py-2 rounded-lg">
            Download QR as JPG
          </Button>
        </div>
      )}
    </div>
  );
}