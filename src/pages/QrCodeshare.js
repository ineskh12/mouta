import React, { useState } from "react";
import ReactDOM from "react-dom";
import QRCode from "qrcode.react";
import {
    Button,
  } from "@themesberg/react-bootstrap";
export default function App(props) {
  const [qrValue, setQrValue] = useState("profile");

  const downloadQRCode = () => {
    // Generate download with use canvas and stream
    const canvas = document.getElementById("qr-gen");
    const pngUrl = canvas
      .toDataURL("image/png")
      .replace("image/png", "image/octet-stream");
    let downloadLink = document.createElement("a");
    downloadLink.href = pngUrl;
    downloadLink.download = `${qrValue}.png`;
    document.body.appendChild(downloadLink);
    downloadLink.click();
    document.body.removeChild(downloadLink);
  };
  return (
    <div className="App">
      <br />
      <QRCode
        id="qr-gen"
        value={props.myvalue}
        size={230}
        level={"H"}
        includeMargin={true}
      />
      
    </div>
  );
}


