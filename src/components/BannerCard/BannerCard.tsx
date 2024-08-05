import { motion } from "framer-motion";
import publicImg from "../../assets/public.avif";
import BANNER_CONTENT from "../../constants/banner-content";
import Colors from "../../config/colors";
import Button from "../Button/Button";

const BannerCard = () => {
  return (
    <>
      <motion.section
        initial={{ opacity: 0, y: 100 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1.5, ease: "linear" }}
      >
        <section className="grid grid-cols-1 md:grid-cols-3 py-32 gap-10 px-8 dark:bg-dark">
          {BANNER_CONTENT.map((item, index: number) => {
            return (
              <article
                className="rounded-2xl shadow-2xl col-span-1 p-10 md:block flex flex-col items-center dark:shadow-twe-inner"
                key={index}
              >
                <div className="flex flex-col justify-center items-center">
                  {item.icon}
                  <h4 className="font-bold text-lg text-left md:mt-8 mt-0 dark:text-white">
                    {item.title}
                  </h4>
                </div>
                <p className="font-medium mt-4 md:mt-6 text-left text-gray-500">
                  {item.description}
                </p>
              </article>
            );
          })}
        </section>
      </motion.section>

      <section className="py-24 bg-[#f5f6fa] overflow-hidden px-8 dark:bg-dark-light">
        <div className="md:gap-8 md:flex md:flex-row md:justify-center md:items-center sm:flex sm:flex-col sm:justify-center sm:items-center">
          <motion.article
            className="mx-auto"
            initial={{ opacity: 0, x: -80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.25,
              ease: "linear",
            }}
          >
            <img src={publicImg} alt="" />
          </motion.article>
          <motion.article
            className="mx-auto"
            initial={{ opacity: 0, x: 80 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{
              duration: 1.25,
              ease: "linear",
            }}
          >
            <h2 className="font-bold text-2xl mt-1 text-center md:text-3xl md:leading-normal md:mt-0 md:text-left dark:text-white">
              {" "}
              Bắt đầu{" "}
              <span className={`text-[${Colors.primaryColor}]`}>
                tìm kiếm khoá học
              </span>
              <br />
              <span>dễ dàng</span>
            </h2> 
            <p className="md:block hidden md:text-left sm:text-center mt-3 text-xl dark:text-white">
              Các khoá học của Sky được biên soạn và trình bày một cách khoa học
              nhất
            </p>
            <div className="flex my-6 gap-4 justify-center items-center md:justify-start">
              <Button
                content="Khoá học mất gốc"
                backgroundColor={Colors.primaryColor}
                color="white"
                backgroundHover={Colors.primaryDarkColor}
                onClick={() => alert("Mua khóa học")}
              />
              <Button
                content="Khoá học 8+"
                backgroundColor={Colors.primaryColor}
                color="white"
                backgroundHover={Colors.primaryDarkColor}
                onClick={() => alert("Mua khóa học")}
              />
            </div>
          </motion.article>
        </div>
      </section>
    </>
  );
};

export default BannerCard;
