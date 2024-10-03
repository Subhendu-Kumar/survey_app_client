import { Form, User } from "@/config";
import { getUserData } from "@/utils";
import { useEffect, useState } from "react";
import FormAccountSet from "./ui/FormAccountSet";
import FormHeader from "./ui/FormHeader";
import FormSubmissionQuestion from "./ui/FormSubmissionQuestion";
import { useParams } from "react-router-dom";
import { getForm } from "@/api";

const FormSubmissionWindow = () => {
  const { id: formId } = useParams<{ id: string }>();
  const [user, setUser] = useState<User | null>(null);
  const [form, setForm] = useState<Form>({
    form_id: "",
    title: "",
    description: "",
    questions: [],
  });

  console.log(formId);

  useEffect(() => {
    setUser(getUserData());
  }, []);

  useEffect(() => {
    const getFormData = async () => {
      try {
        if (formId) {
          const response = await getForm(formId);
          setForm(response);
        }
      } catch (error) {
        console.error(error);
      }
    };
    getFormData();
  }, [formId]);

  console.log(form);

  return (
    <div className="w-full min-h-screen py-10 px-96">
      <div className="w-full h-auto flex flex-col items-center justify-center gap-6">
        <FormAccountSet user={user} setUser={setUser} />
        <FormHeader
          title={form.title}
          description={form.description}
          showEditButton={false}
        />
        {form.questions.map((question, idx) => {
          return (
            <FormSubmissionQuestion key={idx} question={question} />
          );
        })}
        <div className="w-full h-auto flex items-center justify-between">
          <button className="w-fit px-3 py-1 rounded flex bg-purple-500 text-white items-center justify-center gap-2 text-base font-semibold hover:bg-purple-600 transition-all duration-300 ease-in-out capitalize select-none">
            Submit
          </button>
          <button className="text-base text-purple-500 font-sans font-medium select-none">
            Clear form
          </button>
        </div>
      </div>
      <div className="w-full h-auto mt-10 flex flex-col items-center justify-center gap-6">
        <p className="text-sm font-sans font-normal">
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
