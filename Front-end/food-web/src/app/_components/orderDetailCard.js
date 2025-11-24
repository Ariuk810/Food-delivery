"use client";
import { useEffect, useState } from "react";
export const OrderDetailCard = (props) => {
  const {
    foodname,
    foodprice,
    foodingred,
    foodImage,
    onDelete,
    cartIndex,
    count,
    onCountChange,
  } = props;
  const [itemCount, setItemCount] = useState(count);

  const changeCount = (newCount) => {
    setItemCount(newCount);
    onCountChange(cartIndex, newCount); // ← Home руу шинэ count дамжуулна
  };

  return (
    <div className="flex justify-between items-start gap-5 w-full p-2 mt-5 border-b pb-5">
      <img
        src={foodImage}
        className="w-[124px] h-[120px] object-cover rounded-lg"
      />

      <div className="flex flex-col flex-1">
        <h2 className="text-[#E65C4F] text-lg font-semibold">{foodname}</h2>

        <p className="text-gray-600 text-sm">{foodingred}</p>

        <div className="flex items-center gap-4 mt-6">
          <button
            className="w-10 h-10 text-2xl"
            onClick={() => itemCount > 1 && changeCount(itemCount - 1)}
          >
            -
          </button>

          <span className="text-2xl">{itemCount}</span>

          <button
            className="w-10 h-10 text-2xl"
            onClick={() => changeCount(itemCount + 1)}
          >
            +
          </button>
        </div>
      </div>

      <div className="flex flex-col items-end justify-between h-full">
        <button
          className="w-9 h-9 border border-red-600 rounded-full text-red-600 text-xl leading-none cursor-pointer"
          onClick={() => onDelete(cartIndex)}
        >
          ✕
        </button>

        <p className="font-semibold text-lg mt-20">{itemCount * foodprice}</p>
      </div>
    </div>
  );
};
