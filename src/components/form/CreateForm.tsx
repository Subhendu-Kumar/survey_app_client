import { LucideArrowRightLeft } from "lucide-react";
import { useEffect, useState } from "react";
import { FaQuestion } from "react-icons/fa6";
import SetQuestions from "./SetQuestions";
import Responses from "./Responses";
import { useLocation, useNavigate } from "react-router-dom";

const CreateForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "set-questions";
  const [tab, setTab] = useState(initialTab);
  useEffect(() => {
    const currentTab = queryParams.get("tab");
    if (currentTab !== tab) {
      queryParams.set("tab", tab);
      if (currentTab !== tab) {
        navigate(`${location.pathname}?${queryParams.toString()}`, {
          replace: true,
        });
      }
    }
  }, [tab, navigate, location.pathname]);

  return (
    <div className="w-full h-auto px-56">
      <div className="w-full h-10 mt-6 flex items-center justify-center">
        <div className="w-auto h-12 bg-gray-200 rounded-xl flex items-center justify-center gap-2 p-2">
          <button
            className={`w-fit h-full rounded-lg flex items-center justify-center gap-2 py-1 px-3 transition-all duration-300 ease-in-out ${
              tab === "set-questions" ? "bg-purple-500" : "hover:bg-purple-200"
            }`}
            onClick={() => setTab("set-questions")}
          >
            <FaQuestion className="text-lg" />
            <p className="text-base font-semibold">Questions</p>
          </button>
          <button
            className={`w-fit h-full rounded-lg flex items-center justify-center gap-2 py-1 px-3 transition-all duration-300 ease-in-out ${
              tab === "responses" ? "bg-purple-500" : "hover:bg-purple-200"
            }`}
            onClick={() => setTab("responses")}
          >
            <LucideArrowRightLeft className="text-lg" />
            <p className="text-base font-semibold">Responses</p>
          </button>
        </div>
      </div>
      {tab === "set-questions" && <SetQuestions />}
      {tab === "responses" && <Responses />}
    </div>
  );
};

export default CreateForm;
