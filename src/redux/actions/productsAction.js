
import { addDataToCollection } from '../../utils/utils';
import { db } from '../../config/firebase';
import { collection, getDocs } from 'firebase/firestore';
import { setProducts,setIsProductsLoaded } from '../reducers/productsReducer';

export const addProductsToFirebase = () => async (dispatch) => {
    try {
      await addDataToCollection();
      dispatch(setIsProductsLoaded(true)); 

      console.log(addDataToCollection())
    } catch (error) {
      console.error('Error adding products to Firebase:', error);
    }
  };

  
  export const fetchProductsFromFirebase = () => async (dispatch) => {
    try {
      const productsRef = collection(db, 'products');
      const snapshot = await getDocs(productsRef);
      const products = snapshot.docs.map(doc => doc.data());
      dispatch(setProducts(products)); 
    } catch (error) {
      console.error('Error fetching products from Firebase:', error);
    }
  };