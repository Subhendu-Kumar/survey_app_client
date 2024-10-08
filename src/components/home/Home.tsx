import {
  Select,
  SelectItem,
  SelectValue,
  SelectContent,
  SelectTrigger,
} from "@/components/ui/select";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
  TooltipProvider,
} from "@/components/ui/tooltip";
import {
  Card,
  CardTitle,
  CardHeader,
  CardContent,
  CardDescription,
} from "@/components/ui/card";
import { FormUser, User } from "@/config";
import { useEffect, useState } from "react";
import { Button } from "../ui/button";
import { Link, useNavigate } from "react-router-dom";
import { FaPlus } from "react-icons/fa6";
import { IoMdPeople } from "react-icons/io";
import { BiSolidFoodMenu } from "react-icons/bi";
import { CgMenuCheese, CgMenuGridR } from "react-icons/cg";
import { v4 as uuidv4 } from "uuid";
import { getFormByUser } from "@/api";
import moment from "moment";
import ListViewSkeleton from "../skeletonLoaders/ListViewSkeleton";
import CardViewSkeleton from "../skeletonLoaders/CardViewSkeleton";

interface HomeProps {
  user: User;
}

const Home = ({ user }: HomeProps) => {
  const [isListView, setIsListView] = useState<boolean>(false);
  const [formsData, setFormsData] = useState<FormUser[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const userId = user?.user_id;
  console.log(userId);
  const formId = uuidv4();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchFormsData = async () => {
      setIsLoading(true);
      try {
        const response = await getFormByUser();
        setFormsData(response);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchFormsData();
  }, [isListView]);

  const handleClick = (form_id: string) => {
    navigate(`/forms/preview/${form_id}`);
  };

  return (
    <div className="w-full h-auto">
      <div className="w-full h-64 bg-[#f1f6fc] flex justify-center items-center flex-col gap-3">
        <h1 className="text-xl text-black font-sans font-normal">
          Start a new form
        </h1>
        <Link to={`/forms/create/${formId}`}>
          <button className="w-40 h-40 bg-white border-blue-500 border-2 rounded-lg flex justify-center items-center flex-col">
            <FaPlus className="text-7xl text-purple-800" />
            <p className="text-base text-black font-sans font-light">
              Blank Form
            </p>
          </button>
        </Link>
      </div>
      <div className="w-full h-auto sm:px-40 px-4 pt-10">
        <div className="w-full h-auto flex items-center justify-between">
          <h1 className="text-xl text-black font-sans font-medium">
            Recent Forms
          </h1>
          <div className="flex items-center justify-center gap-3">
            <Select defaultValue="owned-by-me">
              <SelectTrigger className="w-40 border-gray-500">
                <SelectValue placeholder="owned by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="owned-by-me">Owned by me</SelectItem>
                <SelectItem value="not-owned-by-me">Not Owned by me</SelectItem>
              </SelectContent>
            </Select>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  onClick={() => setIsListView((prev) => !prev)}
                  className="max-sm:hidden"
                >
                  {isListView ? (
                    <CgMenuCheese className="text-4xl" />
                  ) : (
                    <CgMenuGridR className="text-4xl" />
                  )}
                </TooltipTrigger>
                <TooltipContent>
                  <p>toogle view</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
        <div className="w-full h-auto my-8">
          {isLoading ? (
            isListView ? (
              <div className="w-full h-auto flex flex-col items-center justify-center gap-3">
                {[...Array(6)].map((_, idx) => {
                  return <ListViewSkeleton key={idx} />;
                })}
              </div>
            ) : (
              <div className="w-full h-auto grid md:grid-cols-3 grid-cols-1 gap-3">
                {[...Array(6)].map((_, idx) => {
                  return <CardViewSkeleton key={idx} />;
                })}
              </div>
            )
          ) : isListView ? (
            <div className="w-full h-auto flex flex-col items-center justify-center gap-3">
              {[...formsData].reverse().map((data, idx) => {
                return (
                  <div
                    className="w-full h-14 rounded-full bg-transparent hover:bg-purple-100 transition-all duration-300 ease-in-out flex items-center justify-between px-6"
                    key={idx}
                  >
                    <div className="flex items-center justify-center gap-2">
                      <BiSolidFoodMenu className="text-2xl text-purple-500" />
                      <p className="text-lg font-sans font-semibold">
                        {data.title.length > 25
                          ? data.title.substring(0, 25) + "..."
                          : data.title}
                      </p>
                    </div>
                    <p className="text-sm font-normal font-sans">
                      {data.description.length > 30
                        ? data.description.substring(0, 30) + "..."
                        : data.description}
                    </p>
                    <div className="flex items-center justify-center gap-4">
                      <div className="flex items-center justify-center gap-1 leading-none">
                        <IoMdPeople className="text-lg" />
                        <p className="text-sm font-sans">
                          {moment(data.updated_at).format("MMM DD, YYYY")}
                        </p>
                      </div>
                      <Button onClick={() => handleClick(data.form_id)}>
                        View
                      </Button>
                    </div>
                  </div>
                );
              })}
            </div>
          ) : (
            <div className="w-full h-auto grid md:grid-cols-3 grid-cols-1 gap-3">
              {[...formsData].reverse().map((data, idx) => {
                return (
                  <Card
                    className="w-full h-auto border-gray-500 hover:border-purple-500"
                    key={idx}
                  >
                    <CardHeader>
                      <CardTitle className="flex items-center justify-start gap-1">
                        <BiSolidFoodMenu className="text-2xl text-purple-500" />
                        {data.title.length > 25
                          ? data.title.substring(0, 25) + "..."
                          : data.title}
                      </CardTitle>
                      <CardDescription>
                        {data.description.length > 30
                          ? data.description.substring(0, 30) + "..."
                          : data.description}
                      </CardDescription>
                    </CardHeader>
                    <CardContent className="w-full h-auto flex items-center justify-between">
                      <div className="flex items-center justify-center gap-1 leading-none">
                        <IoMdPeople className="text-lg" />
                        <p className="text-sm font-sans">
                          {moment(data.updated_at).format("MMM DD, YYYY")}
                        </p>
                      </div>
                      <Button onClick={() => handleClick(data.form_id)}>
                        View
                      </Button>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
