import { PiUserRectangleLight, PiRankingLight, PiBookOpenDuotone } from "react-icons/pi";

import BannerCardType from "../components/BannerCard/BannerCard.types";
import Colors from "../config/colors";

const BANNER_CONTENT: BannerCardType[] = [
  {
    title: "Video bài giảng chất lượng cao",
    description:
      "Bởi đội ngũ giáo viên xuất sắc và tận tâm, cựu du học sinh, tốt nghiệp tại các trường Đại học danh tiếng",
    icon: <PiUserRectangleLight color={Colors.primaryColor} size="6rem" />,
  },
  {
    title: "Đầy đủ bài mẫu, bài tập dựa theo đề thi của Bộ",
    description:
      "Bộ tài liệu đã giúp 1000+ học sinh đạt điểm trung bình môn 8.0",
    icon: <PiBookOpenDuotone color={Colors.secondaryColor} size="6rem" />,
  },
  {
    title: "Thi đua xếp hạng hàng tuần, tháng",
    description:
      "Để học sinh cảm thấy hứng thú và tạo động lực học tập cao nhất có thể",
    icon: <PiRankingLight color={Colors.thirdDarkColor} size="6rem" />,
  },
];

export default BANNER_CONTENT;
