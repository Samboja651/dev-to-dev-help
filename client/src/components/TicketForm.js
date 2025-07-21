import React, { useState, useEffect } from "react";

export default function TicketForm() {
    const API_BASE = process.env.REACT_APP_API_BASE_URL;

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        urgency: 'medium', // 👈 Add this default
    });

    
    
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null); // { type, message }
    
    useEffect(() => {
        if (submissionResult) {
            const timer = setTimeout(() => {
            setSubmissionResult(null);
            }, 4000); // 4 seconds

            return () => clearTimeout(timer); // Clean up
        }
    }, [submissionResult]);

    const handleChange = (e) => {
        setFormData({...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()),
            createdBy: 'demo-user', // pass the auth user
        };

        setIsSubmitting(true);
        setSubmissionResult(null);

        try {
            const res = await fetch(`${API_BASE}/api/tickets/submit`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await res.json();

            if (res.ok) {
                setFormData({ title: '', description: '', tags: '', urgency: 'medium' });
                setSubmissionResult({ type: 'success', message: 'Ticket submitted successfully!' });
            } else {
                setSubmissionResult({ type: 'error', message: data.message || 'Submission failed.' });
            }
        } catch (error) {
            console.error(error);
            setSubmissionResult({ type: 'error', message: 'Server error. Please try again.' });
        } finally {
            setIsSubmitting(false);
        }

    };

  return (
    <div className="p-4 shadow-sm">
        <h4 className="mb-4">Create a Ticket</h4>

        {submissionResult?.type === 'success' && (
        <div className="card border-success mb-4 position-relative">
            <div className="card-body bg-light text-success">
            <i className="bi bi-check-circle-fill me-2"></i>
            {submissionResult.message}
            </div>
            <div className="progress position-absolute bottom-0 start-0 w-100" style={{ height: '4px' }}>
            <div className="progress-bar bg-success progress-bar-striped progress-bar-animated" style={{ width: '100%' }}></div>
            </div>
        </div>
        )}

        {submissionResult?.type === 'error' && (
        <div className="card border-danger mb-4">
            <div className="card-body bg-light text-danger">
            <i className="bi bi-exclamation-circle-fill me-2"></i>
            {submissionResult.message}
            </div>
        </div>
        )}

        <form onSubmit={handleSubmit}>
        <div className="mb-3">
            <label htmlFor="title" className="form-label">Title</label>
            <input
            id="title"
            name="title"
            className="form-control"
            value={formData.title}
            onChange={handleChange}
            required
            />
        </div>

        <div className="mb-3">
            <label htmlFor="description" className="form-label">Description</label>
            <textarea
            id="description"
            name="description"
            className="form-control"
            value={formData.description}
            onChange={handleChange}
            required
            />
        </div>

        <div className="mb-3">
            <label htmlFor="tags" className="form-label">Tags</label>
            <input
            id="tags"
            name="tags"
            placeholder="e.g backend, database"
            className="form-control"
            value={formData.tags}
            onChange={handleChange}
            />
        </div>

        <div className="mb-3">
            <label htmlFor="urgency" className="form-label">Urgency</label>
            <select
            id="urgency"
            name="urgency"
            className="form-select"
            value={formData.urgency}
            onChange={handleChange}
            required
            >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            </select>
        </div>
        <button type="submit" className="btn btn-primary" disabled={isSubmitting}>
            {isSubmitting ? (
                <span className="spinner-border spinner-border-sm me-2" role="status" aria-hidden="true"></span>
            ) : null}
            {isSubmitting ? 'Submitting...' : 'Submit Ticket'}
        </button>

        </form>
    </div>
    )
};
