import { useState } from 'react';

export const GifItem = ({ title, url }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [text, setText] = useState('');
    const [isFavorite, setIsFavorite] = useState(false);

    const handleSave = () => {
        const meme = {
            title: text || title,
            url,
            memeText: text,
            date: new Date().toISOString()
        };

        const savedMemes = JSON.parse(localStorage.getItem('memes') || '[]');
        localStorage.setItem('memes', JSON.stringify([...savedMemes, meme]));
        setIsEditing(false);
    };

    const toggleFavorite = () => {
        setIsFavorite(!isFavorite);
        const favorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        if (!isFavorite) {
            localStorage.setItem('favorites', JSON.stringify([...favorites, { title, url }]));
        } else {
            const updatedFavorites = favorites.filter(fav => fav.url !== url);
            localStorage.setItem('favorites', JSON.stringify(updatedFavorites));
        }
    };

    return (
        <div className="card">
            <div className="image-container">
                <img src={url} alt={title} />
            </div>
            <div className="card-actions">
                <button 
                    className={`favorite-button ${isFavorite ? 'active' : ''}`}
                    onClick={toggleFavorite}
                >
                    ❤️
                </button>
                <button 
                    className="edit-button"
                    onClick={() => setIsEditing(!isEditing)}
                >
                    ✏️
                </button>
            </div>
            {isEditing && (
                <div className="meme-editor">
                    <input
                        type="text"
                        value={text}
                        onChange={(e) => setText(e.target.value)}
                        placeholder="Escribe tu texto aquí"
                        className="meme-input"
                    />
                    <button 
                        className="save-button"
                        onClick={handleSave}
                    >
                        Guardar
                    </button>
                </div>
            )}
            <p>{text || title}</p>
        </div>
    );
};



