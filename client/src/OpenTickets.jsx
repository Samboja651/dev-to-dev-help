import React, { useState, useEffect } from "react";
import axios from 'axios';
import TicketDetails from "./TicketDetails";

const OpenTickets = () => {
    const [tickets, setTickets, searchTerm, setSearchTerm] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/open`)
            .then((res) => setTickets(res.data.data))
            .catch((err) => console.error('Error fetching tickets:', err.message));
    });

    const filteredTickets = tickets.filter(t => 
        t.title.toLowerCase().includes(searchTerm.toLowerCase())
    );
    return (
        <div className="container mt-4">
            {/* search input */}
            <input type="text" 
                className="form-control mb-3"
                placeholder="Search by title"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />

            <h1>Open Tickets</h1>
            {filteredTickets.length === 0 ? (
                <div className="alert alert-info">No matching tickets found.</div>

            ) : (

            // tickets in grid layout
            <div className="row">
                {filteredTickets.map((ticket) => (
                <div className="col-md-6 col-lg-4 mb-4" key={ticket._id}>
                    <TicketDetails ticket={ticket} />
                </div>
                ))}
            </div>
            )}
        </div>
    );
};
export default OpenTickets;
