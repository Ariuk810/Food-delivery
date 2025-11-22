"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NomNom } from "./icons/NomNom";
import { LocationIcon } from "./icons/Location";
import { TbShoppingCartDollar } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { HomeFoodList } from "./_components/HomeFoodList";

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
            <div className="fixed inset-0 z-10 flex justify-end">
              <div className="w-[525px] h-full bg-gray-500 p-9 ">
                <div className="flex justify-between">
                  <div className="flex items-center gap-5">
                    <TbShoppingCartDollar className="w-9 h-9" />
                    <h1 className="font-bold text-3xl text-white">
                      Order detail
                    </h1>
                  </div>
                  <button
                    className="w-9 h-9 border border-white flex justify-center items-center text-white rounded-full"
                    onClick={() => setOrderDetail(false)}
                  >
                    ✕
                  </button>
                </div>
                <div className="w-[471px] h-11 bg-white flex items-center rounded-lg mt-5">
                  <button className="w-[50%] bg-red-600 text-white rounded-full h-full">
                    Cart
                  </button>
                  <button className="bg-white text-black w-[50%]">Order</button>
                </div>
                {/* <div className="w-471px] h-[532px] bg-white rounded-lg mt-5"></div> */}
              </div>
            </div>
          )}
          <button
            className="w-9 h-9 rounded-full flex justify-center items-center bg-red-500"
            onClick={() => SetAdmin(true)}
          >
            {admin && (
              <div className="w-[188px] h-26 rounded-lg bg-white mr-20">
                <p className="font-bold text-xl">Test@gmail.com</p>
                <button className="w-20 h-9 bg-gray-300 text-black rounded-full mt-5 font-bold">
                  Sign out
                </button>
              </div>
            )}
            <RiAdminFill />
          </button>
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
