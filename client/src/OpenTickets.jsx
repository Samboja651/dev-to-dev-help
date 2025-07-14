import React, { useState, useEffect } from "react";
import axios from 'axios';
import TicketDetails from "./TicketDetails";

const OpenTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');

    const handleClaimSuccess = (claimedId) => {
        // remove claimed ticket from list
        setTickets(prev => prev.filter(t => t._id !== claimedId));

        setAlertMsg('✅ Ticket claimed!');
        setAlertType('success');

        setTimeout(() => {
            setAlertMsg('');
            setAlertType('');
        }, 5000); // keep alert visible for 5 seconds
    };

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/open`)
            .then((res) => setTickets(res.data.data))
            .catch((err) => console.error('Error fetching tickets:', err.message));
    }, []);

    const filteredTickets = tickets.filter(t =>
        (t.title?.toLowerCase() || '').includes((searchTerm || '').toLowerCase())
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

            {alertMsg && (
            <div className={`alert alert-${alertType} toast-timer`} role="alert">
                {alertMsg}
            </div>
            )}

            {filteredTickets.length === 0 ? (
                <div className="alert alert-info">No matching tickets found.</div>

            ) : (

            // tickets in grid layout
            <div className="row">
                {filteredTickets.map((ticket) => (
                <div className="col-md-6 col-lg-4 mb-4" key={ticket._id}>
                    <TicketDetails 
                        key={ticket._id}
                        ticket={ticket}
                        onClaimSuccess={handleClaimSuccess} 
                    />
                </div>
                ))}
            </div>
            )}
        </div>
    );
};
export default OpenTickets;
