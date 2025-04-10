import { useEffect, useState } from "react";
import { getGifs } from "../helpers/getGIfs";
import { useGifsContext } from "../context/GifsContext";

export const useFetchGifs = (category) => {
    const [images, setImages] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const { getCachedGifs, addGifsToCache, updateCategoryState, getCategoryState } = useGifsContext();
    
    const getImages = async (pageNumber) => {
        setIsLoading(true);
        
        // Si es la página 0, intentar cargar desde caché
        if (pageNumber === 0) {
            const { gifs, state } = getCachedGifs(category);
            if (gifs.length > 0) {
                setImages(gifs);
                setIsLoading(false);
                return;
            }
        }

        // Si no está en caché o es una nueva página, hacer la petición
        const newImages = await getGifs(category, pageNumber);
        
        // Guardar en caché
        addGifsToCache(category, pageNumber, newImages);

        // Actualizar el estado de la categoría
        updateCategoryState(category, {
            currentPage: pageNumber,
            hasMore: newImages.length > 0
        });

        if (pageNumber === 0) {
            setImages(newImages);
        } else {
            setImages(prevImages => [...prevImages, ...newImages]);
        }
        setIsLoading(false);
    }

    const loadMore = () => {
        if (!isLoading) {
            const state = getCategoryState(category);
            if (state.hasMore) {
                const nextPage = state.currentPage + 1;
                getImages(nextPage);
            }
        }
    };

    useEffect(() => {
        const state = getCategoryState(category);
        if (state.currentPage === 0) {
            getImages(0);
        } else {
            // Recuperar todos los GIFs almacenados para esta categoría
            const { gifs } = getCachedGifs(category);
            setImages(gifs);
            setIsLoading(false);
        }
    }, [category]);

    const state = getCategoryState(category);
    return {
        images,
        isLoading,
        hasMore: state.hasMore,
        loadMore
    }
};
