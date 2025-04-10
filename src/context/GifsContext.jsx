import { createContext, useContext, useState, useEffect } from 'react';

const GifsContext = createContext();

export const useGifsContext = () => {
    const context = useContext(GifsContext);
    if (!context) {
        throw new Error('useGifsContext debe usarse dentro de un GifsProvider');
    }
    return context;
};

export const GifsProvider = ({ children }) => {
    const [gifCache, setGifCache] = useState({});
    const [categoryState, setCategoryState] = useState({});
    const [categories, setCategories] = useState(() => {
        // Intentar recuperar las categorías del localStorage
        const savedCategories = localStorage.getItem('categories');
        return savedCategories ? JSON.parse(savedCategories) : ['Dragon Ball'];
    });

    // Guardar categorías en localStorage cuando cambien
    useEffect(() => {
        localStorage.setItem('categories', JSON.stringify(categories));
    }, [categories]);

    const addGifsToCache = (category, page, gifs) => {
        setGifCache(prev => ({
            ...prev,
            [category]: {
                ...prev[category],
                [page]: gifs,
                lastUpdate: Date.now()
            }
        }));
    };

    const updateCategoryState = (category, state) => {
        setCategoryState(prev => ({
            ...prev,
            [category]: state
        }));
    };

    const getCategoryState = (category) => {
        return categoryState[category] || { currentPage: 0, hasMore: true };
    };

    const addCategory = (newCategory) => {
        if (!categories.includes(newCategory)) {
            setCategories(prev => [newCategory, ...prev]);
        }
    };

    const removeCategory = (categoryToRemove) => {
        setCategories(prev => prev.filter(cat => cat !== categoryToRemove));
    };

    const getCachedGifs = (category) => {
        const categoryCache = gifCache[category] || {};
        const state = getCategoryState(category);
        const allGifs = [];
        
        // Combinar los GIFs de todas las páginas cargadas
        for (let i = 0; i <= state.currentPage; i++) {
            const pageGifs = categoryCache[i] || [];
            allGifs.push(...pageGifs);
        }
        
        return {
            gifs: allGifs,
            state: state
        };
    };

    const clearCache = () => {
        setGifCache({});
        setCategoryState({});
    };

    return (
        <GifsContext.Provider value={{ 
            gifCache, 
            addGifsToCache, 
            getCachedGifs, 
            clearCache,
            updateCategoryState,
            getCategoryState,
            categories,
            addCategory,
            removeCategory
        }}>
            {children}
        </GifsContext.Provider>
    );
};