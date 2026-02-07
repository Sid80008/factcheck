import React from "react";
import "../App.css";

const VerdictCard = ({ results }) => {
  const { verdict, confidence, verifiable, trustScore } = results;

  const getVerdictColor = (verdict) => {
    switch (verdict) {
      case "True":
        return "#0f0";
      case "False":
        return "#f00";
      case "Developing":
        return "#ff0";
      default:
        return "#0ff";
    }
  };

  return (
    <div className={`card verdict-card verdict-${verdict}`}>
      <h3 style={{ color: getVerdictColor(verdict) }}>Verdict: {verdict}</h3>

      <div className="progress-bar">
        <label>Confidence</label>
        <div className="bar-bg">
          <div
            className="bar-fill"
            style={{ width: `${confidence}%`, background: "#0ff" }}
          ></div>
        </div>
        <span>{confidence}%</span>
      </div>

      <div className="progress-bar">
        <label>Verifiable</label>
        <div className="bar-bg">
          <div
            className="bar-fill"
            style={{ width: `${verifiable}%`, background: "#08f" }}
          ></div>
        </div>
        <span>{verifiable}%</span>
      </div>

      <div className="progress-bar">
        <label>Trust Score</label>
        <div className="bar-bg">
          <div
            className="bar-fill"
            style={{ width: `${trustScore}%`, background: "#0f0" }}
          ></div>
        </div>
        <span>{trustScore}%</span>
      </div>
    </div>
  );
};

export default VerdictCard;
