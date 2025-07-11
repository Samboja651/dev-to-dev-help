import React, { useState, useEffect } from "react";
import axios from 'axios';
import TicketDetails from "./TicketDetails";

const OpenTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/open`)
            .then((res) => setTickets(res.data))
            .catch((err) => console.error('Error fetching tickets:', err.message));
    }, []);

    return (
        <div>
            <h1>Open Tickets</h1>
            {tickets.length === 0 ? (
                <p>No open tickets yet.</p>
            ) : (
                tickets.map((ticket) => (
                    <TicketDetails key={ticket._id} ticket={ticket} />
                ))
            )}
        </div>
    );
};
export default OpenTickets;
