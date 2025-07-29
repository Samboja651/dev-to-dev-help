import { Link } from 'react-router-dom';
import 'animate.css';

export default function LandingPage() {
    return (
        <div className='container d-flex flex-column justify-content-center align-items-center' style={{minHeight: "90vh"}}>
            <h1 className='mb-2 display-4 fw-bold animate__animated animate__fadeInDown'>Get Unstuck, Fast.</h1>
            <p className="lead text-center mb-4" style={{ maxWidth: 600 }}>
                <span
                    className="fw-bold"
                    style={{
                        fontSize: "2rem",
                        background: "linear-gradient(90deg, #007bff, #28a745, #17a2b8, #ffc107)",
                        WebkitBackgroundClip: "text",
                        WebkitTextFillColor: "transparent",
                        textShadow: "0 2px 8px rgba(0,0,0,0.08)"
                    }}
                >
                    Xperience Debugging
                </span>
                <span className="ms-2">
                    connects you with developers to solve your toughest bugs.
                </span>
                <span className="d-block mt-2">
                    <span className="animate__animated animate__fadeInLeft animate__delay-1s text-primary fw-bold">Post issues</span>
                    <span className="mx-2 animate__animated animate__fadeInDown animate__delay-2s text-success fw-bold">upload screenshots</span>
                    <span className="animate__animated animate__fadeInRight animate__delay-3s text-info fw-bold">collaborate live</span>
                    !
                </span>
            </p>
            <div className="mb-4">
              <img
                src="/undraw_fixing-bugs_13mt.svg"
                alt="Debugging illustration"
                style={{ width: 220, maxWidth: "90vw", height: "auto", display: "block", margin: "0 auto" }}
              />
            </div>
            <div className="row text-center my-5 w-100">
                <div className="col">
                    <i className="bi bi-bug display-4 text-danger animate__animated animate__bounceIn"></i>
                    <h5>Post Issues</h5>
                    <p>Describe your problem and upload screenshots.</p>
                </div>
                <div className="col">
                    <i className="bi bi-people display-4 text-primary animate__animated animate__bounceIn animate__delay-1s"></i>
                    <h5>Collaborate Live</h5>
                    <p>Get help from software engineers in real time.</p>
                </div>
                <div className="col">
                    <i className="bi bi-check-circle display-4 text-success animate__animated animate__bounceIn animate__delay-2s"></i>
                    <h5>Verified Solutions</h5>
                    <p>Mark issues as resolved and share knowledge.</p>
                </div>
            </div>
            <div className="d-flex gap-3 mb-3">
                <Link to="/register" className="btn btn-success btn-lg animate__animated animate__pulse">Get Started</Link>
                <Link to="/login" className="btn btn-outline-primary btn-lg">Sign in</Link>
            </div>
            <blockquote className="blockquote text-center mt-4">
                <p className="mb-2">"Not only was my issue solved but also leant how to trace, log and debug bugs!"</p>
                <footer className="blockquote-footer mt-1">
                    Jane D., Junior Full Stack Developer
                </footer>
            </blockquote>
            <p className="mt-4 text-muted text-center" style={{ maxWidth: 500}}>
                Join now and get your bug solved instantly in a guided session.
            </p>
        </div>
    );
}