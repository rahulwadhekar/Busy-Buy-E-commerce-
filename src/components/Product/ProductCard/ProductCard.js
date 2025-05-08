import React from "react";
import ProductContainer from "../ProductContainer/ProductContainer";
import ProductDetails from "../ProductContainer/ProductDetails/ProductDetails";
import ProductImage from "../ProductContainer/ProductImage/ProductImage";

// Product Card component
const ProductCard = ({
  onOwnPage,
  onCart,
  product,
  onRemove,
  onIncrease,
  onDecrease
  
  
}) => {
  return (
    <ProductContainer>
      <ProductImage image={product.image} />
      <ProductDetails
        product={product}
        title={product.title}
        price={product.price}
        onOwnPage={onOwnPage}
        productId={product.id}
        onCart={onCart}
        quantity={product.quantity}
        onRemove ={onRemove}
        onIncrease={onIncrease}
  onDecrease={onDecrease}
      />
    </ProductContainer>
  );
};

export default ProductCard;
