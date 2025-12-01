"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

const UPLOAD_PRESET = "Food delivery";
const CLOUD_NAME = "dvxchfkte";
export const AddFood = ({ getData, categoryId, categoryName }) => {
  const [foodInput, setFoodInput] = useState(false);
  const [newFoodName, setNewFoodName] = useState("");
  const [foodPrice, setFoodPrice] = useState("");
  const [foodIngred, setFoodIngred] = useState("");
  const [logoUrl, setLogoUrl] = useState("");
  const [uploading, setUploading] = useState(false);

  const uploadToCloudinary = async (file) => {
    const formData = new FormData();

    formData.append("file", file);

    formData.append("upload_preset", UPLOAD_PRESET);

    try {
      const response = await fetch(
        `https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`,

        {
          method: "POST",

          body: formData,
        }
      );

      const data = await response.json();

      return data.secure_url;
    } catch (error) {
      console.error("Cloudinary upload failed:", error);
    }
  };

  const handleLogoUpload = async (event) => {
    const file = event.target.files[0];

    if (!file) return;

    setUploading(true);

    try {
      const url = await uploadToCloudinary(file);

      setLogoUrl(url);
    } catch (err) {
      console.log("Failed to upload logo: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  const handleSubmit = async () => {
    if (newFoodName.length === 0) {
      alert("FOODNAME bicheechee");
      return;
    }
    if (foodPrice.length === 0) {
      alert("foodPrice bicheechee");
      return;
    }
    if (foodIngred.length === 0) {
      alert("foodIngred bicheechee");
      return;
    }
    if (!logoUrl) {
      alert("Image upload hiine uu");
      return;
    }

    try {
      const res = await fetch(
        "https://food-delivery-1-pwgq.onrender.com/food",
        {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            foodName: newFoodName,
            price: Number(foodPrice),
            ingredients: foodIngred,
            image: logoUrl,
            category: categoryId,
          }),
        }
      );

      await getData();
      setFoodInput(false);
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>
      <div
        className="w-[270px] h-[241px] border border-red-500 border-dashed rounded-lg flex flex-col items-center justify-center space-y-3 "
        onClick={() => setFoodInput(true)}
      >
        <button className="bg-red-500 text-white rounded-full w-9 h-9 flex items-center justify-center text-2xl">
          +
        </button>
        <p className="text-center text-black font-medium">
          Add new Dish to <br /> {categoryName}
        </p>
      </div>
      {foodInput && (
        <div className="fixed inset-0 flex items-center justify-center  bg-opacity-50 z-50 backdrop-blur-md">
          <div className="bg-white rounded-2xl p-6 w-[460px] h-[592px] relative">
            <button
              onClick={() => setFoodInput(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>
            <h2 className="text-xl font-bold mb-4">
              Add new Dish to Appetizers <br />
            </h2>

            <div className="flex gap-2 mb-3">
              <input
                type="text"
                placeholder="Type food name"
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2"
                value={newFoodName}
                onChange={(e) => setNewFoodName(e.target.value)}
              />
              <input
                placeholder="Enter price..."
                className="border border-gray-300 rounded-md px-3 py-2 w-1/2"
                value={foodPrice}
                onChange={(e) => setFoodPrice(e.target.value)}
              />
            </div>

            <textarea
              placeholder="List ingredients..."
              className="border border-gray-300 rounded-md px-3 py-2 w-full h-24 mb-3"
              value={foodIngred}
              onChange={(e) => setFoodIngred(e.target.value)}
            />

            <div className="border-2 border-dashed border-gray-300 rounded-lg h-40 flex items-center justify-center mb-4 relative overflow-hidden">
              {!logoUrl && (
                <input
                  className="text-gray-400 text-center absolute inset-0 w-full h-full opacity-100 cursor-pointer"
                  type="file"
                  accept="image/*"
                  onChange={handleLogoUpload}
                  disabled={uploading}
                />
              )}
              {logoUrl && (
                <img
                  src={logoUrl}
                  alt="Uploaded logo"
                  className="object-contain w-full h-full"
                />
              )}
              {!logoUrl && uploading && (
                <p className="absolute text-blue-600">Uploading...</p>
              )}
            </div>

            <button
              className="bg-black text-white rounded-md w-full py-2"
              onClick={handleSubmit}
            >
              Add Dish
            </button>
          </div>
        </div>
      )}
    </>
  );
};
