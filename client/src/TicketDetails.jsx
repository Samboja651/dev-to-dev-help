import React, {useState} from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TicketDetails = ({ ticket }) => {
    // state for markdown solution
    const [solutionInput, setSolutionInput] = useState('');
    const [meetInput, setMeetInput] = useState('');

    // handle ticket claiming
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

    // handle markdown solution submission
    const handleSolutionSubmit = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/solution/${ticket._id}`, {
                solutionDoc: solutionInput,
            })
            .then(() => {
                alert('Solution submitted!');
                window.location.reload();
            })
            .catch((err) => {
                console.error('Submission error:', err.message);
                alert('Failed to submit solution');
            });
    };

    // handle google meet links
    const handleMeetSubmit = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/meet/${ticket._id}`, {
                meetLink: meetInput,
            })
            .then(() => {
                alert('Meet link submitted');
                window.location.reload();
            })
            .catch((err) => {
                console.error('Meet link error:', err.message);
                alert('Failed to submit Meet link');
            });
    };

    // layout
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

            {/* claim btn visible only if ticket is open */}
            {ticket.status === 'open' && (
                <button onClick={handleClaim}>Claim Ticket</button>
            )}
            {/* solution form visible only if ticket is claimed */}
            {ticket.status === 'claimed' && (
                <div>
                    <h3>Solution (Markdown)</h3>
                    <textarea 
                        value={solutionInput}
                        onChange={(e) => setSolutionInput(e.target.value)}
                        rows={6}
                        cols={50}
                        placeholder="write markdown solution here"
                    />
                    <br />
                    <button onClick={handleSolutionSubmit}>Submit</button>
                </div>
            )}

            {ticket.status === 'claimed' && (
                <div>
                    <h3>Google Meet Link</h3>
                    <input 
                    type="text"
                    value={meetInput}
                    onChange={(e) => setMeetInput(e.target.value)}
                    placeholder="https://meet.google.com/your-code"
                    />
                    <br />
                    <button onClick={handleMeetSubmit}>Submit</button>
                </div>
            )}

        </div>
    );
};
export default TicketDetails;
