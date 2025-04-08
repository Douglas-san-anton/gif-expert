import { Link } from 'react-router-dom';

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="navbar-brand">
                <h2>GifMemes</h2>
            </div>
            <div className="navbar-buttons">
                <Link to="/" className="nav-button">
                    Inicio
                </Link>
                <Link to="/favorites" className="nav-button">
                    Favoritos
                </Link>
                <Link to="/my-memes" className="nav-button">
                    Mis Memes
                </Link>
            </div>
        </nav>
    );
};