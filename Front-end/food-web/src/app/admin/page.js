"use client";
import { AdminCard } from "../_components/AdminCard";
import { DateIcon } from "../icons/Date";
import { DownIcon } from "../icons/DownIcon";
import { MenuIcon } from "../icons/Menu";
import { NomNom } from "../icons/NomNom";
import { OrderIcon } from "../icons/Order";
import { UpDown } from "../icons/UpDown";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Home() {
  const [orders, setOrders] = useState([]);
  const [selectedOrders, setSelectedOrders] = useState([]);
  const [showChangeState, setShowChangeState] = useState(false);

  const getOrders = async () => {
    try {
      const res = await fetch("http://localhost:1000/order", {
        method: "GET",
        headers: {
          accept: "application/json",
        },
      });
      const jsonData = await res.json();
      setOrders(jsonData);
    } catch (err) {
      console.error("Order load error:", err);
    }
  };

  useEffect(() => {
    getOrders();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return "";
    const date = new Date(dateString);
    return date
      .toLocaleDateString("en-US", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
      })
      .replace(/\//g, "/");
  };

  const formatFoodNames = (foodOrderItems) => {
    if (!foodOrderItems || foodOrderItems.length === 0) return "No items";

    const foodNames = foodOrderItems
      .map((item) => {
        if (item.food?.foodName) {
          return `${item.food.foodName} (×${item.quantity})`;
        }
        return null;
      })
      .filter(Boolean);

    if (foodNames.length === 0) return "No items";
    if (foodNames.length <= 2) {
      return foodNames.join(", ");
    }
    return `${foodNames.slice(0, 2).join(", ")} +${foodNames.length - 2} more`;
  };

  const handleSelectOrder = (orderId) => {
    setSelectedOrders((prev) =>
      prev.includes(orderId)
        ? prev.filter((id) => id !== orderId)
        : [...prev, orderId]
    );
  };

  const handleSelectAll = () => {
    if (selectedOrders.length === orders.length) {
      setSelectedOrders([]);
    } else {
      setSelectedOrders(orders.map((order) => order._id));
    }
  };

  const handleChangeState = async (newStatus) => {
    if (selectedOrders.length === 0) {
      alert("Please select at least one order");
      return;
    }

    try {
      for (const orderId of selectedOrders) {
        await fetch("http://localhost:1000/order", {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            id: orderId,
            status: newStatus,
          }),
        });
      }
      setSelectedOrders([]);
      setShowChangeState(false);
      getOrders(); // Refresh orders
    } catch (err) {
      console.error("Error updating orders:", err);
      alert("Failed to update orders");
    }
  };

  const handleSingleOrderStateChange = async (orderId, newStatus) => {
    try {
      await fetch("http://localhost:1000/order", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          id: orderId,
          status: newStatus,
        }),
      });
      getOrders(); // Refresh orders
    } catch (err) {
      console.error("Error updating order:", err);
      alert("Failed to update order");
    }
  };

  return (
    <div className="bg-gray-100 flex gap-[5%]">
      <div className="w-[250px] h-screen bg-white">
        <div className="flex items-center gap-3 pt-5 justify-center">
          <NomNom />
          <div>
            <p className="font-bold text-2xl">NomNom</p>
            <p className="text-[#71717A]">Swift delivery</p>
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <Link href={`admin/food`}>
            <button className="flex justify-center gap-3 cursor-pointer">
              <MenuIcon />
              <p>Food Menu</p>
            </button>
          </Link>
        </div>
        <div className="flex justify-center pt-10">
          <button
            className={`w-[165px] h-10 rounded-full flex justify-center items-center gap-5 cursor-pointer ${
              true ? "bg-black text-white" : "bg-white text-black"
            }`}
          >
            <OrderIcon />
            <p className="text-white">Orders</p>
          </button>
        </div>
      </div>
      <div className="bg-white w-[70%] h-250 mt-[3%] rounded-lg border border-gray-200 overflow-y-scroll">
        <div className="flex justify-between">
          <div className="pt-2.5 pl-4">
            <p className="font-bold text-2xl">Order</p>
            <p className="text-gray-500">{orders.length} items</p>
          </div>
          <div className="flex items-center gap-3.5 pr-3.5 relative">
            <div className="w-[300px] h-9 border border-gray-300 rounded-full flex justify-center gap-3 items-center">
              <DateIcon />
              <p>13 June 2023 - 14 July 2023</p>
            </div>
            <div className="relative">
              <button
                className="bg-gray-300 w-[179px] h-9 rounded-full text-white relative"
                onClick={() => setShowChangeState(!showChangeState)}
              >
                Change delivery state
                {selectedOrders.length > 0 && (
                  <span className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                    {selectedOrders.length}
                  </span>
                )}
              </button>
              {showChangeState && (
                <div className="absolute right-0 mt-2 bg-white border border-gray-200 rounded-lg shadow-lg z-10 w-48">
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleChangeState("PENDING")}
                  >
                    Pending
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleChangeState("DELIVERED")}
                  >
                    Delivered
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 hover:bg-gray-100"
                    onClick={() => handleChangeState("CANCELED")}
                  >
                    Cancelled
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
        <div className="border border-gray-100 w-full h-14 flex items-center ">
          <button
            className="w-5 h-5 border border-black rounded-[5px] ml-3 cursor-pointer"
            onClick={handleSelectAll}
          >
            {selectedOrders.length === orders.length && orders.length > 0 && (
              <span className="text-black">✓</span>
            )}
          </button>
          <p className="w-14 ml-10">№</p>
          <p className="text-gray-500 w-14 ml-3">Customer</p>
          <p className="text-gray-500  w-[213px] ml-60 ">Food</p>
          <div></div>
          <p className="text-gray-500 w-40 ml-10">Date</p>
          <div>
            <UpDown />
          </div>
          <p className="text-gray-500 w-40 ml-10">Total</p>
          <p className="text-gray-500 w-[213px] ml-10">Delivery Address</p>
          <p className="text-gray-500 w-40 ml-10">Delivery State</p>
          <div>
            <UpDown />
          </div>
        </div>
        {orders.length === 0 ? (
          <div className="flex justify-center items-center h-64">
            <p className="text-gray-400">No orders found</p>
          </div>
        ) : (
          orders.map((order, index) => (
            <AdminCard
              key={order._id}
              number={index + 1}
              customer={order.user?.email || order.user?.name || "Unknown"}
              food={formatFoodNames(order.foodOrderItems)}
              date={formatDate(order.createdAt)}
              total={`${order.totalPrice?.toLocaleString()}₮`}
              delivery={order.address || "No address"}
              state={order.status || "PENDING"}
              orderId={order._id}
              isSelected={selectedOrders.includes(order._id)}
              onSelect={() => handleSelectOrder(order._id)}
              onStateChange={(newStatus) => {
                handleSingleOrderStateChange(order._id, newStatus);
              }}
            />
          ))
        )}
      </div>
    </div>
  );
}
