import { useState, useEffect } from "react";

export default function Admin() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    async function fetchOrders() {
      const response = await fetch("/api/admin/orders");
      const data = await response.json();
      setOrders(data);
    }

    fetchOrders();
  }, []);

  const updateStatus = async (id, status) => {
    await fetch(`/api/admin/orders/${id}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ status }),
    });
    // Reload orders after update
    const response = await fetch("/api/admin/orders");
    const data = await response.json();
    setOrders(data);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Admin Dashboard</h1>
      <table className="w-full border-collapse">
        <thead>
          <tr>
            <th className="border p-2">Order ID</th>
            <th className="border p-2">Item Name</th>
            <th className="border p-2">Quantity</th>
            <th className="border p-2">Status</th>
            <th className="border p-2">Action</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td className="border p-2">{order.id}</td>
              <td className="border p-2">{order.item_name}</td>
              <td className="border p-2">{order.quantity}</td>
              <td className="border p-2">{order.status}</td>
              <td className="border p-2">
                <button
                  onClick={() => updateStatus(order.id, "In Progress")}
                  className="bg-blue-500 text-white px-2 py-1 rounded"
                >
                  Mark as In Progress
                </button>
                <button
                  onClick={() => updateStatus(order.id, "Delivered")}
                  className="bg-green-500 text-white px-2 py-1 rounded"
                >
                  Mark as Delivered
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
