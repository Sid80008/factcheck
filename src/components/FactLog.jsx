import React from "react";
import "../styles/App.css";

const FactLog = ({ facts }) => {
  const getStatusColor = (status) => {
    switch (status.toLowerCase()) {
      case "verified":
        return "#0f0";
      case "false":
        return "#f00";
      case "developing":
        return "#ff0";
      default:
        return "#0ff";
    }
  };

  return (
    <div className="card fact-log-card">
      <h3>Fact Log</h3>
      <ul className="fact-list">
        {facts.map((fact, index) => (
          <li key={index} className="fact-item">
            <span className="fact-claim">{fact.claim}</span>
            <span
              className="fact-status"
              style={{ color: getStatusColor(fact.status) }}
            >
              {fact.status}
            </span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FactLog;
