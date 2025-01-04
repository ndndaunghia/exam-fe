import { Link } from "react-router-dom";

const Title = ({ title, onSearch }: { title: string; onSearch: (keyword: string) => void }) => {

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    onSearch(e.target.value);
  };

  return (
    <div className="my-6 px-2 sm:px-4 md:px-4 lg:px-4 xl:px-40 py-4 flex justify-between items-center bg-[#f5f5f5] dark:bg-dark-light">
      <div className="flex gap-4">
        <Link to="/" className="text-lg italic dark:text-white">
          Trang chủ
        </Link>
        <span>/</span>
        <a href="" className="text-lg italic text-primary">
          {title}
        </a>
      </div>
      <div className="flex px-4 py-3 rounded-md border-2 border-gray focus-within:border-secondary overflow-hidden ">
        <input
          type="text"
          placeholder="Tìm kiếm ..."
          className="w-full outline-none bg-transparent text-gray-600 text-sm block 2xl:hidden"
          onChange={handleSearch}
        />
        <input
          type="text"
          placeholder="Tìm kiếm khóa học, bài thi, ..."
          className="w-full outline-none bg-transparent text-gray-600 text-sm hidden 2xl:block"
          onChange={handleSearch}
        />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 192.904 192.904"
          width="16px"
          className="fill-gray-600"
        >
          <path d="m190.707 180.101-47.078-47.077c11.702-14.072 18.752-32.142 18.752-51.831C162.381 36.423 125.959 0 81.191 0 36.422 0 0 36.423 0 81.193c0 44.767 36.422 81.187 81.191 81.187 19.688 0 37.759-7.049 51.831-18.751l47.079 47.078a7.474 7.474 0 0 0 5.303 2.197 7.498 7.498 0 0 0 5.303-12.803zM15 81.193C15 44.694 44.693 15 81.191 15c36.497 0 66.189 29.694 66.189 66.193 0 36.496-29.692 66.187-66.189 66.187C44.693 147.38 15 117.689 15 81.193z"></path>
        </svg>
      </div>
    </div>
  );
};

export default Title;
