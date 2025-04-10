import { useState } from 'react';
import { GifItem } from './GifItem';
import { Skeleton } from './Skeleton';
import { DeleteButton } from './DeleteButton';
import { useFetchGifs } from '../hooks/useFetchGifs';
import { useGifsContext } from '../context/GifsContext';

export const GifGrid = ({ category, onSelectGif }) => {
    const { images, isLoading, hasMore, loadMore } = useFetchGifs(category);
    const { removeCategory } = useGifsContext();
    const [isRemoving, setIsRemoving] = useState(false);

    const handleRemoveCategory = () => {
        setIsRemoving(true);
        setTimeout(() => {
            removeCategory(category);
        }, 500);
    };

    return (
        <div className={`category-container ${isRemoving ? 'removing' : ''}`}>
            <div className="category-header">
                <h3>{category}</h3>
                <DeleteButton 
                    onClick={handleRemoveCategory}
                    title="Eliminar categoría"
                    className="category-delete-button"
                />
            </div>
            <div className="card-grid">
                {isLoading && Array.from({ length: 12 }).map((_, index) => (
                    <Skeleton key={index} />
                ))}
                {!isLoading && images.map((image) => (
                    <GifItem 
                        key={image.id} 
                        {...image}
                        onSelect={() => onSelectGif(image)}
                    />
                ))}
            </div>
            {hasMore && !isLoading && (
                <button 
                    className="load-more-button"
                    onClick={loadMore}
                >
                    Cargar más
                </button>
            )}
        </div>
    );
};
