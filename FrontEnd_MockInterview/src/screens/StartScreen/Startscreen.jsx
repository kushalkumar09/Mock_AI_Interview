import ApiEndPoints from "@/constants/endpoint";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import { useParams } from "react-router";
import Questions from "./components/Questions";
import AnswerRecording from "./components/AnswerRecording";
import { useState } from "react";

const Startscreen = () => {
  //getting the id to make a fetch request using useFetchData hook
  const { id } = useParams();
  const { data } = useFetchData(
    ApiEndPoints.MockInterview.endPoint.replace(":id", id)
  );

  const [activeQuestion, setActiveQuestion] = useState(0);
  
  const handleActiveQuestion = (index) => {
    setActiveQuestion(index);
  };

  return (
    <>
      <div className="flex justify-between p-6 border w-[100%] h-[70vh]">
        <div className="min-w-[50%]">
          <Questions
            data={data}
            handleActiveQuestion={handleActiveQuestion}
            currentQuestion={activeQuestion}
          />
        </div>
        <div className="min-w-[50%]">
          <AnswerRecording currentQuestion={activeQuestion} data={data} />
        </div>
      </div>
    </>
  );
};

export default Startscreen;
