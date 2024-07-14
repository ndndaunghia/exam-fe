import React from "react";
import Typography from "../Typography/Typography";

const Answer = () => {
  return (
    <div className="mx-12">
      <Typography variant="h5" responsive className="italic text-primary my-2">
        Đúng
      </Typography>
      <Typography variant="h6" className="font-semibold my-2">
        Lời giải
      </Typography>
      <div className="border-1 border-[1px] border-blue-300 p-4 rounded-xl">
        <p>
          Trong khoảng (-1;0) đạo hàm y' nên hàm số nghịch biến trên khoảng
          (-1;0).
        </p>
      </div>
    </div>
  );
};

export default Answer;
