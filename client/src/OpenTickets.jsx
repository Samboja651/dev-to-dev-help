import React, { useState, useEffect } from "react";
import axios from 'axios';
import TicketDetails from "./TicketDetails";

const OpenTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/open`)
            .then((res) => setTickets(res.data.data))
            .catch((err) => console.error('Error fetching tickets:', err.message));
    }, []);

    return (
    <div className="container mt-4">
        <h1>Open Tickets</h1>
        {tickets.length === 0 ? (
        <p>No open tickets yet.</p>
        ) : (
        <div className="row">
            {tickets.map((ticket) => (
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
