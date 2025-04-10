import { createContext, useState, useContext, useEffect } from 'react';

const ColorContext = createContext();

export const ColorProvider = ({ children }) => {
    const [backgroundColor, setBackgroundColor] = useState('var(--off-white)');

    useEffect(() => {
        document.body.style.backgroundColor = backgroundColor;
    }, [backgroundColor]);

    return (
        <ColorContext.Provider value={{ backgroundColor, setBackgroundColor }}>
            {children}
        </ColorContext.Provider>
    );
};

export const useColor = () => {
    const context = useContext(ColorContext);
    if (!context) {
        throw new Error('useColor must be used within a ColorProvider');
    }
    return context;
};