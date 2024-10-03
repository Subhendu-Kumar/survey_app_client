import {
  QuestionType,
  FormQuestionProps,
  DEFAULT_OPTION_TITLE,
} from "@/config";
import { RxCross2 } from "react-icons/rx";
import { FaRegCircle } from "react-icons/fa6";
import { MdContentCopy } from "react-icons/md";
import { Switch } from "@/components/ui/switch";
import { RiDeleteBin6Line } from "react-icons/ri";
import { FC, useEffect, useRef, useState } from "react";

const FormQuestion: FC<FormQuestionProps> = ({
  question,
  onChange,
  onDelete,
  addQuestion,
}) => {
  const ref = useRef(null);
  const [isEditable, setIsEditable] = useState<boolean>(false);
  // const [options, setOptions] = useState<string[]>([DEFAULT_OPTION_TITLE]);
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

  // const handleOptionChange = (index: number, value: string) => {
  //   const newOptions = [...options];
  //   newOptions[index] = value;
  //   setOptions(newOptions);
  //   onChange({ ...question, options: newOptions });
  // };

  const handleOptionChange = (index: number, value: string) => {
    const newOptions = [...(question.options || [])]; // Access options from the question object
    newOptions[index] = value; // Update the option at the given index
    onChange({ ...question, options: newOptions }); // Pass updated question with new options to parent
  };

  // const addOption = () => {
  //   setOptions((prev: string[]) => [...prev, DEFAULT_OPTION_TITLE]);
  // };
  const addOption = () => {
    const newOptions = [...(question.options || []), DEFAULT_OPTION_TITLE];
    onChange({ ...question, options: newOptions });
  };

  // const deleteOption = (index: number) => {
  //   setOptions((prev) => prev.filter((_, i) => i !== index));
  // };

  const deleteOption = (index: number) => {
    const newOptions = (question.options || []).filter((_, i) => i !== index);
    onChange({ ...question, options: newOptions });
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
          <select
            value={question.type}
            onChange={(e) => handleTypeChange(e.target.value as QuestionType)}
            className="w-fit px-3 py-2 rounded-lg border border-gray-500 bg-purple-200"
          >
            <option value="multiple_choice">Multiple Choice</option>
            <option value="short_text">Short Text</option>
            <option value="paragraph">Paragraph</option>
          </select>
        )}
      </div>
      {(question.type === "short_text" || question.type === "paragraph") && (
        <div className="w-full h-auto mt-4 flex flex-col items-start justify-start gap-2">
          <div
            className={`${
              question.type === "paragraph" ? "w-[70%]" : "w-[50%]"
            } h-auto flex items-center justify-start gap-2`}
          >
            <p className="w-full text-left p-1 text-lg font-sans font-medium text-gray-700 border-b border-gray-500">
              {question.type === "short_text" && "short answer text"}
              {question.type === "paragraph" && "long answer text"}
            </p>
          </div>
        </div>
      )}
      {question.type === "multiple_choice" && (
        <div className="w-full h-auto mt-4 flex flex-col items-start justify-start gap-2">
          {(question.options || []).map((option, index) => (
            <div
              key={index}
              className="w-full h-auto flex items-center justify-between gap-2"
            >
              <div className="flex items-center justify-start gap-2 w-[90%]">
                <FaRegCircle className="text-lg" />
                <input
                  type="text"
                  className={`w-full h-auto bg-transparent outline-none ${
                    isEditable && "hover:border-b hover:border-gray-500"
                  }  px-3 py-2`}
                  value={option}
                  onChange={(e) => handleOptionChange(index, e.target.value)}
                />
              </div>
              {isEditable && (
                <button
                  className="w-10 h-10 bg-transparent flex items-center justify-center text-xl rounded-full hover:bg-gray-200"
                  onClick={() => deleteOption(index)}
                >
                  <RxCross2 />
                </button>
              )}
            </div>
          ))}
          {isEditable && (
            <div className="w-full h-auto flex items-center justify-start gap-2 mt-4">
              <FaRegCircle className="text-lg" />
              <button
                className="w-fit h-auto px-2 py-1 bg-transparent hover:bg-purple-300 rounded-md transition-all duration-300 ease-in-out text-base font-sans font-medium"
                onClick={addOption}
              >
                Add Option
              </button>
            </div>
          )}
        </div>
      )}
      {isEditable && (
        <div className="w-full h-auto mt-10 border-t border-gray-500 pt-5 flex items-center justify-end gap-4">
          <button
            className="w-12 h-12 bg-transparent flex items-center justify-center text-2xl rounded-full hover:bg-gray-200"
            onClick={addQuestion}
          >
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
