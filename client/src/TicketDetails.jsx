import React from "react";
import ReactMarkdown from 'react-markdown';

const TicketDetails = ({ ticket }) => {
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
        </div>
    );
};
export default TicketDetails;
