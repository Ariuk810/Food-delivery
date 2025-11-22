import { useState } from "react";

export const HomefoodCard = (props) => {
  const { foodName, foodPrice, foodIngred, foodImage, foodId } = props;

  const [addCart, setAddCart] = useState(false);
  const [count, setCount] = useState(1);
  const [pushLocal, setPushLocal] = useState([]);

  const addToCart = () => {
    const foodToCart = {
      foodName,
      foodPrice: Number(foodPrice),
      foodIngred,
      count,
      foodId: foodId,
    };
    // setPushLocal((prev) => [...prev, foodToCart]);

    const prevCart = JSON.parse(localStorage.getItem("cart") || "[]");

    console.log(prevCart);

    const updated = [...prevCart, foodToCart];
    localStorage.setItem("cart", JSON.stringify(updated));
    setPushLocal(updated);
  };

  // localstorage.setItem
  // console.log(foodId, "push id to local");

  // console.log(pushLocal, "push to local");

  return (
    <div className="flex flex-wrap gap-5 justify-center pt-15">
      <div className="bg-white rounded-2xl shadow-md overflow-hidden w-full max-w-sm">
        {/* Image wrapper */}
        <div className="relative m-4 rounded-xl overflow-hidden">
          <img
            src={foodImage}
            alt="Sunshine Stackers"
            className="w-full h-48 object-cover rounded-xl"
          />

          {/* + Button */}
          <button
            className="absolute bottom-3 right-3 w-10 h-10 flex justify-center items-center bg-white text-red-500 rounded-full  shadow-md hover:bg-red-500 hover:text-white transition"
            onClick={() => setAddCart(true)}
          >
            <span className="text-xl font-bold">+</span>
          </button>
          {addCart && (
            <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md ">
              <div className="bg-white w-[826px] h-[412px] flex rounded-lg justify-center items-center gap-5">
                <img
                  src={foodImage}
                  className="w-[377px] h-[364px] rounded-lg"
                ></img>
                <div className="w-[377px] h-[364px]">
                  <button
                    className="w-9 h-9 border border-gray-400 rounded-full cursor-pointer ml-90 "
                    onClick={() => setAddCart(false)}
                  >
                    ✕
                  </button>
                  <h1 className="text-[#E65C4F] font-semibold text-2xl pt-3">
                    {foodName}
                  </h1>
                  <p className="text-gray-600 text-sm pt-3">{foodIngred}</p>
                  <div className="flex justify-between items-center pt-30">
                    <div>
                      <p>Total price</p>
                      <p className="text-2xl font-bold">{foodPrice}</p>
                    </div>
                    <div className="flex items-center gap-3.5">
                      <button
                        className="w-11 h-11 rounded-full border border-gray-400"
                        onClick={() => count > 1 && setCount(count - 1)}
                      >
                        -
                      </button>

                      <p className="text-2xl">{count}</p>

                      <button
                        className="w-11 h-11 rounded-full border border-gray-400"
                        onClick={() => setCount(count + 1)}
                      >
                        +
                      </button>
                    </div>
                  </div>
                  <button
                    className="w-[377px] h-11 bg-black rounded-full text-white mt-4"
                    onClick={() => {
                      addToCart();
                      // setAddCart(false);
                    }}
                  >
                    Add to cart
                  </button>
                </div>
              </div>
            </div>
          )}
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
