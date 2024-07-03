const CourseCard = () => {
  return (
    <>
      <div className="flex justify-between gap-4 pb-[22px] border-b-gray-400 border-white border-2 cursor-pointer">
        <div className="flex gap-6">
          <div className="w-60 h-40">
            <img
              src="https://files.fullstack.edu.vn/f8-prod/courses/7.png"
              alt=""
              className="w-full h-full object-cover hover:opacity-80" 
            />
          </div>
          <div className="flex flex-col gap-y-1">
            <div>
              <h3 className="text-sm md:text-xl font-semibold">
                <a href="">
                  Flutter & Dart - The Complete Guide [2024 Edition]
                </a>
              </h3>
            </div>
            <p>Framework for building native iOS and Android apps</p>
            <div>
              <span className="text-sm text-gray-400">
                Academind by Maximilian Schwarzmüller, Maximilian Schwarzmüller
              </span>
            </div>
            <div>
              <span className="mr-4">30 hours</span>
              <span>370 lessons</span>
            </div>
          </div>
        </div>
        <div className="flex flex-col">
          <h3>299.000đ</h3>
          <h3 className="line-through text-sm text-gray-400">499.000đ</h3>
        </div>
      </div>
    </>
  );
};

export default CourseCard;
