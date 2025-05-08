import { db } from '../../config/firebase';
import { setCartItems, setIsProductsLoaded } from '../reducers/cartReducer';
import { doc, getDoc, setDoc,addDoc,collection , query, where, getDocs} from 'firebase/firestore';
import { toast } from 'react-toastify';


export const addProductsToCart = (product, userId) => async (dispatch) => {
  try {
    const userCartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(userCartRef);
    let updatedCart = [];

    if (cartDoc.exists()) {
      const existingCart = cartDoc.data().items || [];
      const existingProductIndex = existingCart.findIndex(item => item.id === product.id);

      if (existingProductIndex !== -1) {
        existingCart[existingProductIndex].quantity += 1;
        updatedCart = existingCart;
      } else {
        updatedCart = [...existingCart, { ...product, quantity: 1 }];
      }
    } else {
      updatedCart = [{ ...product, quantity: 1 }];
    }

    await setDoc(userCartRef, { items: updatedCart });
    dispatch(setCartItems(updatedCart));
    toast.success("Product added to cart!");
  } catch (error) {
    console.error("Error adding to cart: ", error);
    toast.error("Failed to add product to cart");
  }
};

  

export const removeProductFromCart = (productId, userId) => async (dispatch) => {
  try {
    const userCartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(userCartRef);

    if (!cartDoc.exists()) {
      toast.error("Cart not found");
      return;
    }

    const existingCart = cartDoc.data().items || [];
    const updatedCart = existingCart.filter(item => item.id !== productId);

    await setDoc(userCartRef, { items: updatedCart });
    dispatch(setCartItems(updatedCart));
    toast.success("Product removed from cart!");
    
    return updatedCart; 
  } catch (error) {
    console.error("Error removing from cart: ", error);
    toast.error("Failed to remove product from cart");
  }
};

export const clearCart = (userId) => async (dispatch) => {
  try {
    const userCartRef = doc(db, "carts", userId);
    
    // Set cart to empty array
    await setDoc(userCartRef, { items: [] });
    
    // Update Redux store
    dispatch(setCartItems([]));
    
    toast.success("All products removed from cart!");
    return true;
  } catch (error) {
    console.error("Error clearing cart: ", error);
    toast.error("Failed to clear cart");
    return false;
  }
};


export const fetchCartItems = (userId) => async (dispatch) => {
  try {
    const userCartRef = doc(db, 'carts', userId);
    const cartDoc = await getDoc(userCartRef);

    if (cartDoc.exists()) {
      const items = cartDoc.data().items || [];
      dispatch(setCartItems(items));
      return items; 
    } else {
      dispatch(setCartItems([]));
      return []; 
    }
  } catch (error) {
    console.error("Error fetching cart items: ", error);
    toast.error("Failed to fetch cart items");
    return [];
  }
};



export const updateProductQuantityInCart = (productId, newQty, userId) => async (dispatch) => {
  try {
    const userCartRef = doc(db, "carts", userId);
    const cartDoc = await getDoc(userCartRef);

    if (!cartDoc.exists()) return;

    const existingCart = cartDoc.data().items || [];

    const updatedCart = existingCart.map((item) =>
      item.id === productId ? { ...item, quantity: newQty } : item
    );

    await setDoc(userCartRef, { items: updatedCart });
    dispatch(setCartItems(updatedCart));
  } catch (err) {
    console.error("Failed to update quantity:", err);
  }
};


export const purchaseCartItems = (cartItems, userId) => {
  return async (dispatch) => {
    try {
      const ordersCollectionRef = collection(db, "orders");

      await addDoc(ordersCollectionRef, {
        userId,
        items: cartItems,
        orderedAt: new Date().toISOString(),
      });

      await dispatch(clearCart(userId));
      return true;
    } catch (error) {
      console.error("Purchase failed:", error);
      throw error;
    }
  };
};


export const fetchUserOrders = (userId) => async () => {
  try {
    const ordersRef = collection(db, "orders");
    const q = query(ordersRef, where("userId", "==", userId));
    const snapshot = await getDocs(q);

    const orders = snapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    }));

    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    toast.error("Failed to load orders");
    return [];
  }
};
