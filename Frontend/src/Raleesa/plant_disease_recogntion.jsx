import React, { useState } from 'react';
import axios from 'axios';
import './plant_disease_recogntion.css';

function App() {
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [prediction, setPrediction] = useState(null);

  const classLabelsSinhala = {
    healthy: "නීරෝගී",
    rust: "Powdery - දිලීර රෝගය",
    powdery: "Rust - දිලීර රෝගය",
  };

  const recommendationsSinhala = {
    rust: [
      "දින 10ක් තුළ සල්ෆර්/නීම් තෙල් යෙදීමක් කරන්න.",
      "අවශ්‍යයනම් පැල කප්පාදු කරන්න.",
      "වඩා හොඳ වායු සන්චාරයක් ලබාදෙන්න.",
      "උදාසීන පොහොර භාවිතය වලක්වන්න."
    ],
    powdery: [
      "අසාධ්‍ය පත්‍ර ඉවත් කර විනාශ කරන්න.",
      "දින 7ක් තිස්සේ දිලීර නාශකයක් යොදන්න.",
      "පැළ වටා වායු සංසරණය වැඩි කරන්න.",
      "අධික ජලය අවහිර කරන්න."
    ]
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

    try {
      const response = await axios.post("http://127.0.0.1:8000/ml/predict", formData);
      setPrediction(response.data);
    } catch (err) {
      alert("Error uploading image or getting prediction.");
    }
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

      {/* {prediction && (
        <div
          className={`result-card ${prediction.class === "healthy" ? "healthy" : "diseased"}`}
        >
          <h3>ප්‍රතිඵලය</h3>
          <p><strong>රෝග වර්ගය:</strong> {classLabelsSinhala[prediction.class]}</p>
          <p><strong>විශ්වාසය:</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
        </div>
      )} */}

      {prediction && (
        <div className="results-container">
          {/* Prediction Result Card */}
          <div className={`result-card ${prediction.class === "healthy" ? "healthy" : "diseased"}`}>
            <h3><b>ප්‍රතිඵලය</b></h3>
            <p><strong>රෝග වර්ගය :</strong> {classLabelsSinhala[prediction.class]}</p>
            <p><strong>විශ්වාසය :</strong> {(prediction.confidence * 100).toFixed(2)}%</p>
          </div>

          {/* Recommendation Card */}
          {prediction.class !== "healthy" && (
            <div className="recommendation-card">
              <h3>🛠 නිර්දේශ</h3>
              <ul>
                {recommendationsSinhala[prediction.class]?.map((step, idx) => (
                  <li key={idx}>{step}</li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}

    </div>
  );
}

export default App;
