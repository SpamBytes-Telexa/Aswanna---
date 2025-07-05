import { useNavigate } from "react-router-dom";
import React, { useEffect } from "react";

const ChatbotButton = () => {
  const navigate = useNavigate();

  const goToChatbot = () => {
    navigate("/chatbot");
  };

  useEffect(() => {
    const style = document.createElement("style");
    style.innerHTML = `
      @keyframes jump {
        0%   { transform: translateY(0) scale(1); }
        20%  { transform: translateY(-30px) scale(1.1); }
        40%  { transform: translateY(0) scale(1); }
        60%  { transform: translateY(-15px) scale(1.05); }
        80%  { transform: translateY(0) scale(1); }
        100% { transform: translateY(0) scale(1); }
      }
    `;
    document.head.appendChild(style);
  }, []);

  return (
    <button
      onClick={goToChatbot}
      title="අස්වැන්න චැට්බොට්: ඔබේ ප්‍රශ්න මෙතැනින් ඇසිය හැකිය!"
      style={{
        position: "fixed",
        bottom: "20px",
        right: "20px",
        backgroundColor: "#4CAF50",
        color: "white",
        border: "none",
        borderRadius: "50%",
        width: "60px",
        height: "60px",
        fontSize: "28px",
        boxShadow: "0 4px 8px rgba(0,0,0,0.3)",
        cursor: "pointer",
        zIndex: 1000,
        animation: "jump 1.8s ease-in-out infinite",
      }}
    >
      🌾
    </button>
  );
};

export default ChatbotButton;
