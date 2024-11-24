import Header from "../../components/Header";
import ExamReview from "./ExamReview";
import Footer from "../../components/Footer/Footer";

const ExamReviewPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-dark">
      <Header />
      <main className="flex-grow">
        <ExamReview />
      </main>
      <Footer />
    </div>
  );
};

export default ExamReviewPage;
