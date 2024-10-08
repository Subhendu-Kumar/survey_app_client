import { Answer, Form, Response, User } from "@/config";
import { getUserData } from "@/utils";
import { useEffect, useState } from "react";
import FormAccountSet from "./ui/FormAccountSet";
import FormHeader from "./ui/FormHeader";
import FormSubmissionQuestion from "./ui/FormSubmissionQuestion";
import { useParams } from "react-router-dom";
import { getForm, submitForm } from "@/api";
import FormQuestionSkeleton from "../skeletonLoaders/FormQuestionSkeleton";
import FormHeaderSkeleton from "../skeletonLoaders/FormHeaderSkeleton";
import savingLogo from "../../../public/saving.gif";
import { useToast } from "@/hooks/use-toast";
import {
  AlertDialog,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";

const FormSubmissionWindow = () => {
  const { toast } = useToast();
  const { id: formId } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [submitSuccess, setSubmitSuccess] = useState<boolean>(false);
  const [isSubmitDialogOpen, setIsSubmitDialogOpen] = useState<boolean>(false);
  const [responses, setResponses] = useState<Answer[]>([]);
  const [form, setForm] = useState<Form>({
    form_id: "",
    title: "",
    description: "",
    questions: [],
  });

  const userResponse: Response = {
    form_id: formId || "",
    responses: responses,
  };

  useEffect(() => {
    setUser(getUserData());
  }, []);

  useEffect(() => {
    const getFormData = async () => {
      setIsLoading(true);
      try {
        if (formId) {
          const response = await getForm(formId);
          setForm(response);
        }
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    getFormData();
  }, [formId]);

  const handleInputChange = (questionId: string, response: string) => {
    setResponses((prev) => {
      const existingResponseIndex = prev.findIndex(
        (item) => item.question_id === questionId
      );
      if (existingResponseIndex !== -1) {
        return prev.map((item, index) =>
          index === existingResponseIndex
            ? { ...item, answer_text: response }
            : item
        );
      } else {
        return [...prev, { question_id: questionId, answer_text: response }];
      }
    });
  };

  const handleOnSubmit = async () => {
    if (user === null) {
      toast({
        title: "Error",
        description: "Login to create a response",
        duration: 3000,
      });
      return;
    }
    setIsSubmitDialogOpen(true);
    try {
      const response = await submitForm(userResponse);
      console.log(response);
    } catch (error) {
      console.log(error);
    } finally {
      setSubmitSuccess(true);
      toast({
        title: "Success",
        description: "Your response has been submitted successfully!",
        duration: 3000,
      });
      setIsSubmitDialogOpen(false);
    }
  };

  return (
    <div className="w-full min-h-screen py-10 md:px-96 px-4">
      <div className="w-full h-auto flex flex-col items-center justify-center gap-6">
        <FormAccountSet user={user} setUser={setUser} />
        {submitSuccess ? (
          <div className="w-full h-auto flex flex-col items-center justify-center">
            <p className="text-sm font-sans font-normal">
              Your response has been recorded successfully!
            </p>
            <button
              className="text-sm text-purple-500 font-bold font-sans"
              onClick={() => setSubmitSuccess(false)}
            >
              Submit another response
            </button>
          </div>
        ) : isLoading ? (
          <>
            <FormHeaderSkeleton />
            <FormQuestionSkeleton />
          </>
        ) : (
          <>
            <FormHeader
              title={form.title}
              description={form.description}
              showEditButton={false}
            />
            {form.questions.map((question, idx) => (
              <FormSubmissionQuestion
                key={idx}
                question={question}
                onInputChange={handleInputChange}
              />
            ))}
          </>
        )}
        {!submitSuccess && (
          <div className="w-full h-auto flex items-center justify-between">
            <button
              className="w-fit px-3 py-1 rounded flex bg-purple-500 disabled:bg-gray-400 text-white items-center justify-center gap-2 text-base font-semibold hover:bg-purple-600 transition-all duration-300 ease-in-out capitalize select-none"
              onClick={handleOnSubmit}
              disabled={isLoading}
            >
              Submit
            </button>
            <AlertDialog
              open={isSubmitDialogOpen}
              onOpenChange={setIsSubmitDialogOpen}
            >
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Saving response to server</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. how ever you can submit
                    another response!
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
            <button className="text-base text-purple-500 font-sans font-medium select-none">
              Clear form
            </button>
          </div>
        )}
      </div>
      <div className="w-full h-auto mt-10 flex flex-col items-center justify-center gap-6">
        <p className="text-sm text-center font-sans font-normal">
          This content is neither created nor endorsed by{" "}
          <span className="text-purple-500">Survey Forms</span>.{" "}
          <span className="hover:underline select-none">Report Abuse</span> -{" "}
          <span className="hover:underline select-none">Privacy Policy</span>
        </p>
        <p className="text-2xl text-gray-500 select-none font-sans font-normal">
          Survey Forms
        </p>
      </div>
    </div>
  );
};

export default FormSubmissionWindow;
