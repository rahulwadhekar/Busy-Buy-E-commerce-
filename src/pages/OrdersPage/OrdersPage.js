import React, { useState, useEffect } from "react";
import Loader from "../../components/UI/Loader/Loader";
import styles from "./OrdersPage.module.css";
import OrderTable from "../../components/OrderTable/OrderTable";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserOrders } from "../../redux/actions/cartActions";
import { authSelector } from "../../redux/reducers/authReducer";

const OrdersPage = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  const { user } = useSelector(authSelector);
  const userId = user?.uid;

  useEffect(() => {
    const loadOrders = async () => {
      try {
        setLoading(true);
        const fOrders = await dispatch(fetchUserOrders(userId));
        setOrders(fOrders);
      } catch (error) {
        console.error("Failed to load orders:", error);
      } finally {
        setLoading(false);
      }
    };

    if (userId) {
      loadOrders();
    }
  }, [userId, dispatch]);

  if (loading) {
    return <Loader />;
  }

  if (!orders.length) {
    return <h1 style={{ textAlign: "center" }}>No Orders Found!</h1>;
  }

  return (
    <div className={styles.ordersContainer}>
      <h1>Your Orders</h1>
      {orders.map((order, idx) => (
        <OrderTable order={order} key={idx} />
      ))}
    </div>
  );
};

export default OrdersPage;
