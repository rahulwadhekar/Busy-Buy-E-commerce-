import React from "react";
import ProductCard from "../ProductCard/ProductCard";
import ProductGrid from "../ProductGrid/ProductGrid";

const ProductList = ({ onRemove, products, style, onCart ,onIncrease,onDecrease}) => {
  // Component to display the product list
  return (
    <ProductGrid style={{ ...style }}>
      {products.map((product, idx) => {
        return <ProductCard onIncrease={onIncrease}
        onDecrease={onDecrease} onRemove={onRemove} product={product} key={idx} onCart={onCart} />;
      })}
    </ProductGrid>
  );
};

export default ProductList;
