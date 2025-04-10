import { useState, useEffect, useCallback } from 'react';
import { extractDominantColor } from '../helpers/extractDominantColor';
import { useColor } from '../context/ColorContext';
import { DeleteButton } from './DeleteButton';

export const GifItem = ({ title, url, onSelect, memeText, showDelete, onDelete }) => {
    const [text, setText] = useState(memeText || '');
    const [dominantColor, setDominantColor] = useState('rgba(97, 32, 158, 0.7)');
    const [isRemoving, setIsRemoving] = useState(false);
    const { setBackgroundColor } = useColor();

    const processImage = useCallback(async () => {
        const img = new Image();
        img.crossOrigin = "Anonymous";
        img.src = url;
        const color = await extractDominantColor(img);
        setDominantColor(color);
    }, [url]);

    useEffect(() => {
        processImage();
    }, [processImage]);

    useEffect(() => {
        setText(memeText || '');
    }, [memeText]);

    const handleMouseEnter = () => {
        const bgColor = dominantColor.replace('0.7', '0.3');
        setBackgroundColor(bgColor);
    };

    const handleMouseLeave = () => {
        setBackgroundColor('var(--off-white)');
    };

    const handleDelete = (e) => {
        e.stopPropagation();
        setIsRemoving(true);
        setTimeout(() => {
            onDelete?.();
        }, 500); // El mismo tiempo que dura la animación
    };

    return (
        <div 
            className={`card ${isRemoving ? 'removing' : ''}`}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {showDelete && <DeleteButton onClick={handleDelete} title="Eliminar meme" />}
            <div 
                className="image-container"
                onClick={() => onSelect && onSelect()}
            >
                <img 
                    src={url} 
                    alt={title}
                />
                {text && <div className="meme-text">{text}</div>}
            </div>
        </div>
    );
};



