import React, { useEffect, useState } from "react";
import styles from "./HomePage.module.css";
import ProductList from "../../components/Product/ProductList/ProductList";
import FilterSidebar from "../../components/FilterSidebar/FilterSidebar";
import { useDispatch, useSelector } from "react-redux";
import { productSelector } from "../../redux/reducers/productsReducer";
import { addProductsToFirebase, fetchProductsFromFirebase } from "../../redux/actions/productsAction";

function HomePage() {
  const { products, isProductsLoaded } = useSelector(productSelector);
  const dispatch = useDispatch();

  const [search, setSearch] = useState("");
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [priceRange, setPriceRange] = useState(75000);

  useEffect(() => {
    if (!isProductsLoaded) {
      dispatch(addProductsToFirebase()); // Add products to Firebase on app load
    } else {
      dispatch(fetchProductsFromFirebase()); // Fetch products if they are loaded
    }
  }, [dispatch, isProductsLoaded]);

  // Rerender the products if the search or filter parameters change
  const filteredProducts = products.filter((item) => {
    const matchesCategory =
      selectedCategories.length === 0 || selectedCategories.includes(item.category);
    const matchesPrice = item.price <= priceRange;
    return matchesCategory && matchesPrice;
  });

  const filteredData = filteredProducts.filter((product) =>
    product.title.toLowerCase().includes(search.toLowerCase())
  );

  const handleCategoryChange = (category) => {
    setSelectedCategories((prev) =>
      prev.includes(category) ? prev.filter((c) => c !== category) : [...prev, category]
    );
  };

  return (
    <div className={styles.homePageContainer}>
      <FilterSidebar
        setPriceRange={setPriceRange}
        setSelectedCategories={setSelectedCategories}
        selectedCategories={selectedCategories}
        priceRange={priceRange}
        handleCategoryChange={handleCategoryChange}
      />
      <form className={styles.form}>
        <input
          type="search"
          placeholder="Search By Name"
          className={styles.searchInput}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </form>

      {filteredData.length ? (
        <ProductList products={filteredData} onCart ={false} />
      ) : (
        <p>No products found</p>
      )}
    </div>
  );
}

export default HomePage;
