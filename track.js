import { useState, useEffect } from "react";
import { useRouter } from "next/router";

export default function Track() {
  const [order, setOrder] = useState(null);
  const router = useRouter();
  const { id } = router.query;

  useEffect(() => {
    if (id) {
      async function fetchOrder() {
        const response = await fetch(`/api/orders/${id}`);
        const data = await response.json();
        setOrder(data);
      }
      fetchOrder();
    }
  }, [id]);

  if (!order) return <div>Loading...</div>;

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Order Status</h1>
      <p>Order ID: {order.id}</p>
      <p>Status: {order.status}</p>
      <p>Item: {order.item_name}</p>
      <p>Quantity: {order.quantity}</p>
      <p>Delivery Address: {order.address}</p>
    </div>
  );
}
