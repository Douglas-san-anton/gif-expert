import { useState, useEffect, useRef } from 'react';

export const MemeEditor = ({ onSave, initialText = '', isVisible }) => {
    const [text, setText] = useState(initialText);
    const editorRef = useRef(null);
    const inputRef = useRef(null);

    useEffect(() => {
        setText(initialText);
    }, [initialText]);

    useEffect(() => {
        if (isVisible && inputRef.current) {
            inputRef.current.focus();
            inputRef.current.select();
        }
    }, [isVisible]);

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (editorRef.current && !editorRef.current.contains(event.target)) {
                if (text.trim()) {
                    onSave(text);
                } else {
                    onSave(null);
                }
            }
        };

        if (isVisible) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isVisible, onSave, text]);

    const handleSave = () => {
        if (text.trim()) {
            onSave(text);
            setText('');
        }
    };

    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && text.trim()) {
            e.preventDefault();
            onSave(text);
            setText('');
        }
    };

    return (
        <div 
            className="meme-editor-fixed"
            style={{
                transform: isVisible ? 'translateY(0)' : 'translateY(100%)'
            }}
            ref={editorRef}
        >
            <div className="meme-editor-container">
                <input
                    ref={inputRef}
                    type="text"
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    onKeyUp={handleKeyPress}
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
        </div>
    );
};
