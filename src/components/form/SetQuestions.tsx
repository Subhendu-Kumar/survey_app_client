import { useState } from "react";
import FormHeader from "./ui/FormHeader";
import FormQuestion from "./ui/FormQuestion";
import { IoIosAddCircleOutline } from "react-icons/io";

export type QuestionType = "short-text" | "paragraph" | "multiple-choice" | "";

export interface Question {
  id: number;
  title: string;
  type: QuestionType;
  isRequired: boolean;
  options?: string[];
}

const SetQuestions = () => {
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: "Question",
      type: "short-text",
      isRequired: false,
    },
  ]);

  const handleQuestionChange = (index: number, updatedQuestion: Question) => {
    const updatedQuestions = [...questions];
    updatedQuestions[index] = updatedQuestion;
    setQuestions(updatedQuestions);
  };

  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        id: questions.length + 1,
        title: "Question",
        type: "short-text",
        isRequired: false,
      },
    ]);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  return (
    <div className="w-full h-auto mt-10 flex items-center justify-center flex-col gap-6">
      <FormHeader />
      {questions.map((question, idx) => {
        return (
          <FormQuestion
            key={idx}
            question={question}
            onChange={(updatedQuestion: Question) =>
              handleQuestionChange(idx, updatedQuestion)
            }
            onDelete={() => deleteQuestion(idx)}
          />
        );
      })}
      <button
        onClick={addQuestion}
        className="mt-4 px-3 py-2 bg-purple-300 hover:bg-purple-500 flex items-center justify-center gap-2 text-black rounded-lg text-xl font-sans font-medium transition-all duration-300 ease-in-out"
      >
        <IoIosAddCircleOutline />
        Add Question
      </button>
    </div>
  );
};

export default SetQuestions;
