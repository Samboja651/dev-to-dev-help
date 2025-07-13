import { useState } from "react";
import OpenTickets from "./OpenTickets";
import ClaimedTickets from "./ClaimedTickets";
import ResolvedTickets from "./ResolvedTickets";
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState("open");

  return (
    <div className="container mt-4">
      <ul className="nav nav-tabs mb-3">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "open" ? "active" : ""}`} onClick={() => setActiveTab("open")}>
            <i className="bi bi-folder2-open me-1"></i> Open
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "claimed" ? "active" : ""}`} onClick={() => setActiveTab("claimed")}>
            <i className="bi bi-person-check me-1"></i> Claimed
          </button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === "resolved" ? "active" : ""}`} onClick={() => setActiveTab("resolved")}>
            <i className="bi bi-check2-circle me-1"></i> Resolved
          </button>
        </li>
      </ul>

      {activeTab === "open" && <OpenTickets />}
      {activeTab === "claimed" && <ClaimedTickets />}
      {activeTab === "resolved" && <ResolvedTickets />}
    </div>
  );
}

export default App;