import { CiClock2 } from "react-icons/ci";
import { LuPencil } from "react-icons/lu";
import { SlBubbles } from "react-icons/sl";
import Button from "../Button/Button";
import Colors from "../../config/colors";
import useNavigateCustom from "../../hooks/useNavigateCustom";
import { motion } from "framer-motion";
import { useTheme } from "../../hooks/useTheme";
import { Exam } from "../../services/exam/exam.type";
const TestItem = ({ exam }: { exam: Exam }) => {
  const { handleNavigate } = useNavigateCustom();
  const [theme] = useTheme();

  return (
    <motion.div
      whileHover={{ y: -10 }}
      transition={{ type: "keyframes", stiffness: 400 }}
      className="max-w-fit p-4 rounded-2xl border-2 shadow-xl"
    >
      <h2 className="font-semibold dark:text-white">{exam.name}</h2>
      <div className="flex gap-4 my-4">
        <div className="flex items-center gap-2">
          <CiClock2 color={theme === "light" ? "black" : "white"} />
          <p className="dark:text-white"> 50 phút</p>
        </div>
        <p className="dark:text-white">|</p>

        <div className="flex items-center gap-2">
          <LuPencil color={theme === "light" ? "black" : "white"} />
          <p className="dark:text-white"> 415047</p>
        </div>
        <p className="dark:text-white">|</p>

        <div className="flex items-center gap-2">
          <SlBubbles color={theme === "light" ? "black" : "white"} />
          <p className="dark:text-white">128</p>
        </div>
      </div>
      <div className="flex gap-2 my-4">
        <p className="dark:text-white">Năm học: {exam.year}</p>
        <p className="dark:text-white">|</p>
        <p className="dark:text-white">{exam.total_question} câu hỏi</p>
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
        onClick={() => handleNavigate(`/exam/${exam.id}`)}
      />
    </motion.div>
  );
};

export default TestItem;
