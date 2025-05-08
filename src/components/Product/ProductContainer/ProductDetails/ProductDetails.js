import React, { useState } from "react";
import styles from "./ProductDetails.module.css";
import MinusIcon from "../../../UI/Icons/MinusIcon";
import PlusIcon from "../../../UI/Icons/PlusIcon";
import { useDispatch, useSelector } from "react-redux";
import {
  addProductsToCart,
  removeProductFromCart,
} from "../../../../redux/actions/cartActions";
import { authSelector } from "../../../../redux/reducers/authReducer";
import { useNavigate } from "react-router-dom";

const ProductDetails = ({
  onRemove,
  product,
  title,
  price,
  productId,
  quantity,
  onCart,
  onIncrease,
  onDecrease
}) => {
  const [productAddingToCart, setProductAddingToCart] = useState(false);
  const [productRemovingFromCart, setProductRemovingCart] = useState(false);

  const { user,isAuthenticated } = useSelector(authSelector);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const uid = user?.uid;

  const handleAddProductToCart = async () => {

    if(isAuthenticated){

      try {
        setProductAddingToCart(true);
        await dispatch(addProductsToCart(product, uid));
      } finally {
        setProductAddingToCart(false);
      }

    }else{
      navigate("/signin")
    }
    
  };

  const handleRemoveProductFromCart = async () => {
    try {
      setProductRemovingCart(true);
      if (onRemove) {
        await onRemove(productId);
      } else {
        await dispatch(removeProductFromCart(productId, uid));
      }
    } finally {
      setProductRemovingCart(false);
    }
  };

  return (
    <div className={styles.productDetails}>
      <div className={styles.productName}>
        <p>{`${title.slice(0, 35)}...`}</p>
      </div>

      <div className={styles.productOptions}>
        <p>₹ {price}</p>
        {onCart && (
          <div className={styles.quantityContainer}>
            <MinusIcon handleRemove={() => onDecrease(productId)} />
            {quantity}
            <PlusIcon handleAdd={() => onIncrease(productId)} />
          </div>
        )}
      </div>

      {!onCart ? (
        <button
          className={styles.addBtn}
          title="Add to Cart"
          disabled={productAddingToCart}
          onClick={handleAddProductToCart}
        >
          {productAddingToCart ? "Adding..." : "Add To Cart"}
        </button>
      ) : (
        <button
          className={styles.removeBtn}
          title="Remove from Cart"
          disabled={productRemovingFromCart}
          onClick={handleRemoveProductFromCart}
        >
          {productRemovingFromCart ? "Removing..." : "Remove From Cart"}
        </button>
      )}
    </div>
  );
};

export default ProductDetails;
