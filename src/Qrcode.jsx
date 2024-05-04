import React, { useState } from "react";
import "./qrcode.css";
import { useNavigate } from "react-router-dom";
const Qrcode = () => {
  const [img, setImg] = useState("");
  const [loading, setLoading] = useState(false);
  const [qrinput, setQrinput] = useState("Example");
  async function generateQR() {
    try {
      const url = `https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
        qrinput
      )}`;
      setImg(url);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }
  function click() {
    window.open(`${qrinput}`, "_blank");
  }
  function downloadQR() {
    fetch(img)
      .then((response) => response.blob())
      .then((blob) => {
        const link = document.createElement("a");
        link.href = URL.createObjectURL(blob);
        link.download = "qrcode.png";
        document.body.appendChild(link);
        link.click();
        document.body.removechild(link);
      });
  }
  return (
    <div>
      <h2>QR CODE GENERATOR</h2>
      {img && <img src={img} className="qr-code-image" onClick={click} />}
      <form className="form_container">
        <label>Enter the link for QR code</label>
        <br></br>
        <input
          type="text"
          placeholder="Enter the Link"
          value={qrinput}
          onChange={(e) => setQrinput(e.target.value)}
        ></input>
        <br></br>
        <label>Image size (in width)</label>
        <br></br>
        <input type="text" placeholder="Enter the size"></input>
        <br></br>
        <button type="button" onClick={generateQR}>
          Generate the QR
        </button>
        <button type="button" onClick={downloadQR}>
          Download the QR
        </button>
      </form>
    </div>
  );
};

export default Qrcode;
