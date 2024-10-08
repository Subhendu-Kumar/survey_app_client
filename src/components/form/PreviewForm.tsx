import { useEffect, useState } from "react";
import { FaRectangleList, FaShare } from "react-icons/fa6";
import { MdOutlineStreetview } from "react-icons/md";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import FormSubmissionWindow from "./FormSubmissionWindow";
import Responses from "./Responses";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";
import { useToast } from "@/hooks/use-toast";

const PreviewForm = () => {
  const navigate = useNavigate();
  const { toast } = useToast();
  const location = useLocation();
  const { id: formId } = useParams<{ id: string }>();
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

  const handleCopy = async () => {
    const url = `${window.location.origin}/forms/submission/${formId}`;
    try {
      await navigator.clipboard.writeText(url);
      toast({
        title: "Success",
        description:
          "Link copied to clipboard! now u can share the link with any one",
        duration: 3000,
      });
    } catch (err) {
      console.log(err);
      toast({
        title: "Error",
        description: "Failed to copy link",
        duration: 3000,
      });
    }
  };

  return (
    <div className="w-full h-auto relative">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger
            className="w-fit h-auto p-4 bottom-8 right-8 fixed rounded-full text-black/[0.6] transition-all duration-300 ease-in-out bg-gray-200 flex items-center justify-center text-2xl hover:bg-gray-300"
            onClick={handleCopy}
          >
            <FaShare />
          </TooltipTrigger>
          <TooltipContent>
            <p>Click to copy sharable link</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
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
