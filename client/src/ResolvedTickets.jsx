import React, { useEffect, useState } from 'react';
import axios from 'axios';
import TicketDetails from './TicketDetails';
import Loader from './components/Loader';

const ResolvedTickets = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios
            .get(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/resolved`)
            .then((res) => setTickets(res.data.data))
            .catch((err) => {
                console.error('Error fetching resolved tickets:', err.message);
            })
            .finally(() => setLoading(false));
    }, []);

    return (
        <div className="container mt-4">
            <h1>Resolved Tickets</h1>

            {loading ? (
                <Loader message="Fetching data..." />
            ) : tickets.length === 0 ? (
                <p>No resolved tickets.</p>
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
export default ResolvedTickets;
