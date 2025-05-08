import { createUserWithEmailAndPassword, signInWithEmailAndPassword, getAuth,signOut } from "firebase/auth";
import { auth ,db} from "../../config/firebase";
import { authActions } from "../reducers/authReducer";
import { toast } from "react-toastify";
import { doc, setDoc,getDoc } from "firebase/firestore";
import { setCartItems } from '../reducers/cartReducer';
const getSerializableUser = (user) => ({
  uid: user.uid,
  email: user.email,
  displayName: user.displayName,
  photoURL: user.photoURL,
  emailVerified: user.emailVerified,
});

export const register = (email, password) => async (dispatch) => {
  dispatch(authActions.signupStart());
  try {
    const userCredential = await createUserWithEmailAndPassword(auth, email, password);
    const user = userCredential.user;
    const simpleUser = getSerializableUser(user);

    // Add user to Firestore
    await setDoc(doc(db, "users", user.uid), {
      uid: user.uid,
      email: user.email,
      password: password, 
      signinDate: new Date().toISOString(),
    });

    dispatch(authActions.signupSuccess(simpleUser));
    toast.success("Signup successful!");
  } catch (error) {
    dispatch(authActions.signupFailure(error.message));
    toast.error(error.message);
  }
};


export const login = (email, password) => async (dispatch) => {
  dispatch(authActions.signupStart());
  try {
    const auth = getAuth();
    const userCredential = await signInWithEmailAndPassword(auth, email, password);
    const simpleUser = getSerializableUser(userCredential.user);
    dispatch(authActions.signupSuccess(simpleUser));
    toast.success("Login successful!");
  } catch (error) {
    dispatch(authActions.signupFailure(error.message));
    toast.error(error.message);
  }
};



export const loadUserCart = (userId) => async (dispatch) => {
  try {
    const cartRef = doc(db, 'carts', userId);
    const cartSnap = await getDoc(cartRef);

    if (cartSnap.exists()) {
      const cartData = cartSnap.data();
      dispatch(setCartItems(cartData.items || []));
    } else {
      dispatch(setCartItems([]));
    }
  } catch (error) {
    console.error("Failed to load cart: ", error);
  }
};
export const logout = () => async (dispatch) => {
  try {
    await signOut(auth); 
    dispatch(authActions.logout()); 
    toast.success("Logged out successfully!");
  } catch (error) {
    toast.error("Logout failed: " + error.message);
  }
};

export const isUserLoggedIn = () => {
  const auth = getAuth();
  return !!auth.currentUser;
};