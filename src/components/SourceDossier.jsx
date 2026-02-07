import React from "react";
import "../styles/App.css";

const SourceDossier = ({ sources }) => {
  return (
    <div className="card source-dossier-card">
      <h3>Sources</h3>
      <ul className="source-list">
        {sources.map((source, index) => (
          <li key={index} className="source-item">
            <a
              href={source.link}
              target="_blank"
              rel="noopener noreferrer"
              className="source-link"
            >
              {source.name}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default SourceDossier;
