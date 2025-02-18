import React, { useState, useRef } from 'react';  // Added useRef
import { QRCodeSVG } from 'qrcode.react';
import { MdQrCode } from 'react-icons/md';  // Add this import

const QRCodeGenerator = () => {
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');
  const qrRef = useRef();  // Add this line

  const downloadQRCode = () => {
    const svg = qrRef.current.querySelector('svg');
    const svgData = new XMLSerializer().serializeToString(svg);
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      canvas.width = size;
      canvas.height = size;
      ctx.fillStyle = bgColor;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, 0, 0);
      
      const pngFile = canvas.toDataURL('image/png');
      const downloadLink = document.createElement('a');
      downloadLink.download = 'custom_qrcode.png';
      downloadLink.href = pngFile;
      downloadLink.click();
    };
    
    img.src = 'data:image/svg+xml;base64,' + btoa(svgData);
  };

  return (
    <div className="qr-container">
      <div className="title-container">
        <MdQrCode size={32} className="qr-icon" />
        <h1>Custom QR Code Generator</h1>
      </div>
      
      <div className="input-group">
        <input
          type="text"
          placeholder="Enter text or URL"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="controls">
          <div>
            <label>Size:</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min="128"
              max="512"
            />
          </div>
          
          <div>
            <label>Background Color:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
            />
          </div>
          
          <div>
            <label>QR Code Color:</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="qr-output" ref={qrRef}>
        {text && (
          <QRCodeSVG
            value={text}
            size={size}
            bgColor={bgColor}
            fgColor={fgColor}
            level="H"
            includeMargin={true}
          />
        )}
      </div>

      {text && (
        <button className="download-button" onClick={downloadQRCode}>
          Download QR Code
        </button>
      )}

      <div className="footer">
        Made by <span>Hugo Torres</span>
      </div>
    </div>
  );
};

export default QRCodeGenerator;