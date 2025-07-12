import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketDetails from './TicketDetails';

const ResolvedTickets = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/resolved`)
            .then((res) => setTickets(res.data.data))
            .catch((err) => {
                console.error('Error fetching resolved tickets:', err.message);
            });
    }, []);

    return (
        <div>
            <h1>Resolved Tickets</h1>
            {tickets.length === 0 ? (
                <p>No resolved tickets yet.</p>
            ) : (
                tickets.map((ticket) => (
                    <TicketDetails key={ticket._id} ticket={ticket} />
                ))
            )}
        </div>
    );
};
export default ResolvedTickets;