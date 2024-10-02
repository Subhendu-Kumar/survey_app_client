import { useEffect, useState } from "react";
import FormHeader from "./ui/FormHeader";
import FormQuestion from "./ui/FormQuestion";
import { IoIosAddCircleOutline } from "react-icons/io";
import {
  Form,
  Question,
  DEFAULT_FORM_TITLE,
  DEFAULT_QUESTION_TYPE,
  DEFAULT_QUESTION_TITLE,
  DEFAULT_FORM_DESCRIPTION,
} from "@/config";

const SetQuestions = ({ formId }: { formId: string }) => {
  const [form, setForm] = useState<Form>({
    title: "",
    description: "",
    questions: [],
  });
  const [questions, setQuestions] = useState<Question[]>([
    {
      id: 1,
      title: DEFAULT_QUESTION_TITLE,
      type: DEFAULT_QUESTION_TYPE,
      isRequired: false,
    },
  ]);
  const [title, setTitle] = useState<string>(DEFAULT_FORM_TITLE);
  const [description, setDescription] = useState<string>(
    DEFAULT_FORM_DESCRIPTION
  );

  useEffect(() => {
    setForm((prevForm) => ({
      ...prevForm,
      title,
      description,
      questions,
    }));
  }, [title, description, questions]);

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
        title: DEFAULT_QUESTION_TITLE,
        type: DEFAULT_QUESTION_TYPE,
        isRequired: false,
      },
    ]);
  };

  const deleteQuestion = (index: number) => {
    const updatedQuestions = questions.filter((_, i) => i !== index);
    setQuestions(updatedQuestions);
  };

  console.log(form);
  console.log(formId);

  return (
    <div className="w-full h-auto mt-10 flex items-center justify-center flex-col gap-6">
      <FormHeader
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
      />
      {questions.map((question, idx) => {
        return (
          <FormQuestion
            key={idx}
            question={question}
            onChange={(updatedQuestion: Question) =>
              handleQuestionChange(idx, updatedQuestion)
            }
            onDelete={() => deleteQuestion(idx)}
            addQuestion={addQuestion}
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
