import { Link } from "react-router-dom";

function Navbar() {
    return (
        <nav id="navbar" className="navbar navbar-expand-lg navbar-dark p-4 w-100">
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <Link to="/authentication" className="nav-link" href="#"><i className="fas fa-user"></i> Cambia Profilo</Link>
                    </li>
                    <li className="nav-item">
                        <Link to="/" className="nav-link" href="#"><i className="fas fa-sign-out-alt"></i> Logout</Link>
                    </li>
                </ul>
            </div>
        </nav>
    );
}

export default Navbar