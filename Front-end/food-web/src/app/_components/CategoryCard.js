"use client";

export const CategoryCard = (props) => {
  const { Torol } = props;

  return (
    <button className="w-[145px] mt-3 ml-3 h-9 border rounded-full flex justify-center items-center font-medium">
      {Torol}
    </button>
  );
};
