import React, { useEffect, useState } from "react";
import Loader from "../../components/UI/Loader/Loader";
import ProductList from "../../components/Product/ProductList/ProductList";
import styles from "./CartPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { cartSelector } from "../../redux/reducers/cartReducer";
import { authSelector } from "../../redux/reducers/authReducer";
import {
  fetchCartItems,
  removeProductFromCart,
  purchaseCartItems,
  clearCart
} from "../../redux/actions/cartActions";
import { useNavigate } from "react-router-dom";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../../config/firebase";
import { toast } from "react-toastify";

const CartPage = () => {
  const { user } = useSelector(authSelector);
  const userId = user?.uid;

  const [cartItems, setCartItemsState] = useState([]);
  const [loading, setLoading] = useState(true);
  const [purchasing, setPurchasing] = useState(false);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const purchaseProductsHandler = async () => {
    if (!userId) {
      toast.error("You must be logged in to place an order.");
      return;
    }
  
    try {
      setPurchasing(true);
      const success = await dispatch(purchaseCartItems(cartItems, userId));
  
      if (success) {
        setCartItemsState([]);
        dispatch(clearCart(userId))
        toast.success("Order placed successfully!");
        navigate("/myorders");
      }
    } catch (error) {
      toast.error("Purchase failed!");
    } finally {
      setPurchasing(false);
    }
  };
  

  const handleRemoveProduct = async (productId) => {
    const updatedCart = await dispatch(removeProductFromCart(productId, userId));
    if (updatedCart) {
      setCartItemsState(updatedCart);
    }
  };

  const handleIncreaseQuantity = (productId) => {
    setCartItemsState((prevItems) =>
      prevItems.map((item) =>
        item.id === productId ? { ...item, quantity: item.quantity + 1 } : item
      )
    );
  };

  const handleDecreaseQuantity = (productId) => {
    setCartItemsState((prevItems) =>
      prevItems.map((item) =>
        item.id === productId && item.quantity > 1
          ? { ...item, quantity: item.quantity - 1 }
          : item
      )
    );
  };

  useEffect(() => {
    const getCartItems = async () => {
      if (!userId) {
        setLoading(false);
        return;
      }

      try {
        const items = await dispatch(fetchCartItems(userId));
        setCartItemsState(items);
      } catch (error) {
        console.error("Error fetching cart items:", error);
        toast.error("Failed to load cart items.");
      } finally {
        setLoading(false);
      }
    };

    getCartItems();
  }, [userId, dispatch]);

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  if (loading) return <Loader />;

  return (
    <div className={styles.cartPageContainer}>
      {!!cartItems?.length && (
        <aside className={styles.totalPrice}>
          <p>Total Price: ₹{getTotalPrice()}/-</p>
          <button
            className={styles.purchaseBtn}
            onClick={purchaseProductsHandler}
            disabled={purchasing}
          >
            {purchasing ? "Purchasing..." : "Purchase"}
          </button>
        </aside>
      )}

      {!!cartItems?.length ? (
        <ProductList
          onCart={true}
          products={cartItems}
          onRemove={handleRemoveProduct}
          onIncrease={handleIncreaseQuantity}
          onDecrease={handleDecreaseQuantity}
        />
      ) : (
        <h1>Cart is Empty!</h1>
      )}
    </div>
  );
};

export default CartPage;
