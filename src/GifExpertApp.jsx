import { useState } from "react";
import { AddCategory, GifGrid, MemeEditor, Aside, ScrollToTop, Notification } from "./components";
import { useGifsContext } from "./context/GifsContext";

export const GifExpertApp = () => {
    const [selectedGif, setSelectedGif] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [showNotification, setShowNotification] = useState(false);
    const { categories, addCategory } = useGifsContext();

    const onAddCategory = (newCategory) => {
        addCategory(newCategory);
    }

    const onSelectCategory = (category) => {
        addCategory(category);
    }

    const handleSaveMeme = (text) => {
        // Si recibimos null, solo cerramos el editor sin guardar
        if (text === null) {
            setSelectedGif(null);
            setIsEditing(false);
            return;
        }

        // Si hay texto y un GIF seleccionado, guardamos el meme
        if (text && selectedGif) {
            const memeToSave = {
                id: selectedGif.id,
                title: selectedGif.title,
                url: selectedGif.url,
                memeText: text,
                date: new Date().toISOString()
            };
            
            const savedMemes = JSON.parse(localStorage.getItem('memes') || '[]');
            localStorage.setItem('memes', JSON.stringify([...savedMemes, memeToSave]));
            
            setSelectedGif(null);
            setIsEditing(false);
            setShowNotification(true);
        }
    }

    return (
        <div className="main-container">
            <div className="content">
                <h1>GifExpertApp</h1>
                <AddCategory onNewCategory={onAddCategory}/>   
                {
                    categories.map(category => (
                        <GifGrid 
                            key={category} 
                            category={category} 
                            onSelectGif={(gif) => {
                                setSelectedGif(gif);
                                setIsEditing(true);
                            }}
                        />
                    ))
                }
                <ScrollToTop />
            </div>
            <Aside onSelectCategory={onSelectCategory} />
            <MemeEditor 
                onSave={handleSaveMeme}
                initialText={selectedGif?.memeText || ''}
                isVisible={isEditing}
            />
            <Notification 
                message="¡Meme creado exitosamente!"
                isVisible={showNotification}
                onClose={() => setShowNotification(false)}
            />
        </div>
    )
};
