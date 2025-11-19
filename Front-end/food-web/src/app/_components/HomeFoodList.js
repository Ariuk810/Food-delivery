"use client";
import { useEffect, useState } from "react";
import { HomefoodCard } from "./HomeFoodCard";

const options = {
  method: "GET",
  headers: {
    accept: "application/json",
  },
};

export const HomeFoodList = (props) => {
  const { categoryName, categoryId } = props;

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
    <div className="bg-gray-600 w-screen h-full ">
      <h3 className="font-bold text-3xl text-white flex pl-35 pt-15">
        {categoryName}
      </h3>
      <div className="grid grid-cols-3">
        {categoryIdData?.map((items, index) => (
          <HomefoodCard
            key={index}
            foodName={items.foodName}
            foodPrice={items.price}
            foodIngred={items.ingredients}
            foodImage={items.image}
          />
        ))}
      </div>
    </div>
  );
};
