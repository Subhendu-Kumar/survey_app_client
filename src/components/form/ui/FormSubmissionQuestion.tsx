import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/config";
import { useState } from "react";

const FormSubmissionQuestion = ({ question,  onInputChange }: { question: Question, onInputChange: (questionId: string, response: string) => void; }) => {
  const { title, type, isRequired, options } = question;
  const [inputValue, setInputValue] = useState("");

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
    onInputChange(question.question_id ?? "", e.target.value);
  };

  const handleRadioChange = (optionId: string) => {
    setInputValue(optionId);
    onInputChange(question.question_id ?? "", optionId);
  };

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
          value={inputValue}
          onChange={handleInputChange}
          className="w-[50%] h-8 bg-transparent border-b-2 border-gray-500 outline-none hover:border-purple-600 text-base font-sans font-medium"
        />
      )}
      {type === "paragraph" && (
        <input
          type="text"
          placeholder="Your answer"
          required={isRequired}
          value={inputValue}
          onChange={handleInputChange}
          className="w-full h-8 bg-transparent border-b-2 border-gray-500 outline-none hover:border-purple-600 text-base font-sans font-medium"
        />
      )}
      {type === "multiple_choice" && (
        <RadioGroup
          className="w-full h-auto flex items-start flex-col justify-start gap-4 mt-5"
          required={isRequired}
          value={inputValue}
          onValueChange={handleRadioChange}
        >
          {options?.map((option, idx) => {
            return (
              <div className="flex items-center space-x-2" key={idx}>
                <RadioGroupItem value={option.title!} id={option.option_id} />
                <Label htmlFor={option.option_id}>{option.title}</Label>
              </div>
            );
          })}
        </RadioGroup>
      )}
    </div>
  );
};

export default FormSubmissionQuestion;
