import { defaultCategories } from '../helpers/defaultCategories';

export const Aside = ({ onSelectCategory }) => {
    return (
        <aside className="sidebar">
            <h3>Categorías Populares</h3>
            <div className="category-list">
                {defaultCategories.map(category => (
                    <button
                        key={category}
                        onClick={() => onSelectCategory(category)}
                        className="category-button"
                    >
                        {category}
                    </button>
                ))}
            </div>
        </aside>
    );
};