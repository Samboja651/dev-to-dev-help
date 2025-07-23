import { useState } from "react";
import OpenTickets from "../OpenTickets"
import ClaimedTickets from "../ClaimedTickets";
import ResolvedTickets from "../ResolvedTickets";
import SubmitTicketPage from "./SubmitTicketPage";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import { useNavigate } from "react-router-dom";

export default function DashboardPage() {
    const [activeTab, setActiveTab] = useState("open");
    const { user, logout } = useContext(AuthContext);
    const navigate = useNavigate();

    return (
        <>
            <div className="mb-3 d-flex justify-content-between align-items-center">
                {!user ? (
                    <div>
                    <button className="btn btn-outline-primary me-2" onClick={() => navigate("/login")}>
                        Login
                    </button>
                    <button className="btn btn-outline-success" onClick={() => navigate("/register")}>
                        Register
                    </button>
                    </div>
                ) : (
                    <button className="btn btn-outline-danger" onClick={logout}>
                    Logout
                    </button>
                )}
            </div>
            
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
        </>
    )
}