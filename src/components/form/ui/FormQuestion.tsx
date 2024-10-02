import {
  Select,
  SelectItem,
  SelectValue,
  SelectTrigger,
  SelectContent,
} from "@/components/ui/select";
import { MdContentCopy } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { RiDeleteBin6Line } from "react-icons/ri";
import React, { useEffect, useRef, useState } from "react";
import { Question, QuestionType } from "../SetQuestions";

interface FormQuestionProps {
  question: Question;
  onChange: (question: Question) => void;
  onDelete: () => void;
}

const FormQuestion: React.FC<FormQuestionProps> = ({
  question,
  onChange,
  onDelete,
}) => {
  const ref = useRef(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        ref.current &&
        !(ref.current as HTMLElement).contains(event.target as Node)
      ) {
        setIsEditable(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange({ ...question, title: e.target.value });
  };

  const handleTypeChange = (value: QuestionType) => {
    onChange({ ...question, type: value });
  };

  const handleIsRequiredChange = (checked: boolean) => {
    onChange({ ...question, isRequired: checked });
  };

  return (
    <div
      ref={ref}
      onClick={() => setIsEditable(true)}
      className="w-full h-auto bg-purple-100 cursor-pointer rounded-xl p-6 flex items-center justify-center flex-col gap-2"
    >
      <div className="w-full h-auto flex items-center justify-between">
        {isEditable ? (
          <input
            type="text"
            className="w-[70%] h-10 bg-purple-200 outline-none border-b border-gray-500 px-3 text-xl font-sans font-semibold placeholder:text-lg placeholder:font-sans placeholder:font-normal"
            placeholder="Question"
            value={question.title}
            onChange={handleInputChange}
          />
        ) : (
          <p className="text-xl font-sans font-medium">
            {question.title}
            <span className="text-lg text-red-500">
              {question.isRequired && "*"}
            </span>
          </p>
        )}
        {isEditable && (
          <Select value={question.type} onValueChange={handleTypeChange}>
            <SelectTrigger className="w-40 border-gray-500 bg-purple-200">
              <SelectValue placeholder="owned by" />
            </SelectTrigger>
            <SelectContent className="bg-purple-200">
              <SelectItem value="multiple-choice">multiple choice</SelectItem>
              <SelectItem value="short-text">short text</SelectItem>
              <SelectItem value="paragraph">paragraph</SelectItem>
            </SelectContent>
          </Select>
        )}
      </div>
      {/* add option for multiple choice */}
      {isEditable && (
        <div className="w-full h-auto mt-5 border-t border-gray-500 pt-5 flex items-center justify-end gap-4">
          <button className="w-12 h-12 bg-transparent flex items-center justify-center text-2xl rounded-full hover:bg-gray-200">
            <MdContentCopy />
          </button>
          <button
            className="w-12 h-12 bg-transparent flex items-center justify-center text-2xl rounded-full hover:bg-gray-200"
            onClick={onDelete}
          >
            <RiDeleteBin6Line />
          </button>
          <div className="flex items-center justify-center gap-2">
            <p className="text-lg font-normal font-sans">Required ?</p>
            <Switch
              checked={question.isRequired}
              className="shadow-2xl border-gray-500 border"
              onCheckedChange={handleIsRequiredChange}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default FormQuestion;
