import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/config";

const FormSubmissionQuestion = ({ question }: { question: Question }) => {
  const { title, type, isRequired, options } = question;
  return (
    <div className="w-full h-auto bg-purple-100 cursor-pointer rounded-md p-6 flex items-start justify-start flex-col gap-2">
      <h1 className="text-xl font-sans font-semibold text-left w-full">
        {title} <span className="text-red-500">{isRequired ? "*" : ""}</span>
      </h1>
      {type === "short_text" && (
        <input
          type="text"
          placeholder="Your answer"
          required={isRequired}
          className="w-[50%] h-8 bg-transparent border-b-2 border-gray-500 outline-none hover:border-purple-600 text-base font-sans font-medium"
        />
      )}
      {type === "paragraph" && (
        <input
          type="text"
          placeholder="Your answer"
          required={isRequired}
          className="w-full h-8 bg-transparent border-b-2 border-gray-500 outline-none hover:border-purple-600 text-base font-sans font-medium"
        />
      )}
      {type === "multiple_choice" && (
        <RadioGroup
          className="w-full h-auto flex items-start flex-col justify-start gap-4 mt-5"
          required={isRequired}
        >
          {options?.map((option, idx) => {
            return (
              <div className="flex items-center space-x-2" key={idx}>
                <RadioGroupItem value={option} id={option} />
                <Label htmlFor={option}>{option}</Label>
              </div>
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
};

export default FormSubmissionQuestion;
