import ApiEndPoints from "@/constants/endpoint";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import { useParams } from "react-router";
import Questions from "./components/Questions";
import AnswerRecording from "./components/AnswerRecording";
import { useState } from "react";
import ErrorBoundary from "@/components/ui/ErrorBoundary/Errorboundary";

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
      <div
        className="flex flex-col md:flex-row justify-between p-10 m-12 border rounded-lg shadow-lg w-auto bg-white h-full"
        style={{ minHeight: "82vh" }}
      >
        <div className="flex-1 md:mr-4 mb-4 md:mb-0">
          <Questions
            data={data}
            handleActiveQuestion={handleActiveQuestion}
            currentQuestion={activeQuestion}
          />
        </div>
        <div className="flex-1 md:ml-4">
          <ErrorBoundary>
            <AnswerRecording
              currentQuestion={activeQuestion}
              data={data}
              handleActiveQuestion={handleActiveQuestion}
            />
          </ErrorBoundary>
        </div>
      </div>
    </>
  );
};

export default Startscreen;
