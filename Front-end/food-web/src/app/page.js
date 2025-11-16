"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { NomNom } from "./icons/NomNom";
import { LocationIcon } from "./icons/Location";
import { TbShoppingCartDollar } from "react-icons/tb";
import { RiAdminFill } from "react-icons/ri";
import { HomeFoodCard } from "./_components/HomeFoodCard";

export default function Home() {
  const [admin, SetAdmin] = useState(false);

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
          <button className="w-9 h-9 rounded-full flex justify-center items-center bg-white">
            <TbShoppingCartDollar />
          </button>
          <button
            className="w-9 h-9 rounded-full flex justify-center items-center bg-red-500"
            onClick={() => SetAdmin(true)}
          >
            {admin && (
              <div className="w-30 h-25 bg-white ">
                <p className="font-bold text-2xl">Test@gmail.com</p>
              </div>
            )}
            <RiAdminFill />
          </button>
        </div>
      </div>
      <img src="/BG.png" />
      <div className="bg-gray-600 w-screen h-screen ">
        <h3 className="font-bold text-3xl text-white flex pl-35 pt-15">
          Appetizer
        </h3>
        <div className="flex flex-wrap gap-5 justify-center pt-15">
          <HomeFoodCard />
          <HomeFoodCard />
          <HomeFoodCard />
          <HomeFoodCard />
          <HomeFoodCard />
        </div>
      </div>
    </>
  );
}
