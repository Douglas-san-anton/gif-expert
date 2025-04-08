import { useState } from 'react';

export const MemeEditor = ({ onSave, initialText = '', isVisible }) => {
    const [text, setText] = useState(initialText);

    const handleSave = () => {
        onSave(text);
        setText('');
    };

    if (!isVisible) return null;

    return (
        <div className="meme-editor-fixed">
            <div className="meme-editor-container">
                <input
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Escribe tu texto aquí"
                    className="meme-input"
                    autoFocus
                />
                <button 
                    className="save-button"
                    onClick={handleSave}
                >
                    Guardar
                </button>
            </div>
        </div>
    );
};
