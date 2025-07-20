import { useState } from "react";
import OpenTickets from "./OpenTickets";
import ClaimedTickets from "./ClaimedTickets";
import ResolvedTickets from "./ResolvedTickets";
import SubmitTicketPage from "./pages/SubmitTicketPage";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css';

function App() {
  const [activeTab, setActiveTab] = useState("open");

  return (
  <Router>
      <div className="container mt-4">
        <Routes>
          <Route path="/submit" element={<SubmitTicketPage />}></Route>
        </Routes>
        <ul className="nav nav-tabs mb-3">
            <li className="nav-item">
            <button className={`nav-link ${activeTab === "create" ? "active" : ""}`} onClick={() => setActiveTab("create")}>
              <i className="bi bi-pencil-square me-1"></i> Create
            </button>
          </li>

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
        {activeTab === "create" && <SubmitTicketPage />}
      </div>
    </Router>
  );
}

export default App;