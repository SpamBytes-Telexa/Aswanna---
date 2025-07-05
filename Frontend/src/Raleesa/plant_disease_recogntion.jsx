import React, { useState } from 'react';
//import axios from 'axios';
import './plant_disease_recogntion.css'; // 👈 Import CSS

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const classLabelsSinhala = {
    healthy: "නීරෝගී",
    rust: "Rust - දිලීර රෝගය", // Rust
    powdery: "Powdery - දිලීර රෝගය", //Powdery
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImage(file);
    setPreview(URL.createObjectURL(file));
  };

  const handleUpload = async () => {
    if (!image) return;

    const formData = new FormData();
    formData.append("file", image);

    const response = await axios.post("http://127.0.0.1:8000/predict", formData);
    setPrediction(response.data);
  };

  return (
    <div className="app">
      <h2>🌿 පළිබෝධ හඳුනා ගැනීම</h2>

      <div className="upload-section">
        <h5 className='button'>👇පින්තූරය ඇතුළත් කරන්න</h5>
        <input type="file" accept="image/*" onChange={handleImageChange} />
        {preview && <img src={preview} alt="Preview" className="preview" />}
        <button onClick={handleUpload}>යොමු කරන්න</button>
      </div>

      {prediction && (
      <div
        className={`result-card ${prediction.class === "healthy" ? "healthy" : "diseased"}`}
      >
        <h3>ප්‍රතිඵලය</h3>
        <p><strong>රෝග වර්ගය:</strong> {prediction.class}</p> {/*{classLabelsSinhala[prediction.class]}*/}
        <p><strong>විශ්වාසය:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
      </div>
    )}
    </div>
  );
}

export default App;
