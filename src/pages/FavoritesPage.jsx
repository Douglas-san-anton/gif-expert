import { useEffect, useState } from 'react';
import { GifItem } from '../components';

export const FavoritesPage = () => {
    const [favorites, setFavorites] = useState([]);

    useEffect(() => {
        const savedFavorites = JSON.parse(localStorage.getItem('favorites') || '[]');
        setFavorites(savedFavorites);
    }, []);

    return (
        <div className="content">
            <h1>Mis Favoritos</h1>
            <div className="card-grid">
                {favorites.map((gif) => (
                    <GifItem 
                        key={gif.url} 
                        {...gif} 
                    />
                ))}
            </div>
        </div>
    );
};