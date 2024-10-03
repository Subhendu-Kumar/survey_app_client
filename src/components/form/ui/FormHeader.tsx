import { useState } from "react";
import { MdEdit } from "react-icons/md";
import { IoIosSave } from "react-icons/io";

const FormHeader = ({
  title,
  setTitle,
  description,
  setDescription,
}: {
  title: string;
  description: string;
  setTitle: (title: string) => void;
  setDescription: (description: string) => void;
}) => {
  const [isTitleEditable, setIsTitleEditable] = useState<boolean>(false);
  const [isDescriptionEditable, setIsDescriptionEditable] =
    useState<boolean>(false);

  return (
    <div className="w-full h-auto bg-purple-100 border-t-8 border-purple-600 rounded-xl p-6">
      <button className="w-full relative h-auto flex items-center justify-start">
        <button
          className="absolute top-0 right-0 w-6 h-6 flex items-center justify-start text-xl"
          onClick={() => setIsTitleEditable((prev) => !prev)}
        >
          {isTitleEditable ? <IoIosSave /> : <MdEdit />}
        </button>
        {isTitleEditable ? (
          <div className="w-[95%] h-12">
            <input
              type="text"
              className="w-full h-full bg-transparent outline-none border border-gray-400 rounded-xl px-3 text-3xl font-sans font-semibold"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>
        ) : (
          <p className="w-[95%] text-left text-4xl font-sans font-semibold">
            {title}
          </p>
        )}
      </button>
      <div className="border-t-2 border-purple-600 w-full mt-2" />
      <button className="w-full relative h-auto flex items-center justify-start mt-3">
        <button
          className="absolute top-0 right-0 w-6 h-6 flex items-center justify-start text-xl"
          onClick={() => setIsDescriptionEditable((prev) => !prev)}
        >
          {isDescriptionEditable ? <IoIosSave /> : <MdEdit />}
        </button>
        {isDescriptionEditable ? (
          <div className="w-[95%] h-10">
            <input
              type="text"
              className="w-full h-full bg-transparent outline-none border border-gray-400 rounded-xl px-3 text-xl font-sans font-normal"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>
        ) : (
          <p className="text-xl font-sans font-normal">{description}</p>
        )}
      </button>
    </div>
  );
};

export default FormHeader;
