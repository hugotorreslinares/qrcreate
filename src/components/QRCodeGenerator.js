import React, { useState, useRef } from 'react';  // Added useRef
import { QRCodeSVG } from 'qrcode.react';
import { MdQrCode, MdLogout } from 'react-icons/md';  // Added MdLogout

const QRCodeGenerator = ({ user, onLogout }) => {  // Added onLogout prop
  const [text, setText] = useState('');
  const [size, setSize] = useState(256);
  const [bgColor, setBgColor] = useState('#FFFFFF');
  const [fgColor, setFgColor] = useState('#000000');
  const qrRef = useRef();

  const downloadQRCode = (format) => {
    try {
      const svg = qrRef.current.querySelector('svg');
      
      if (format === 'svg') {
        const svgData = new XMLSerializer().serializeToString(svg);
        const svgBlob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
        const svgUrl = URL.createObjectURL(svgBlob);
        const downloadLink = document.createElement('a');
        downloadLink.href = svgUrl;
        downloadLink.download = `qrcode_${Date.now()}.svg`;
        downloadLink.click();
        URL.revokeObjectURL(svgUrl);
        return;
      }

      // Existing PNG download logic
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
        downloadLink.download = `qrcode_${Date.now()}.png`;
        downloadLink.href = pngFile;
        downloadLink.click();
      };
      
      img.src = 'data:image/svg+xml;base64,' + btoa(unescape(encodeURIComponent(svgData)));
    } catch (error) {
      console.error('Error downloading QR code:', error);
    }
  };

  return (
    <div className="qr-container">
      <div className="title-container">
        <MdQrCode size={32} className="qr-icon" />
        <h1>Custom QR Code Generator</h1>
        <div className="user-welcome">
          Welcome, {user.name}
          <img src={user.picture} alt={user.name} className="user-avatar" />
          <button className="logout-button" onClick={onLogout}>
            <MdLogout size={20} />
            Logout
          </button>
        </div>
      </div>
      
      <div className="instructions">
        <h2>How to use:</h2>
        <ol>
          <li>Enter any text or URL in the input field below</li>
          <li>Adjust the QR code size (128px - 512px)</li>
          <li>Choose custom colors for background and QR code</li>
          <li>Download your QR code as PNG</li>
        </ol>
      </div>

      <div className="input-group">
        <input
          type="text"
          placeholder="Enter text or URL (e.g., https://www.example.com)"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
        
        <div className="controls">
          <div className="control-item">
            <label title="Adjust the size of your QR code">Size (px):</label>
            <input
              type="number"
              value={size}
              onChange={(e) => setSize(Number(e.target.value))}
              min="128"
              max="512"
              title="Size range: 128px - 512px"
            />
          </div>
          
          <div className="control-item">
            <label title="Choose the background color">Background:</label>
            <input
              type="color"
              value={bgColor}
              onChange={(e) => setBgColor(e.target.value)}
              title="Select background color"
            />
          </div>
          
          <div className="control-item">
            <label title="Choose the QR code color">QR Code Color:</label>
            <input
              type="color"
              value={fgColor}
              onChange={(e) => setFgColor(e.target.value)}
              title="Select QR code color"
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
    </div>
  );
};

export default QRCodeGenerator;