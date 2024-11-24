import React from "react";
import Header from "../../components/Header";
import Footer from "../../components/Footer/Footer";
import ExamHistories from "./ExamHistories";

const ExamHistoriesPage = () => {
  return (
    <div className="flex flex-col min-h-screen bg-[#f8f9fa] dark:bg-dark">
      <Header />
      <main className="flex-grow">
        <ExamHistories />
      </main>
      <Footer />
    </div>
  );
};

export default ExamHistoriesPage;
