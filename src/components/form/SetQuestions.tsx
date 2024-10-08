import { useEffect, useState } from "react";
import FormHeader from "./ui/FormHeader";
import FormQuestion from "./ui/FormQuestion";
import { IoIosAddCircleOutline } from "react-icons/io";
import { useToast } from "@/hooks/use-toast";
import {
  Form,
  Question,
  DEFAULT_FORM_TITLE,
  DEFAULT_QUESTION_TYPE,
  DEFAULT_QUESTION_TITLE,
  DEFAULT_FORM_DESCRIPTION,
} from "@/config";
import { createForm } from "@/api";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import savingLogo from "../../../public/saving.gif";
import { useNavigate } from "react-router-dom";

const SetQuestions = ({ formId }: { formId: string }) => {
  const { toast } = useToast();
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState<boolean>(false);
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

  const handleCreateForm = async () => {
    setIsLoading(true);
    try {
      const response = await createForm(formId, form);
      console.log(response);
      toast({
        title: "Success",
        description: "Form created successfully",
        duration: 3000,
      });
      navigate(`/forms/preview/${formId}`);
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Failed to create form : Form with this Id alreadt exists",
        duration: 3000,
      });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="w-full h-auto mt-10 flex items-center justify-center flex-col gap-6">
      <FormHeader
        title={title}
        setTitle={setTitle}
        description={description}
        setDescription={setDescription}
        showEditButton={true}
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
      <div className="w-full h-auto flex items-center justify-center gap-4">
        <button
          onClick={addQuestion}
          className="mt-4 px-3 py-2 bg-purple-300 hover:bg-purple-500 flex items-center justify-center gap-2 text-black rounded-lg text-xl font-sans font-medium transition-all duration-300 ease-in-out"
        >
          <IoIosAddCircleOutline />
          Add Question
        </button>
        <button
          className="mt-4 px-3 py-2 bg-purple-300 hover:bg-purple-500 flex items-center justify-center gap-2 text-black rounded-lg text-xl font-sans font-medium transition-all duration-300 ease-in-out"
          onClick={handleCreateForm}
        >
          <IoIosAddCircleOutline />
          Submit/Create
        </button>
      </div>
      <AlertDialog open={isLoading} onOpenChange={setIsLoading}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Saving form data to server</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone.
            </AlertDialogDescription>
            <div className="w-full h-36 mt-6 flex items-center justify-center">
              <img
                src={savingLogo}
                alt="saving"
                className="w-full h-full object-contain object-center"
              />
            </div>
          </AlertDialogHeader>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default SetQuestions;
