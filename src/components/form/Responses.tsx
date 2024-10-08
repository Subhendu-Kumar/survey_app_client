import { getResponses } from "@/api";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Results } from "@/config";
import { useToast } from "@/hooks/use-toast";
import moment from "moment";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import ResponseSkeleton from "../skeletonLoaders/ResponseSkeleton";

const Responses = () => {
  const { toast } = useToast();
  const { id: formId } = useParams<{ id: string }>();
  const [responses, setResponses] = useState<Results | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!formId) {
        toast({
          title: "Form ID not found",
          variant: "destructive",
        });
        return;
      }
      setIsLoading(true);
      try {
        const res = await getResponses(formId);
        setResponses(res);
      } catch (error) {
        console.log(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [formId, toast]);

  return (
    <div className="w-full h-auto px-10">
      {isLoading ? (
        <ResponseSkeleton />
      ) : (
        <Table className="border border-gray-300">
          <TableHeader className="text-base font-sans font-semibold text-black">
            <TableRow>
              <TableHead className="w-[300px]">Response ID</TableHead>
              <TableHead>Submitted At</TableHead>
              {responses?.result?.questions.map((data, idx) => {
                return <TableHead key={idx}>{data.question_text}</TableHead>;
              })}
            </TableRow>
          </TableHeader>
          <TableBody>
            {responses?.result?.responses.map((data, idx) => {
              return (
                <TableRow key={idx}>
                  <TableCell className="">{data.response_id}</TableCell>
                  <TableCell>
                  {moment(data.submitted_at).format("MMM DD, YYYY, h:mm A")}
                  </TableCell>
                  {data.answers.map((data, idx) => {
                    return <TableCell key={idx}>{data.answer_text}</TableCell>;
                  })}
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      )}
    </div>
  );
};

export default Responses;
