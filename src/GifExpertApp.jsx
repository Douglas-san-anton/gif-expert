import { useState } from "react";
import { AddCategory, GifGrid, MemeEditor, Aside } from "./components";

export const GifExpertApp = () => {
    const [categories, setCategories] = useState(['Dragon Ball']);
    const [selectedGif, setSelectedGif] = useState(null);
    const [isEditing, setIsEditing] = useState(false);

    const onAddCategory = (newCategory) => {
        if (categories.includes(newCategory)) return;
        setCategories([newCategory, ...categories]);
    }

    const onSelectCategory = (category) => {
        if (!categories.includes(category)) {
            setCategories([category, ...categories]);
        }
    }

    const handleSaveMeme = (text) => {
        if (selectedGif) {
            selectedGif.onSave(text);
            setSelectedGif(null);
            setIsEditing(false);
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
            </div>
            <Aside onSelectCategory={onSelectCategory} />
            <MemeEditor 
                onSave={handleSaveMeme}
                initialText={selectedGif?.text || ''}
                isVisible={isEditing}
            />
        </div>
    )
};
