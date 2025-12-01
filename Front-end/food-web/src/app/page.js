"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState, useContext } from "react";
import { NomNom } from "./icons/NomNom";
import { LocationIcon } from "./icons/Location";
import { TbShoppingCartDollar } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { HomeFoodList } from "./_components/HomeFoodList";
import { OrderDetailCard } from "./_components/orderDetailCard";
import { AuthContext } from "./_context/authContext";
// import { headers } from "next/headers";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export default function Home() {
  const [admin, SetAdmin] = useState(false);
  const [categoryData, setCategoryData] = useState([]);
  const [orderDetail, setOrderDetail] = useState(false);
  const [orderOpen, setOrderOpen] = useState(false);
  const [cartData, setCartData] = useState([]);
  const [orderData, setOrderData] = useState([]);
  const { token, user } = useContext(AuthContext);
  const [orderHistory, setOrderHistory] = useState([]);
  const [textArea, setTextarea] = useState("");

  const getOrderHistory = async () => {
    if (!user?._id) return;

    try {
      const res = await fetch(
        `https://food-delivery-1-pwgq.onrender.com/order/${user._id}`,
        options
      );
      const jsonData = await res.json();
      setOrderHistory(jsonData);
    } catch (err) {
      console.error(err);
    }
  };
  console.log(orderHistory, "order get bainuu");

  const orderAPI = `https://food-delivery-1-pwgq.onrender.com/order`;
  const createOrder = async () => {
    if (!textArea) {
      alert("Address bichne uu!!!!");
      return;
    }
    const postOptions = {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        accept: "application/json",
      },

      body: JSON.stringify({
        status: "PENDING",
        totalPrice: total,
        user: user._id,
        foodOrderItems: cartData,
        address: textArea,
      }),
    };

    const data = await fetch(orderAPI, postOptions);
    const jsonData = await data.json();

    setOrderData(jsonData);
    localStorage.removeItem("cart");
    setCartData([]);
    setTextarea("");
  };

  // GET LOCAL STORAGE
  useEffect(() => {
    if (orderDetail) {
      const cart = JSON.parse(localStorage.getItem("cart") || "[]");
      setCartData(cart);
    }
  }, [orderDetail]);

  const deleteFromCart = (indexToRemove) => {
    const newCart = cartData.filter((_, idx) => idx !== indexToRemove);
    setCartData(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart));
  };

  const updateCount = (index, newCount) => {
    const newCart = [...cartData];
    newCart[index].count = newCount; // count шинэчилнэ

    setCartData(newCart);
    localStorage.setItem("cart", JSON.stringify(newCart)); // localStorage-д хадгална
  };

  // === PRICE CALCULATIONS ===
  const items = cartData.reduce(
    (sum, item) => sum + item.foodPrice * item.quantity,
    0
  );

  const shipping = 5000;
  const total = items + shipping;

  const apiLink = `http://localhost:1000/category`;

  const getData = async () => {
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();

    setCategoryData(jsonData);
  };
  // console.log(categoryData, "qwerf");
  useEffect(() => {
    getData();
  }, []);
  useEffect(() => {
    getOrderHistory();
  }, [user]);

  const router = useRouter();

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem("token");
      if (!token) router.push("/login");
    }
  }, []);

  return (
    <>
      <div className="h-40 w-full bg-black flex justify-between">
        <div className="flex items-center gap-3 pl-10 ">
          <NomNom />
          <div>
            <div className="flex justify-center">
              <p className="font-bold text-2xl text-white">Nom</p>
              <p className="font-bold text-2xl text-red-500">Nom</p>
            </div>
            <p className="text-[#71717A]">Swift delivery</p>
          </div>
        </div>
        <div className="flex items-center gap-5 pr-10">
          <button className="w-[260px] h-9 bg-white rounded-full flex items-center justify-center gap-1.5">
            <LocationIcon />
            <p className="text-red-400 text-[13px]">Delivery address:</p>
            <p className="text-[13px]">Add Location</p>
          </button>
          <button
            className="w-9 h-9 rounded-full flex justify-center items-center bg-white"
            onClick={() => setOrderDetail(true)}
          >
            <TbShoppingCartDollar />
          </button>

          {orderDetail && (
            <div className="fixed inset-0 z-10 flex justify-end backdrop-blur-md">
              <div className="w-[525px] h-full bg-[#404040] p-9 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-5">
                    <TbShoppingCartDollar className="w-9 h-9" />
                    <h1 className="font-bold text-3xl text-white">
                      Order detail
                    </h1>
                  </div>
                  <button
                    className="w-9 h-9 border border-white flex justify-center items-center text-white rounded-full cursor-pointer"
                    onClick={() => setOrderDetail(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="w-[471px] h-11 bg-white flex items-center rounded-lg mt-5">
                  <button
                    className={`w-[50%] h-full rounded-full ${
                      !orderOpen ? "bg-red-600 text-white" : "text-black"
                    }`}
                    onClick={() => setOrderOpen(false)}
                  >
                    Cart
                  </button>

                  <button
                    className={`w-[50%] h-full rounded-full ${
                      orderOpen ? "bg-red-600 text-white" : "text-black"
                    }`}
                    onClick={() => setOrderOpen(true)}
                  >
                    Order
                  </button>
                </div>
                {orderOpen && (
                  <div className="w-full max-w-[480px] h-auto bg-white mt-5 rounded-2xl shadow-md mx-auto">
                    <div className="p-5">
                      <p className="text-2xl font-bold text-black">
                        Order history
                      </p>

                      {orderHistory?.map((order, index) => (
                        <div key={index} className="mt-6 border-b pb-6">
                          <div className="flex justify-between items-center">
                            <p className="text-xl font-semibold">
                              {order.totalPrice}₮ (#{order._id.slice(-5)})
                            </p>

                            <span
                              className={`px-3 py-1 border rounded-full text-sm ${
                                order.status === "PENDING"
                                  ? "border-red-400 text-red-500"
                                  : "bg-gray-100 text-gray-700"
                              }`}
                            >
                              {order.status}
                            </span>
                          </div>

                          <div className="mt-3 space-y-2">
                            {order.foodOrderItems?.map((item, idx) => (
                              <div key={idx} className="flex justify-between">
                                <p className="text-gray-600">
                                  {item.food?.foodName}
                                </p>
                                <p>x{item.quantity}</p>
                              </div>
                            ))}

                            <div className="flex items-center gap-2 text-gray-500 mt-2">
                              <span>🕒</span>
                              <p>
                                {new Date(order.createdAt).toLocaleDateString()}
                              </p>
                            </div>

                            <div className="flex items-center gap-2 text-gray-500">
                              <span>📍</span>
                              <p className="truncate">
                                {order.address || "No address"}
                              </p>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {!orderOpen && (
                  <>
                    <div className="w-[471px] h-[532px] bg-white rounded-lg mt-5 p-5 overflow-scroll">
                      <p className="text-2xl text-gray-500 font-bold">
                        My cart
                      </p>
                      <div>
                        {cartData?.map((item, index) => (
                          <OrderDetailCard
                            key={index}
                            cartIndex={index}
                            foodname={item.foodName}
                            foodprice={item.foodPrice}
                            count={item.quantity}
                            foodingred={item.foodIngred}
                            foodImage={item.foodImage}
                            onDelete={deleteFromCart}
                            onCountChange={updateCount}
                          />
                        ))}
                      </div>

                      <div>
                        <h1 className="font-bold text-2xl text-gray-500">
                          Delivery location
                        </h1>
                        <div className="relative w-full">
                          <textarea
                            id="address"
                            placeholder="  Please share your complete address "
                            className="peer w-full h-32 px-3 pt-5 pb-2 border border-gray-200 rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={textArea}
                            onChange={(e) => setTextarea(e.target.value)}
                          ></textarea>
                          <label
                            htmlFor="address"
                            className="absolute left-3 top-2 text-gray-400 text-sm transition-all duration-200
               pointer-events-none
               peer-placeholder-shown:top-5
               peer-placeholder-shown:text-gray-400
               peer-placeholder-shown:text-base
               peer-focus:top-2
               peer-focus:text-sm
               peer-focus:text-blue-500"
                          ></label>
                        </div>
                      </div>
                    </div>
                    <div className="w-[471px] h-[276px] bg-white rounded-lg mt-10 p-5">
                      <h1 className="font-bold text-2xl text-gray-500">
                        Payment info
                      </h1>
                      <div className="flex justify-between items-center mt-3 ">
                        <div className="text-gray-500 ">
                          <p>Items</p>
                          <p className="mt-3">Shipping</p>
                        </div>
                        <div className="text-black font-bold ">
                          <p>{items.toLocaleString()}₮</p>
                          <p className="mt-3">{shipping.toLocaleString()}₮</p>
                        </div>
                      </div>
                      <div className="border-b pb-5"></div>
                      <div className="flex justify-between mt-5">
                        <p className="text-gray-500">Total</p>
                        <p className="text-black font-bold">
                          {total.toLocaleString()}₮
                        </p>
                      </div>
                      <button
                        className="w-full h-11 bg-red-500 rounded-full mt-5 text-white cursor-pointer"
                        onClick={createOrder}
                      >
                        Check out
                      </button>
                    </div>
                  </>
                )}
              </div>
            </div>
          )}
          <div
            className="w-9 h-9 rounded-full flex justify-center items-center bg-red-500"
            onClick={() => SetAdmin(true)}
          >
            {admin && (
              <div className="w-[188px] h-[104px] rounded-lg bg-white mr-20 p-3">
                <p className="font-bold text-xl">Test@gmail.com</p>
                <div className="flex justify-center">
                  <button className="w-20 h-9 bg-gray-300 text-black rounded-full mt-5 font-bold flex justify-center items-center ">
                    Sign out
                  </button>
                </div>
              </div>
            )}
            <RiAdminFill />
          </div>
        </div>
      </div>
      <img src="/BG.png" />

      {categoryData?.map((items, index) => (
        <HomeFoodList
          key={index}
          categoryName={items.categoryName}
          categoryId={items._id}
        />
      ))}
    </>
  );
}
