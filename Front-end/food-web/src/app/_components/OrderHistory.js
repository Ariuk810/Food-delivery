"use client";

import { useEffect, useState } from "react";

export const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  const loadOrders = async () => {
    try {
      const res = await fetch("http://localhost:1000/order");
      const data = await res.json();
      setOrders(data);
    } catch (err) {
      console.log("Order load error:", err);
    }
  };

  useEffect(() => {
    loadOrders();
  }, []);

  return (
    <div>
      <p className="text-2xl text-gray-500 font-bold mb-5">Order history</p>

      {orders.length === 0 && (
        <p className="text-gray-400">You have no orders yet.</p>
      )}

      {orders.map((order) => (
        <div
          key={order._id}
          className="border-b pb-4 mb-4 rounded-lg p-3 bg-gray-50"
        >
          <div className="flex justify-between">
            <p className="font-bold text-lg">
              {order.totalPrice.toLocaleString()} ₮
            </p>
            <p
              className={`font-bold ${
                order.status === "PENDING"
                  ? "text-orange-500"
                  : order.status === "DELIVERED"
                  ? "text-green-600"
                  : "text-red-600"
              }`}
            >
              {order.status}
            </p>
          </div>

          <p className="text-gray-500 text-sm">
            {order.createdAt?.slice(0, 10)}
          </p>

          <div className="mt-2 ml-2">
            {order.foodOrderItems.map((item) => (
              <p key={item._id} className="text-gray-700 text-sm">
                • {item.food?.name} × {item.quantity}
              </p>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};
