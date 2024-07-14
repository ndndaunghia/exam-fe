import React, { createContext, useState, useContext, useMemo, useCallback } from 'react';

interface Answer {
  questionIndex: number;
  selectedOption: string;
}

interface ExamContextType {
  answers: Answer[];
  handleSelectAnswer: (questionIndex: number, selectedOption: string) => void;
}

const ExamContext = createContext<ExamContextType | undefined>(undefined);

export const ExamProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [answers, setAnswers] = useState<Answer[]>([]);

  const handleSelectAnswer = useCallback((questionIndex: number, selectedOption: string) => {
    setAnswers(prev => {
      const existingAnswerIndex = prev.findIndex(answer => answer.questionIndex === questionIndex);
      if (existingAnswerIndex !== -1) {
        // If the answer already exists, update it
        const newAnswers = [...prev];
        newAnswers[existingAnswerIndex] = { questionIndex, selectedOption };
        return newAnswers;
      } else {
        // If it's a new answer, add it to the array
        return [...prev, { questionIndex, selectedOption }];
      }
    });
  }, []);

  const value = useMemo(() => ({ answers, handleSelectAnswer }), [answers, handleSelectAnswer]);

  return <ExamContext.Provider value={value}>{children}</ExamContext.Provider>;
};

export const useExam = () => {
  const context = useContext(ExamContext);
  if (context === undefined) {
    throw new Error('useExam must be used within an ExamProvider');
  }
  return context;
};