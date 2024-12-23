import ApiEndPoints from "@/constants/endpoint";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import { useParams } from "react-router";
import Questions from "./components/Questions";
import AnswerRecording from "./components/AnswerRecording";

const Startscreen = () => {
  const { id } = useParams();
  const { data } = useFetchData(
    ApiEndPoints.MockInterview.endPoint.replace(":id", id)
  );
  console.log(data);
  return (
    <>
      <div className="flex justify-between p-6 border w-[100%] h-[70vh]">
        <div className="min-w-[50%]">
          <Questions data={data} />
        </div>
        <div className="min-w-[50%]">
          <AnswerRecording />
        </div>
      </div>
    </>
  );
};

export default Startscreen;
