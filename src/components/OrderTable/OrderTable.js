import React from "react";
import styles from "./OrderTable.module.css";
import { convertDate } from "../../utils/utils";

// Component to display a single order in table format
const OrderTable = ({ order }) => {
  if (!order?.items?.length) return null;

  const totalAmount = order.items.reduce(
    (acc, item) => acc + item.price * item.quantity,
    0
  );

  return (
    <div style={{ textAlign: "center", marginTop: "2rem" }}>
      <h2>Ordered On: {convertDate(order.orderedAt)}</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Title</th>
            <th>Price</th>
            <th>Quantity</th>
            <th>Total Price</th>
          </tr>
        </thead>
        <tbody>
          {order.items.map((product, idx) => (
            <tr key={idx}>
              <td>{product.title.length > 25 ? product.title.slice(0, 25) + "..." : product.title}</td>
              <td>₹ {product.price}</td>
              <td>{product.quantity}</td>
              <td>₹ {product.price * product.quantity}</td>
            </tr>
          ))}
          <tr className={styles.totalPrice}>
            <td colSpan="3" style={{ textAlign: "right", fontWeight: "bold" }}>
              Total:
            </td>
            <td style={{ fontWeight: "bold" }}>₹ {totalAmount}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};

export default OrderTable;
