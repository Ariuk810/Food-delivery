export const HomefoodCard = (props) => {
  const { foodName, foodPrice, foodIngred } = props;
  return (
    <div className="flex flex-wrap gap-5 justify-center pt-15">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm">
        {/* Image wrapper */}
        <div className="relative m-4 rounded-xl overflow-hidden">
          <img
            src="/Tsuivan.png"
            alt="Sunshine Stackers"
            className="w-full h-48 object-cover rounded-xl"
          />

          {/* + Button */}
          <button className="absolute bottom-3 right-3 w-10 h-10 flex justify-center items-center bg-white text-red-500 rounded-full  shadow-md hover:bg-red-500 hover:text-white transition">
            <span className="text-xl font-bold">+</span>
          </button>
        </div>

        {/* Content */}
        <div className="px-5 pb-5">
          <div className="flex justify-between items-center mb-2">
            <h2 className="text-lg font-semibold text-[#E65C4F]">{foodName}</h2>
            <p className="font-semibold">{foodPrice}</p>
          </div>

          <p className="text-gray-600 text-sm">{foodIngred}</p>
        </div>
      </div>
    </div>
  );
};
