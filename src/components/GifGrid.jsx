import { GifItem } from './GifItem';
import { useFetchGifs } from '../hooks/useFetchGifs';

export const GifGrid = ({ category, onSelectGif }) => {
    const { images, isLoading } = useFetchGifs(category);

    return (
        <>
            <h3>{category}</h3>
            {
                isLoading && (<h2>Cargando...</h2>)
            }
            <div className="card-grid">
                {
                    images.map((image) => (
                        <GifItem 
                            key={image.id} 
                            {...image}
                            onSelect={() => onSelectGif({ ...image, onSave: (text) => {
                                // La lógica de guardado se maneja en el componente GifItem
                                const gifItem = document.querySelector(`[data-id="${image.id}"]`);
                                if (gifItem) {
                                    gifItem.dispatchEvent(new CustomEvent('saveMeme', { detail: { text } }));
                                }
                            }})}
                        />
                    ))
                }
            </div>
        </>
    )
}
