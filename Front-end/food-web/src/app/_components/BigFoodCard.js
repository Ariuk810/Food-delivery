"use client";
import { FoodCard } from "@/app/_components/FoodCard";
import { Key } from "lucide-react";
import { useEffect, useState } from "react";
import { AddFood } from "./addFoods";

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

  const categoryAPI = `https://food-delivery-1-pwgq.onrender.com/food/${categoryId}`;

  const getData = async () => {
    const data = await fetch(categoryAPI, options);
    const jsonData = await data.json();

    setCategoryIdData(jsonData);
  };

  useEffect(() => {
    getData();
  }, [categoryId]);

  return (
    <div className="bg-white  h-auto rounded-lg mt-[5%] pt-4 pl-4 ">
      <div className="flex items-center ">
        <p className="font-bold text-2xl text-black">{categoryName}</p>
        <p className="font-bold text-2xl text-black">
          ({categoryIdData.length})
        </p>
      </div>
      <div className="flex gap-5 flex-wrap">
        <AddFood
          getData={getData}
          categoryId={categoryId}
          categoryName={categoryName}
        />

        {categoryIdData?.map((items, index) => (
          <FoodCard
            key={index}
            foodName={items.foodName}
            foodPrice={items.price}
            foodIngred={items.ingredients}
            foodCategory={items.category._id}
            categories={categories}
            foodId={items._id}
            getData={getData}
            foodImage={items.image}
          />
        ))}
      </div>
    </div>
  );
};
