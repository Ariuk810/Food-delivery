"use client";
export const HomeFoodCard = () => {
  return (
    <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm">
      {/* Image wrapper */}
      <div className="relative m-4 rounded-xl overflow-hidden">
        <img
          src="/Tsuivan.png"
          alt="Sunshine Stackers"
          className="w-full h-48 object-cover rounded-xl"
        />

        {/* + Button */}
        <button className="absolute bottom-3 right-3 bg-white text-red-500 rounded-full p-2 shadow-md hover:bg-red-500 hover:text-white transition">
          <span className="text-xl font-bold">+</span>
        </button>
      </div>

      {/* Content */}
      <div className="px-5 pb-5">
        <div className="flex justify-between items-center mb-2">
          <h2 className="text-lg font-semibold text-[#E65C4F]">
            Sunshine Stackers
          </h2>
          <p className="font-semibold">$12.99</p>
        </div>

        <p className="text-gray-600 text-sm">
          Fluffy pancakes stacked with fruits, cream, syrup, and powdered sugar.
        </p>
      </div>
    </div>
  );
};
