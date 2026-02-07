import React from "react";
import "../styles/App.css";

const LiveStatus = ({ loading }) => {
  return (
    <div className="live-status">
      <span
        className={`status-indicator ${loading ? "active" : "offline"}`}
      ></span>
      <p className="status-text">
        {loading ? "Searching for news and verifying..." : "Idle"}
      </p>
    </div>
  );
};

export default LiveStatus;
