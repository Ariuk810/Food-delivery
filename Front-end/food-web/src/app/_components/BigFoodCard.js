"use client";
import { FoodCard } from "@/app/_components/FoodCard";
import { Key } from "lucide-react";
import { useEffect, useState } from "react";
import { AddFood } from "./addFoods";
const UPLOAD_PRESET = "Food delivery";
const CLOUD_NAME = "dvxchfkte";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const BigFoodCard = (props) => {
  const { categoryName, categoryId, categories } = props;
  // const [foodInput, setFoodInput] = useState(false);
  const [categoryIdData, setCategoryIdData] = useState([]);

  const categoryAPI = `http://localhost:1000/food/${categoryId}`;

  const getData = async () => {
    const data = await fetch(categoryAPI, options);
    const jsonData = await data.json();

    setCategoryIdData(jsonData);
  };

  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="bg-white  h-auto rounded-lg mt-[5%] pt-4 pl-4 ">
      <div className="flex items-center ">
        <p className="font-bold text-2xl text-black">{categoryName}</p>
        <p className="font-bold text-2xl text-black">(6)</p>
      </div>
      <div className="flex gap-5 flex-wrap">
        <AddFood getData={getData} categoryId={categoryId} />

        {categoryIdData?.map((category, index) => (
          <FoodCard
            key={index}
            foodName={category.foodName}
            foodPrice={category.price}
            foodIngred={category.ingredients}
            foodCategory={category.category._id}
            categories={categories}
            foodId={category._id}
            getData={getData}
          />
        ))}
      </div>
    </div>
  );
};
