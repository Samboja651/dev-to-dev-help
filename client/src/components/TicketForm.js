import React, { useState, useEffect } from "react";
import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContexts";
import axios from "axios";

export default function TicketForm() {
    const API_BASE = process.env.REACT_APP_API_BASE_URL;
    const { user } = useContext(AuthContext);
    const [imageUrl, setImageUrl] = useState('');
    const [uploadProgress, setUploadProgress] = useState(0); // <-- Add this line

    const [formData, setFormData] = useState({
        title: '',
        description: '',
        tags: '',
        urgency: 'medium',
    });

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);

    useEffect(() => {
        if (submissionResult) {
            const timer = setTimeout(() => {
                setSubmissionResult(null);
            }, 4000);
            return () => clearTimeout(timer);
        }
    }, [submissionResult]);

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const payload = {
            ...formData,
            tags: formData.tags.split(',').map(tag => tag.trim()),
            createdBy: user?._id,
            imageUrl,
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
                setImageUrl('');
                setSubmissionResult({ type: 'success', message: 'Success. Help is on the way' });
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

    const handleImageUpload = async (e) => {
        const file = e.target.files[0];
        if (!file) return;
        if (!file.type.startsWith('image/')) {
            setSubmissionResult({ type: 'error', message: 'Only image files are allowed.' });
            return;
        }
        if (file.size > 5 * 1024 * 1024) {
            setSubmissionResult({ type: 'error', message: 'Image size must be less than 5MB.' });
            return;
        }

        setUploadProgress(0); // Reset progress

        const formData = new FormData();
        formData.append('image', file);
        try {
            const res = await axios.post(
                `${API_BASE}/api/tickets/upload-image`,
                formData,
                {
                    headers: { 'Content-Type': 'multipart/form-data' },
                    onUploadProgress: (progressEvent) => {
                        if (progressEvent.total) {
                            const percent = Math.round((progressEvent.loaded * 100) / progressEvent.total);
                            setUploadProgress(percent);
                        }
                    }
                }
            );
            setImageUrl(res.data.imageUrl);
            setUploadProgress(100); // Complete
        } catch (err) {
            setSubmissionResult({ type: 'error', message: 'Image upload failed.' });
            setUploadProgress(0);
        }
    }

    return (
        <div className="p-4">
            <h4 className="mb-4">What technical issue do you have?</h4>

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
                    <label htmlFor="image" className="form-label">Upload a screenshot (optional)</label>
                    <input
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={handleImageUpload}
                    />
                    {/* Progress bar for image upload */}
                    {uploadProgress > 0 && uploadProgress < 100 && (
                        <div className="progress mt-2" style={{ height: '6px' }}>
                            <div
                                className="progress-bar progress-bar-striped progress-bar-animated bg-info"
                                role="progressbar"
                                style={{ width: `${uploadProgress}%` }}
                                aria-valuenow={uploadProgress}
                                aria-valuemin="0"
                                aria-valuemax="100"
                            />
                        </div>
                    )}
                    {imageUrl && (
                        <div className="mt-2">
                            <img src={imageUrl} alt="problem screenshot" style={{ maxWidth: '100%' }} />
                        </div>
                    )}
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
                    {isSubmitting ? 'Submitting...' : 'Help'}
                </button>
            </form>
        </div>
    )
};
