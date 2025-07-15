import React, {useState} from "react";
import axios from 'axios';
import ReactMarkdown from 'react-markdown';

const TicketDetails = ({ ticket, onClaimSuccess, onFeedback, onRemove }) => {
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
                onClaimSuccess(ticket._id); // removes ticket immediately                  
            })
            .catch((err) => {
                console.error('Claim error:', err.message);
            });
    };

    // handle markdown solution submission
    const handleSolutionSubmit = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/solution/${ticket._id}`, {
                solutionDoc: solutionInput,
                status: 'resolved'
            })
            .then((res) => {
                console.log('Patch res:', res.data);
                onRemove(ticket._id);
                onFeedback('✅ Solution submitted!');
            })
            .catch((err) => {
                console.error('Submission error:', err.message);
                onFeedback('❌ Failed to submit solution');
            });
    };

    // handle google meet links
    const handleMeetSubmit = () => {
        axios
            .patch(`${process.env.REACT_APP_API_BASE_URL}/api/tickets/meet/${ticket._id}`, {
                meetLink: meetInput,
            })
            .then(() => {
                onRemove(ticket._id);
                onFeedback('✅ Meet link submitted!');
            })
            .catch((err) => {
                console.error('Meet link error:', err.message);
                onFeedback('❌ Failed to submit Meet link');

            });
    };

    // layout
    return (
        <div className="card mb-4 h-100 d-flex flex-column">
            <div className="card-body d-flex flex-column">
                <h5 className="card-title">{ticket.title}</h5>
                <p className="card-text"><strong>Description:</strong> {ticket.description}</p>
                <div className="d-flex justify-content-start align-items-center gap-2 flex-wrap mb-3">
                    <span className={`badge bg-${ticket.urgency === 'high' ? 'danger' : ticket.urgency === 'medium' ? 'warning' : 'secondary'}`}>
                        {ticket.urgency}
                    </span>
                    <span className={`badge bg-${ticket.status === 'resolved' ? 'success' : ticket.status === 'claimed' ? 'info' : 'primary'}`}>
                        {ticket.status}
                    </span>
                </div>

                <p><strong>Tags:</strong> {ticket.tags.join(', ')}</p>

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
                {ticket.status === 'open' && (
                    <div className="mt-auto d-flex justify-content-end">
                        <button className="btn btn-outline-primary btn-sm" onClick={handleClaim}>
                            Claim Ticket
                        </button>
                    </div>
                )}

            </div>
        </div>

    );
};
export default TicketDetails;
