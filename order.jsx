import { useState } from "react";
import { useRouter } from "next/router";

export default function Order() {
  const [orderDetails, setOrderDetails] = useState({
    item_name: "",
    quantity: 1,
    name: "",
    contact: "",
    address: "",
  });

  const router = useRouter();

  const handleChange = (e) => {
    setOrderDetails({
      ...orderDetails,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(orderDetails),
    });
    const data = await response.json();
    router.push(`/track?id=${data.id}`);
  };

  return (
    <div className="container mx-auto p-6">
      <h1 className="text-2xl font-bold mb-4">Place an Order</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          name="item_name"
          value={orderDetails.item_name}
          onChange={handleChange}
          placeholder="Item Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="number"
          name="quantity"
          value={orderDetails.quantity}
          onChange={handleChange}
          min="1"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="name"
          value={orderDetails.name}
          onChange={handleChange}
          placeholder="Your Name"
          className="w-full p-2 border rounded"
        />
        <input
          type="text"
          name="contact"
          value={orderDetails.contact}
          onChange={handleChange}
          placeholder="Your Contact"
          className="w-full p-2 border rounded"
        />
        <textarea
          name="address"
          value={orderDetails.address}
          onChange={handleChange}
          placeholder="Delivery Address"
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Place Order
        </button>
      </form>
    </div>
  );
}
