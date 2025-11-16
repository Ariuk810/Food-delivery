"use client";
import { AdminCard } from "../_components/AdminCard";
import { DateIcon } from "../icons/Date";
import { DownIcon } from "../icons/DownIcon";
import { MenuIcon } from "../icons/Menu";
import { NomNom } from "../icons/NomNom";
import { OrderIcon } from "../icons/Order";
import { UpDown } from "../icons/UpDown";
import Link from "next/link";

export default function Home() {
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
            <p className="text-gray-500">32 items</p>
          </div>
          <div className="flex items-center gap-3.5 pr-3.5">
            <div className="w-[300px] h-9 border border-gray-300 rounded-full flex justify-center gap-3 items-center">
              <DateIcon />
              <p>13 June 2023 - 14 July 2023</p>
            </div>
            <button className="bg-gray-300 w-[179px] h-9 rounded-full text-white">
              Change delivery state
            </button>
          </div>
        </div>
        <div className="border border-gray-100 w-full h-14 flex items-center ">
          <button className="w-5 h-5 border border-black rounded-[5px] ml-3 "></button>
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
        <AdminCard
          number={1}
          customer={"Test@gmail.com"}
          food={"2 foods"}
          date={"2024/12/20"}
          total={"$26.97"}
          delivery={"2024/12/СБД, 12-р хороо, СБД нэгдсэн эмнэлэг "}
          state={""}
        />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
        <AdminCard />
      </div>
    </div>
  );
}
