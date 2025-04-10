import { defaultCategories } from '../helpers/defaultCategories';

export const Aside = ({ onSelectCategory }) => {
    const handleCategoryClick = (category) => {
        window.scrollTo({ top: 0, behavior: 'smooth' });
        onSelectCategory(category);
    };

    return (
        <aside className="sidebar">
            <h3>Categorías Populares</h3>
            <div className="category-list">
                {defaultCategories.map((category) => (
                    <button
                        key={category}
                        className="category-button"
                        onClick={() => handleCategoryClick(category)}
                    >
                        {category}
                    </button>
                ))}
            </div>
        </aside>
    );
};