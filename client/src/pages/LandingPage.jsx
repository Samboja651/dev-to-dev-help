import { Link } from 'react-router-dom';

export default function LandingPage() {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{minHeight: "90vh"}}>
            <h1 className='mb-2 display-4 fw-bold animate__animated animate__fadeInDown'>Get Unstuck, Fast.</h1>
            <p className="lead text-center mb-4" style={{ maxWidth: 600 }}>
                <span className="fw-semibold">Real Debugging</span> connects you with real developers to solve your toughest bugs. Post issues, upload screenshots, and collaborate live!
            </p>
            <div className="mb-4">
                <img src="/logo192.png" alt="Real Debugging logo" style={{ width: 120, animation: "bounce 2s infinite" }}/>
            </div>
            <div className="row text-center my-5 w-100">
                <div className="col">
                    <i className="bi bi-bug display-4 text-danger"></i>
                    <h5>Post Issues</h5>
                    <p>Describe your problem and upload screenshots.</p>
                </div>
                <div className="col">
                    <i className="bi bi-people display-4 text-primary"></i>
                    <h5>Collaborate Live</h5>
                    <p>Get help from real developers in real time.</p>
                </div>
                <div className="col">
                    <i className="bi bi-check-circle display-4 text-success"></i>
                    <h5>Verified Solutions</h5>
                    <p>Mark issues as resolved and share knowledge.</p>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <Link to="/register" className="btn btn-success btn-lg animate__animated animate__pulse animate__infinite">Get Started</Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">Sign in</Link>
            </div>
            <blockquote className="blockquote text-center mt-4">
                <p className="mb-0">"I solved my toughest bug in minutes with Real Debugging!"</p>
                <footer className="blockquote-footer">Jane D., Full Stack Developer</footer>
            </blockquote>
            <p className="mt-4 text-muted text-center" style={{ maxWidth: 500}}>
                Join now and get your toughest bugs solved by real devs in guided sessions.
            </p>
        </div>
    );
}