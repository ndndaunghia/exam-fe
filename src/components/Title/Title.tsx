import { Link } from "react-router-dom";

const Title = ({ title }: { title: string }) => {
  return (
    // <div
    //   style={{
    //     background: `linear-gradient(to right, ${Colors.primaryLightColor}, ${Colors.secondaryLightColor})`,
    //   }}
    //   className="px-8 my-10"
    // >
    //   <h2 className="text-3xl font-semibold text-center p-8 text-white">
    //     Khóa học làm giàu
    //   </h2>
    // </div>
    <div className="my-6 px-4 md:px-8 lg:px-48 py-4 flex items-center gap-4 bg-[#f5f5f5]">
      <Link to="/" className="text-lg italic">
        Trang chủ
      </Link>
      <span>/</span>
      <a href="" className="text-lg italic text-primary">
        {title}
      </a>
    </div>
  );
};

export default Title;
