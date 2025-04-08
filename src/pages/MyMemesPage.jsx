import { useEffect, useState } from 'react';
import { GifItem } from '../components';

export const MyMemesPage = () => {
    const [memes, setMemes] = useState([]);

    useEffect(() => {
        const savedMemes = JSON.parse(localStorage.getItem('memes') || '[]');
        setMemes(savedMemes);
    }, []);

    return (
        <div className="content">
            <h1>Mis Memes</h1>
            <div className="card-grid">
                {memes.map((meme) => (
                    <GifItem 
                        key={meme.url} 
                        {...meme} 
                    />
                ))}
            </div>
        </div>
    );
};