import { useEffect, useState } from 'react';
import { GifItem, MemeEditor, Notification } from '../components';

export const MyMemesPage = () => {
    const [memes, setMemes] = useState([]);
    const [selectedMeme, setSelectedMeme] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);

    useEffect(() => {
        loadMemes();
    }, []);

    const loadMemes = () => {
        const savedMemes = JSON.parse(localStorage.getItem('memes') || '[]');
        setMemes(savedMemes);
    };

    const handleSaveMeme = (text) => {
        if (selectedMeme) {
            const updatedMemes = memes.map(meme => 
                meme.id === selectedMeme.id 
                    ? { ...meme, memeText: text }
                    : meme
            );
            localStorage.setItem('memes', JSON.stringify(updatedMemes));
            setMemes(updatedMemes);
            setSelectedMeme(null);
            setIsEditing(false);
        }
    };

    const handleDelete = (memeId) => {
        const updatedMemes = memes.filter(meme => meme.id !== memeId);
        localStorage.setItem('memes', JSON.stringify(updatedMemes));
        setMemes(updatedMemes);
        setShowNotification(true);
    };

    return (
        <div className="content">
            <h1>Mis Memes</h1>
            <div className="card-grid">
                {memes.length === 0 ? (
                    <p>No hay memes guardados</p>
                ) : (
                    memes.map((meme) => (
                        <GifItem 
                            key={meme.id}
                            {...meme}
                            onSelect={() => {
                                setSelectedMeme(meme);
                                setIsEditing(true);
                            }}
                            showDelete
                            onDelete={() => handleDelete(meme.id)}
                        />
                    ))
                )}
            </div>
            <MemeEditor 
                onSave={handleSaveMeme}
                initialText={selectedMeme?.memeText || ''}
                isVisible={isEditing}
            />
            <Notification 
                message="Meme eliminado exitosamente"
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
                showButton={false}
            />
        </div>
    );
};