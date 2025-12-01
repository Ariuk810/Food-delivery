"use client";

import { DownIcon } from "../icons/DownIcon";
import { UpDown } from "../icons/UpDown";
import { useState } from "react";

export const AdminCard = (props) => {
  const {
    customer,
    food,
    date,
    total,
    delivery,
    state,
    number,
    orderId,
    isSelected,
    onSelect,
    onStateChange,
  } = props;
  const [showDropdown, setShowDropdown] = useState(false);

  const handleStateClick = (e) => {
    e.stopPropagation();
    setShowDropdown(!showDropdown);
  };

  const handleStateSelect = (newState) => {
    setShowDropdown(false);
    if (onStateChange) {
      onStateChange(newState);
    }
  };

  const getStateColor = (status) => {
    switch (status) {
      case "PENDING":
        return "border-red-600 text-red-600";
      case "DELIVERED":
        return "border-green-600 text-green-600";
      case "CANCELED":
        return "border-gray-600 text-gray-600";
      default:
        return "border-red-600 text-red-600";
    }
  };

  return (
    <div className="border border-gray-100 w-full h-auto min-h-10 flex items-center py-2 hover:bg-gray-50">
      <button
        className="w-5 h-5 border border-black rounded-[5px] ml-3 cursor-pointer flex items-center justify-center"
        onClick={onSelect}
      >
        {isSelected && <span className="text-black text-xs">✓</span>}
      </button>
      <p className="w-14 ml-10">{number}</p>
      <p className="text-gray-500 w-32 ml-3 truncate">{customer}</p>
      <p
        className="text-gray-500 w-[213px] ml-60 text-sm truncate"
        title={food}
      >
        {food}
      </p>
      <div></div>
      <p className="text-gray-500 w-32 ml-10 text-sm">{date}</p>
      <div></div>
      <p className="text-gray-500 w-32 ml-10 font-semibold">{total}</p>
      <p
        className="text-gray-500 w-[213px] ml-10 h-auto text-sm truncate"
        title={delivery}
      >
        {delivery}
      </p>
      <div className="w-40 ml-10 relative">
        <button
          className={`w-[94px] h-8 border rounded-2xl text-black flex items-center justify-center gap-2 ${getStateColor(
            state
          )}`}
          onClick={handleStateClick}
        >
          <p className="font-bold text-sm">{state || "Pending"}</p>
          <UpDown />
        </button>
        {showDropdown && (
          <div className="absolute right-0 mt-1 bg-white border border-gray-200 rounded-lg shadow-lg z-20 w-40">
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => handleStateSelect("PENDING")}
            >
              Pending
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => handleStateSelect("DELIVERED")}
            >
              Delivered
            </button>
            <button
              className="w-full text-left px-4 py-2 hover:bg-gray-100 text-sm"
              onClick={() => handleStateSelect("CANCELED")}
            >
              Cancelled
            </button>
          </div>
        )}
      </div>
      <div></div>
    </div>
  );
};
