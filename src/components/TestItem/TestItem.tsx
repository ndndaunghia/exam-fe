import { CiClock2 } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { SlBubbles } from "react-icons/sl";
import Button from "../Button/Button";
import Colors from "../../config/colors";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import { motion } from "framer-motion";
const TestItem = () => {
  const { handleNavigate } = useNavigateCustom();
  return (
    <motion.div
    whileHover={{ y: -10}}
    transition={{ type: "keyframes", stiffness: 400 }}
    className="max-w-fit p-4 rounded-2xl border-2 shadow-xl">
      <h2 className="font-semibold">IELTS Simulation Listening test 1</h2>
      <div className="flex gap-4 my-4">
        <div className="flex items-center">
          <CiClock2 />
          <p> 30 phút</p>
        </div>
        <p>|</p>

        <div className="flex items-center gap-1">
          <LuPencil />
          <p> 415047</p>
        </div>
        <p>|</p>

        <div className="flex items-center gap-1">
          <SlBubbles />
          <p>128</p>
        </div>
      </div>
      <div className="flex gap-2 my-4">
        <p>2 phần thi</p>
        <p>|</p>
        <p>40 câu hỏi</p>
      </div>
      {/* <div className="bg-secondary-light max-w-fit px-2 py-1 rounded-2xl my-4">
        <p className="text-white">#Tin học</p>
      </div> */}
      <Button
        backgroundColor={Colors.primaryColor}
        backgroundHover={Colors.primaryDarkColor}
        color="white"
        content="Làm bài"
        width="100%"
        margin="1rem 0"
        onClick={() => handleNavigate("/exam")}
      />
    </motion.div>
  );
};

export default TestItem;
