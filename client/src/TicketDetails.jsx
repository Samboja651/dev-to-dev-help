import React from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TicketDetails = ({ ticket }) => {
    const handleClaim = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/claim/${ticket._id}`, {
                helperId: 'dev-helper-004' // later make this dynamic
            })
            .then((res) => {
                alert('Ticket claimed!');
                window.location.reload(); // later switch to use state
            })
            .catch((err) => {
                console.error('Claim error:', err.message);
                alert('Failed to claim ticket');
            });
    };

    return (
        <div className="ticket-card">
            <h2>{ticket.title}</h2>
            <p><strong>Description:</strong> {ticket.description}</p>
            <p><strong>Tags:</strong> {ticket.tags.join(', ')}</p>
            <p><strong>Urgency:</strong> {ticket.urgency}</p>
            <p><strong>Status:</strong> {ticket.status}</p>

            {ticket.claimedBy && <p><strong>Claimed By:</strong> {ticket.claimedBy}</p>}

            {ticket.solutionDoc && (
                <div className="solution-doc">
                    <h3>Solution:</h3>
                    <ReactMarkdown>{ticket.solutionDoc}</ReactMarkdown>
                </div>
            )}

            {ticket.meetLink && (
                <p>
                    <strong>Google Meet:</strong>{' '}
                    <a href={ticket.meetLink} target="_blank" rel="noopener noreferrer">
                        Join Call
                    </a>
                </p>
            )}

            {ticket.status === 'open' && (
                <button onClick={handleClaim}>Claim Ticket</button>
            )}
        </div>
    );
};
export default TicketDetails;
