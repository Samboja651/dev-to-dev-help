import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{minHeight: "80vh"}}>
            <h1 className='mb-3'>Real Debugging</h1>
            <p className="lead text-center mb-4" style={{ maxWidth: 600 }}>
                Real Debugging is your collaborative platform for posting, claiming, and resolving technical issues.
                Upload screenshots, discuss solutions, and get help from a real human in real time.
            </p>
            <div className="mb-4">
                <img src="/logo192.png" alt="Real Debugging logo" style={{ width: 120 }}/>
            </div>
            <div className="d-flex gap-3">
                <Link to="/register" className="btn btn-success btn-lg">Get Started</Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">Sign in</Link>
            </div>
            <p className="mt-4 text-muted text-center" style={{ maxWidth: 500}}>
                Join now and get your toughest bugs solved by Real devs in guided sessions.
            </p>
        </div>
    );
}