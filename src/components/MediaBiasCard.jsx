import React from "react";
import "../App.css";

const MediaBiasCard = ({ mediaBias, narrativeTags }) => {
  const getBiasColor = (bias) => {
    switch (bias.toLowerCase()) {
      case "left":
        return "#ff4d4d";
      case "right":
        return "#4d79ff";
      case "neutral":
        return "#0ff";
      default:
        return "#fff";
    }
  };

  return (
    <div className="card media-bias-card">
      <h3 style={{ color: getBiasColor(mediaBias) }}>Media Bias: {mediaBias}</h3>
      <div className="narrative-tags">
        {narrativeTags.map((tag, index) => (
          <span key={index} className="tag">
            {tag}
          </span>
        ))}
      </div>
    </div>
  );
};

export default MediaBiasCard;
