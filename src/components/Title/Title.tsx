import React from "react";
import Colors from "../../config/colors";

const Title = () => {
  return (
    <div
      style={{
        background: `linear-gradient(to right, ${Colors.primaryLightColor}, ${Colors.secondaryLightColor})`,
      }}
      className="px-8 my-10"
    >
      <h2 className="text-3xl font-semibold text-center p-8 text-white">
        Khóa học làm giàu
      </h2>
    </div>
  );
};

export default Title;
