"use client";
import { useState } from "react";

export const AddCategory = ({ getData }) => {
  const [categoryinput, setCategoryInput] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");

  const handleSubmit = async () => {
    if (newCategoryName.length === 0) {
      alert("Category bicheechee");
      return;
    }
    try {
      const res = await fetch(
        "https://food-delivery-1-pwgq.onrender.com/category",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            categoryName: newCategoryName,
          }),
        }
      );

      await getData();
      setCategoryInput(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div className="pt-3 pl-3" onClick={() => setCategoryInput(true)}>
        <button className="bg-red-500 text-white rounded-full w-9 h-9 flex  justify-center  text-2xl">
          +
        </button>
      </div>
      {categoryinput && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-6 w-[460px] h-[272px] relative">
            <button
              onClick={() => setCategoryInput(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold ">Add new category</h2>
            <div className="absolute top-25">
              <p>Category name</p>
              <input
                type="text"
                placeholder="Type Category Name"
                className="border border-gray-300 rounded-md px-3 py-2 w-[412px]"
                value={newCategoryName}
                onChange={(e) => setNewCategoryName(e.target.value)}
              />
            </div>
            <button
              onClick={handleSubmit}
              className="bg-black text-white rounded-md w-[123px] absolute top-50 left-80 py-2"
            >
              Add category
            </button>
          </div>
        </div>
      )}
    </>
  );
};
