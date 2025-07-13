import React, {useState} from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TicketDetails = ({ ticket }) => {
    // state for markdown solution
    const [solutionInput, setSolutionInput] = useState('');
    const [meetInput, setMeetInput] = useState('');
    const [alertMsg, setAlertMsg] = useState('');
    const [alertType, setAlertType] = useState('');


    // handle ticket claiming
    const handleClaim = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/claim/${ticket._id}`, {
                helperId: 'dev-helper-004' // later make this dynamic
            })
            .then((res) => {
                setAlertMsg('✅ Ticket claimed!');
                setAlertType('success');
            })
            .catch((err) => {
                console.error('Claim error:', err.message);
                setAlertMsg('❌ Failed to claim ticket');
                setAlertType('danger');
            });
    };

    // handle markdown solution submission
    const handleSolutionSubmit = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/solution/${ticket._id}`, {
                solutionDoc: solutionInput,
            })
            .then(() => {
                setAlertMsg('✅ Solution submitted!');
                setAlertType('success');
            })
            .catch((err) => {
                console.error('Submission error:', err.message);
                setAlertMsg('❌ Failed to submit solution');
                setAlertType('danger');
            });
    };

    // handle google meet links
    const handleMeetSubmit = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/meet/${ticket._id}`, {
                meetLink: meetInput,
            })
            .then(() => {
                setAlertMsg('✅ Meet link submitted');
                setAlertType('success');
            })
            .catch((err) => {
                console.error('Meet link error:', err.message);
                setAlertMsg('❌ Failed to submit Meet link');
                setAlertType('danger');
            });
    };

    // layout
    return (
        <div className="card mb-4">
            {alertMsg && (
                <div className={`alert alert-${alertType} mx-3`} role="alert">
                    {alertMsg}
                </div>
            )}

            <div className="card-body">
                <h5 className="card-title">{ticket.title}</h5>
                <p className="card-text"><strong>Description:</strong> {ticket.description}</p>
                <p><strong>Tags:</strong> {ticket.tags.join(', ')}</p>

                <span className={`badge bg-${ticket.urgency === 'high' ? 'danger' : ticket.urgency === 'medium' ? 'warning' : 'secondary'} me-2`}>
                {ticket.urgency}
                </span>
                <span className={`badge bg-${ticket.status === 'resolved' ? 'success' : ticket.status === 'claimed' ? 'info' : 'primary'}`}>
                {ticket.status}
                </span>

                {ticket.claimedBy && <p><strong>Claimed By:</strong> {ticket.claimedBy}</p>}

                {ticket.solutionDoc && (
                <div className="mt-3">
                    <h6>Solution</h6>
                    <ReactMarkdown>{ticket.solutionDoc}</ReactMarkdown>
                </div>
                )}

                {ticket.meetLink && (
                <p className="mt-2">
                    <strong>Google Meet:</strong>{' '}
                    <a href={ticket.meetLink} target="_blank" rel="noopener noreferrer">
                    Join Call
                    </a>
                </p>
                )}

                {ticket.status === 'open' && (
                <button className="btn btn-primary mt-3" onClick={handleClaim}>Claim Ticket</button>
                )}

                {ticket.status === 'claimed' && (
                <>
                    <div className="mt-4">
                    <h6>Solution (Markdown)</h6>
                    <textarea
                        className="form-control"
                        value={solutionInput}
                        onChange={(e) => setSolutionInput(e.target.value)}
                        rows={6}
                        placeholder="Write markdown solution here"
                    />
                    <button className="btn btn-secondary mt-2" onClick={handleSolutionSubmit}>Submit</button>
                    </div>

                    <div className="mt-4">
                    <h6>Google Meet Link</h6>
                    <input
                        type="url"
                        className="form-control"
                        value={meetInput}
                        onChange={(e) => setMeetInput(e.target.value)}
                        placeholder="https://meet.google.com/your-code"
                    />
                    <button className="btn btn-outline-primary mt-2" onClick={handleMeetSubmit}>Submit</button>
                    </div>
                </>
                )}
            </div>
        </div>

    );
};
export default TicketDetails;
