import Footer from "../../components/Footer/Footer";
import Header from "../../components/Header";
import Exam from "./Exam";

const ExamPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-dark">
      <Header />
      <main className="flex-grow">
        <Exam />
      </main>
      <Footer />
    </div>
  );
};

export default ExamPage;
