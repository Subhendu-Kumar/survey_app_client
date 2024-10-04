import { useEffect, useState } from "react";
import { FaRectangleList } from "react-icons/fa6";
import { MdOutlineStreetview } from "react-icons/md";
import { useLocation, useNavigate } from "react-router-dom";
import FormSubmissionWindow from "./FormSubmissionWindow";
import Responses from "./Responses";

const PreviewForm = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const initialTab = queryParams.get("tab") || "preview";
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
    <div className="w-full h-auto">
      <div className="w-full h-auto flex items-center justify-center mt-6">
        <div className="w-auto h-auto p-2 flex items-center justify-center gap-3">
          <button
            className={`w-fit px-3 py-1 rounded-md ${
              tab === "preview"
                ? "bg-purple-400"
                : "hover:bg-purple-200 hover:border-b hover:border-purple-500"
            }  text-lg font-sans font-semibold flex items-center justify-center gap-2`}
            onClick={() => setTab("preview")}
          >
            <MdOutlineStreetview />
            Form preview
          </button>
          <button
            className={`w-fit px-3 py-1 rounded-md ${
              tab === "response"
                ? "bg-purple-400"
                : "hover:bg-purple-200 hover:border-b hover:border-purple-500"
            } text-lg font-sans font-semibold flex items-center justify-center gap-2`}
            onClick={() => setTab("response")}
          >
            <FaRectangleList />
            Form response
          </button>
        </div>
      </div>
      <div className="w-full h-auto mt-6">
        {tab === "preview" && <FormSubmissionWindow />}
        {tab === "response" && <Responses />}
      </div>
    </div>
  );
};

export default PreviewForm;
