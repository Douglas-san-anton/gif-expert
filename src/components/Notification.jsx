import { useEffect } from 'react';
import { Link } from 'react-router-dom';

export const Notification = ({ message, isVisible, onClose, showButton = true }) => {
    useEffect(() => {
        if (isVisible) {
            const timer = setTimeout(() => {
                onClose();
            }, 5000); // La notificación se cerrará automáticamente después de 5 segundos

            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    if (!isVisible) return null;

    return (
        <div className="notification">
            <div className="notification-content">
                <span>{message}</span>
                {showButton && (
                    <Link to="/my-memes" className="notification-button">
                        Ver en Mis Memes
                    </Link>
                )}
            </div>
        </div>
    );
};