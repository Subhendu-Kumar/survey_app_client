import { FaQuestion } from "react-icons/fa6";
import SetQuestions from "./SetQuestions";
import { useParams } from "react-router-dom";

const CreateForm = () => {
  const { id } = useParams<{ id: string }>();

  return (
    <div className="w-full h-auto px-56">
      <div className="w-full h-10 mt-6 flex items-center justify-center">
        <h1 className="flex items-center justify-center gap-3 text-2xl font-sans font-semibold">
          <FaQuestion />
          Set Questions
        </h1>
      </div>
      <SetQuestions formId={id!} />
    </div>
  );
};

export default CreateForm;
