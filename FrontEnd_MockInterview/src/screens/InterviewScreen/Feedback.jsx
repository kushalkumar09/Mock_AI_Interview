import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ApiEndPoints from "@/constants/endpoint";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import React from "react";
import { useNavigate, useParams } from "react-router";

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { data, loading, error } = useFetchData(
    ApiEndPoints.GetInterviewFeedback.endPoint.replace(":id", id)
  );
  const { data: interviewData } = useFetchData(
    ApiEndPoints.MockInterview.endPoint.replace(":id", id)
  );

  console.log(interviewData);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !data?.data) {
    return <div>Error fetching feedback data.</div>;
  }

  const feedbackData = data.data;
  const score = feedbackData.filter((q) => q.rating >= 3).length;
  const totalQuestions = feedbackData.length;

  return (
    <div className="w-full min-w-4xl mx-auto p-10 bg-gradient-to-br from-white to-indigo-200 shadow-xl">
      <div className="text-center mb-6">
        <h1 className="text-4xl md:text-5xl font-extrabold text-gray-800 mb-4">
          🎉 <span className="text-blue-600">Congratulations!</span>
        </h1>
        <p className="text-md md:text-lg text-gray-600">
          You've successfully completed your mock interview. Here's your
          detailed feedback:
        </p>
      </div>

      <div className="flex items-center justify-around">
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 rounded-2xl p-5 mb-12 w-1/2">
          <h2 className="text-2xl md:text-3xl font-bold text-indigo-700 mb-2">
            Interview Summary
          </h2>
          <div className="flex justify-between items-centermb-2">
            <p className="text-lg text-gray-700">Your Score:</p>
            <p className="text-3xl md:text-4xl font-extrabold text-blue-500">
              {score} / {totalQuestions}
            </p>
          </div>
          <div className="w-full bg-gray-300 rounded-full h-4">
            <div
              className="bg-indigo-600 h-4 rounded-full transition-all"
              style={{
                width: `${(score / totalQuestions) * 100}%`,
              }}
            ></div>
          </div>
        </div>
        {interviewData && (
          <div className="bg-gradient-to-br w-1/3 from-white to-gray-50 shadow-lg rounded-xl p-6 mb-12  mx-auto">
            <h2 className="text-3xl font-bold text-indigo-800 mb-6 pb-2 border-b border-gray-200">
              Interview Details
            </h2>
            <div className="space-y-6">
              <div>
                <h3 className="text-xl font-semibold text-gray-900 uppercase mb-2">
                  Job Position
                </h3>
                <p className="text-sm font-medium text-gray-600">
                  {interviewData.JobPosition}
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900 uppercase mb-2">
                  Job Description
                </h3>
                <p className="text-sm font-medium text-gray-600 ">
                  {interviewData.JobDescription}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>

      <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
        <div className="space-y-8">
          {feedbackData.map((q, index) => (
            <div key={q._id} className="bg-white rounded-2xl p-6 shadow-md">
              <h3 className="text-2xl font-semibold text-indigo-700 mb-4">
                Question {index + 1}
              </h3>
              <p className="text-gray-700 mb-6">{q.question}</p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                <div className="bg-green-100 p-4 rounded-lg border border-green-200">
                  <p className="font-medium text-green-800 mb-2">Feedback:</p>
                  <p className="text-green-700">{q.feedback}</p>
                </div>
                <div
                  className={`p-4 rounded-lg border ${
                    q.rating >= 3
                      ? "bg-green-100 border-green-200"
                      : "bg-red-100 border-red-200"
                  }`}
                >
                  <p
                    className={`font-medium mb-2 ${
                      q.rating >= 4 ? "text-green-800" : "text-red-800"
                    }`}
                  >
                    Your Answer:
                  </p>
                  <p
                    className={`${
                      q.rating >= 4 ? "text-green-700" : "text-red-700"
                    }`}
                  >
                    {q.userAnswer}
                  </p>
                </div>
              </div>

              <div className="flex items-start">
                {q.rating >= 3 ? (
                  <CheckCircleIcon className="w-6 h-6 text-green-500 mr-3" />
                ) : (
                  <XCircleIcon className="w-6 h-6 text-red-500 mr-3" />
                )}
                <p className="text-gray-600">{q.feedback}</p>
              </div>
            </div>
          ))}
        </div>
      </ScrollArea>
      <Button
        className="bg-blue-600 text-white hover:bg-blue-700 mt-2 p-6 rounded-lg shadow-md text-lg font-semibold"
        onClick={() => navigate("/dashboard")}
      >
        Go To DashBoard
      </Button>
    </div>
  );
};

export default Feedback;
