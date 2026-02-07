import React from "react";
import "../styles/App.css";

const InputSection = ({ query, setQuery, handleVerify, loading }) => {
  return (
    <div className="input-section">
      <input
        type="text"
        placeholder="Enter news headline or claim..."
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        onKeyPress={(e) => e.key === "Enter" && handleVerify()}
      />
      <button onClick={handleVerify} disabled={loading}>
        {loading ? "Verifying..." : "Verify"}
      </button>
    </div>
  );
};

export default InputSection;
