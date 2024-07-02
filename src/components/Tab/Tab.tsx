import React from "react";

const Tab = () => {
  return (
    <button className="relative  group  py-1.5 px-2.5 text-black">
      <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary group-hover:w-full group-hover:transition-all"></span>
      Button Hover
    </button>
  );
};

export default Tab;
