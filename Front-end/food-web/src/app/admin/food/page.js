"use client";
import { BlackOrderIcon } from "@/app/icons/BlackOrder";
import { EditIcon } from "@/app/icons/Edit";
import { useEffect, useState } from "react";
import { NomNom } from "@/app/icons/NomNom";
import { WhiteMenuIcon } from "@/app/icons/WhiteMenu";
import Link from "next/link";

import { CategoryCard } from "@/app/_components/CategoryCard";
import { AddCategory } from "@/app/_components/addCategory";
import { BigFoodCard } from "@/app/_components/BigFoodCard";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export default function Home() {
  const [categoryData, setCategoryData] = useState([]);

  const apiLink = `https://food-delivery-1-pwgq.onrender.com/category`;

  const getData = async () => {
    const data = await fetch(apiLink, options);
    const jsonData = await data.json();

    setCategoryData(jsonData);
  };

  useEffect(() => {
    getData();
  }, []);
  return (
    <div className="bg-gray-100 flex gap-[1%]">
      <div className="w-[250px] h-screen bg-white ">
        <div className="flex items-center gap-3 pt-5 justify-center">
          <NomNom />
          <div>
            <p className="font-bold text-2xl">NomNom</p>
            <p className="text-[#71717A]">Swift delivery</p>
          </div>
        </div>
        <div className="flex justify-center pt-10">
          <button
            className={`w-[165px] h-10 rounded-full flex justify-center items-center gap-5 cursor-pointer ${
              true ? "bg-black text-white " : "bg-white text-black"
            }`}
          >
            <WhiteMenuIcon />
            <p>Food Menu</p>
          </button>
        </div>
        <Link href={`/admin`}>
          <div className="flex justify-center pt-10">
            <button
              className={`w-[165px] h-10 rounded-full flex justify-center items-center gap-5 cursor-pointer ${
                true ? "bg-white text-black " : "bg-black text-white"
              }`}
            >
              <BlackOrderIcon />
              <p>Orders</p>
            </button>
          </div>
        </Link>
      </div>
      <div className="w-full">
        <div className="bg-white h-auto rounded-lg mt-[5%]">
          <p className="font-bold text-2xl pt-3 pl-3">Dishes category</p>
          <div className="flex ">
            <div className="w-[145px] mt-3 ml-3 h-9 border border-red-500 rounded-full flex justify-center items-center font-medium">
              <button>All Dishes</button>
            </div>
            <div className="flex flex-wrap">
              {categoryData?.map((category, index) => {
                return (
                  <CategoryCard
                    key={index}
                    Torol={category.categoryName}
                  ></CategoryCard>
                );
              })}
            </div>
            <AddCategory getData={getData} />
          </div>
        </div>
        <div>
          {categoryData?.map((category, index) => (
            <BigFoodCard
              key={index}
              categoryName={category.categoryName}
              categoryId={category._id}
              categories={categoryData}
            />
          ))}
        </div>
      </div>
    </div>
  );
}
