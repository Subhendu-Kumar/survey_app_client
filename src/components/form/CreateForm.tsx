import { FaQuestion } from "react-icons/fa6";
import SetQuestions from "./SetQuestions";
import { useParams } from "react-router-dom";

const CreateForm = () => {
  // const navigate = useNavigate();
  // const location = useLocation();
  // const queryParams = new URLSearchParams(location.search);
  // const initialTab = queryParams.get("tab") || "set-questions";
  // const [tab, setTab] = useState(initialTab);
  // useEffect(() => {
  //   const currentTab = queryParams.get("tab");
  //   if (currentTab !== tab) {
  //     queryParams.set("tab", tab);
  //     if (currentTab !== tab) {
  //       navigate(`${location.pathname}?${queryParams.toString()}`, {
  //         replace: true,
  //       });
  //     }
  //   }
  // }, [tab, navigate, location.pathname]);

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
