import React from "react";
import styles from "./FilterSidebar.module.css";

const FilterSidebar = ({
  setPriceRange,
  setSelectedCategories,
  selectedCategories,
  priceRange,
  handleCategoryChange,
}) => {
  const categories = ["men's clothing", "electronics", "jewelery", "women's clothing"];

  const categoryIdMap = {
    "men's clothing": "mensFashion",
    "women's clothing": "womensFashion",
    electronics: "electronics",
    jewelery: "jewelery",
  };

  return (
    <aside className={styles.filterContainer}>
      <h2>Filter</h2>
      <form>
        <label htmlFor="price">Price: {priceRange}</label>
        <input
          type="range"
          id="price"
          name="price"
          min="1"
          max="100000"
          className={styles.priceRange}
          value={priceRange}
          onChange={(e) => setPriceRange(e.target.value)}
          step="10"
        />

        <h2>Category</h2>
        <div className={styles.categoryContainer}>
          {categories.map((category) => (
            <div className={styles.inputContainer} key={category}>
              <input
                type="checkbox"
                id={categoryIdMap[category]}
                name={category}
                checked={selectedCategories.includes(category)}
                onChange={() => handleCategoryChange(category)}
              />
              <label htmlFor={categoryIdMap[category]}>
                {category.replace(/([A-Z])/g, ' $1').toUpperCase()}
              </label>
            </div>
          ))}
        </div>
      </form>
    </aside>
  );
};

export default FilterSidebar;
