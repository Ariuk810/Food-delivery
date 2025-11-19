"use client";
import { IoTrashOutline } from "react-icons/io5";
import { useState } from "react";
import { EditIcon } from "../icons/Edit";
import {
  NativeSelect,
  NativeSelectOption,
} from "@/components/ui/native-select";

const UPLOAD_PRESET = "Food delivery";
const CLOUD_NAME = "dvxchfkte";

export const FoodCard = (props) => {
  const {
    foodId,
    foodName,
    foodPrice,
    foodIngred,
    foodCategory,
    categories,
    getData,
    foodImage,
  } = props;

  const [editGang, setEditGang] = useState(false);
  const [editName, setEditName] = useState(foodName);
  const [editCategory, setEditCategory] = useState(foodCategory);
  const [editIngred, setEditIngred] = useState(foodIngred);
  const [editPrice, setEditPrice] = useState(foodPrice);
  const [editImage, setEditImage] = useState(foodImage);

  const [imageEdit, setImageEdit] = useState(false);
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
    if (!editName || !editPrice || !editIngred) {
      alert("All fields required!");
      return;
    }

    try {
      const res = await fetch(`http://localhost:1000/food`, {
        method: "PUT",
        headers: {
          "content-type": "application/json",
        },
        body: JSON.stringify({
          foodName: editName,
          price: Number(editPrice),
          ingredients: editIngred,
          category: editCategory,
          id: foodId,
          image: logoUrl,
        }),
      });

      await getData();
      setEditGang(false);
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="w-[270px] h-[241px] border border-gray-200 rounded-2xl pl-4 pt-3 relative">
      <img src={foodImage} className="w-60 h-[129px] rounded-lg " />
      <button
        className="absolute top-20 right-5 bg-white rounded-full w-10 h-10 flex items-center justify-center"
        onClick={() => setEditGang(true)}
      >
        <EditIcon />
      </button>

      {editGang && (
        <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md">
          <div className="w-[472px] h-auto relative bg-white rounded-2xl p-7 border border-gray-500">
            <button
              onClick={() => setEditGang(false)}
              className="absolute top-3 right-3 text-gray-500 hover:text-black"
            >
              ✕
            </button>

            <h2 className="text-xl font-bold mb-4">Dishes info</h2>

            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-500">Dish name</p>
              <input
                type="text"
                className="w-[288px] h-10 border rounded-lg pl-5"
                value={editName}
                onChange={(e) => setEditName(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-500">Dish category</p>
              <NativeSelect
                value={editCategory}
                onChange={(e) => setEditCategory(e.target.value)}
              >
                <NativeSelectOption value="">
                  Select category
                </NativeSelectOption>

                {categories.map((category) => (
                  <NativeSelectOption key={category._id} value={category._id}>
                    {category.categoryName}
                  </NativeSelectOption>
                ))}
              </NativeSelect>
            </div>

            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-500">Ingredients</p>
              <textarea
                className="w-[288px] h-20 border rounded-lg pl-5"
                value={editIngred}
                onChange={(e) => setEditIngred(e.target.value)}
              />
            </div>

            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-500">Price</p>
              <input
                type="number"
                className="w-[288px] h-10 border rounded-lg pl-5"
                value={editPrice}
                onChange={(e) => setEditPrice(e.target.value)}
              />
            </div>
            <div className="flex justify-between items-center pt-5">
              <p className="text-gray-500">Image</p>

              <div className="w-[288px] h-[116px] relative">
                {/* Хэрвээ засахгүй бол хуучин зураг */}
                {!imageEdit && (
                  <>
                    <img className="w-full h-full rounded-lg" src={foodImage} />
                    <button
                      className="absolute top-2 right-2 bg-white rounded-full w-7 h-7 flex items-center justify-center"
                      onClick={() => setImageEdit(true)}
                    >
                      X
                    </button>
                  </>
                )}

                {/* Засах үед - яг энэ байрлалд upload хэсэг орно */}
                {imageEdit && (
                  <div className="absolute inset-0 border-2 border-dashed border-gray-300 rounded-lg flex items-center justify-center overflow-hidden">
                    {!logoUrl && (
                      <input
                        className="absolute inset-0 w-full h-full opacity-100 cursor-pointer"
                        type="file"
                        accept="image/*"
                        onChange={handleLogoUpload}
                        disabled={uploading}
                      />
                    )}

                    {logoUrl && (
                      <img
                        src={logoUrl}
                        className="object-cover w-full h-full rounded-lg"
                      />
                    )}

                    {!logoUrl && uploading && (
                      <p className="absolute text-blue-600">Uploading...</p>
                    )}
                  </div>
                )}
              </div>
              {/* <div className="w-[288px] h-[116px]">
                <img className="w-full h-full rounded-lg" src={foodImage}></img>
                <button
                  className="absolute top-95 right-8  bg-white rounded-full w-10 h-10 flex items-center justify-center text-gray-500 hover:text-black"
                  onClick={() => setImageEdit(true)}
                >
                  x
                </button>
                {imageEdit && (
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
                )}
              </div> */}
            </div>

            <div className="flex justify-between items-center pt-5">
              <div className="w-12 h-10 border border-red-400 flex justify-center items-center rounded-lg cursor-pointer ">
                <IoTrashOutline />
              </div>

              <button
                className="w-[126px] h-10 bg-black text-white rounded-lg cursor-pointer"
                onClick={handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </div>
      )}

      <div className="flex gap-10 pt-4">
        <h3 className="text-red-500 text-sm">{foodName}</h3>
        <p className="text-sm font-semibold">{foodPrice}</p>
      </div>
      <p className="text-gray-600 text-xs mt-1">{foodIngred}</p>
    </div>
  );
};
