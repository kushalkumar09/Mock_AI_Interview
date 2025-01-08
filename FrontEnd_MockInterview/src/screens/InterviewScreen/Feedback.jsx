import React from "react";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import ApiEndPoints from "@/constants/endpoint";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import { CheckCircleIcon, XCircleIcon } from "lucide-react";
import { useNavigate, useParams } from "react-router";

const ErrorBoundary = ({ children }) => {
  try {
    return children;
  } catch (error) {
    return <div>Error occurred: {error.message}</div>;
  }
};

const FeedbackCard = ({ question, feedback, userAnswer, rating }) => (
  <div className="bg-white rounded-lg p-6 shadow-md border">
    <h3 className="text-2xl font-semibold text-indigo-700 mb-4">Question</h3>
    <p className="text-gray-700 mb-4">{question}</p>
    <div className="flex flex-col gap-4">
      <div
        className={`p-4 rounded-lg border ${
          rating >= 3
            ? "bg-green-100 border-green-300"
            : "bg-red-100 border-red-300"
        }`}
      >
        <p
          className={`font-medium ${
            rating >= 3 ? "text-green-700" : "text-red-700"
          }`}
        >
          Your Answer: {userAnswer}
        </p>
      </div>
      <div className="flex items-center">
        {rating >= 3 ? (
          <CheckCircleIcon className="w-6 h-6 text-green-500 mr-2" />
        ) : (
          <XCircleIcon className="w-6 h-6 text-red-500 mr-2" />
        )}
        <p className="text-gray-700">{feedback}</p>
      </div>
    </div>
  </div>
);

const Feedback = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const { data, loading, error } = useFetchData(
    ApiEndPoints.GetInterviewFeedback.endPoint.replace(":id", id)
  );

  const { data: interviewData } = useFetchData(
    ApiEndPoints.MockInterview.endPoint.replace(":id", id)
  );

  if (loading) return <div>Loading...</div>;
  if (error || !data?.data) return <div>Error fetching feedback data.</div>;

  const feedbackData = data.data;
  const score = feedbackData.filter((q) => q.rating >= 3).length;
  const totalQuestions = 5;

  return (
    <ErrorBoundary>
      <div className="w-full max-w-6xl mx-auto p-10 bg-gray-100 rounded-lg shadow-lg">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-indigo-700 mb-4">
            🎉 Congratulations!
          </h1>
          <p className="text-lg text-gray-600">
            You have completed your mock interview!
          </p>
        </div>

        <div className="flex flex-wrap justify-around gap-6 mb-10">
          <div className="bg-blue-50 p-6 rounded-lg shadow-md w-full md:w-1/2">
            <h2 className="text-3xl font-bold text-indigo-700 mb-4">
              Your Score
            </h2>
            <p className="text-2xl font-semibold text-gray-700">
              {score} / {totalQuestions}
            </p>
            <div className="w-full bg-gray-300 rounded-full h-4 mt-4">
              <div
                className="bg-indigo-600 h-4 rounded-full"
                style={{ width: `${(score / totalQuestions) * 100}%` }}
              ></div>
            </div>
          </div>

          {interviewData && (
            <div className="bg-white p-6 rounded-lg shadow-md w-full md:w-1/3">
              <h2 className="text-3xl font-bold text-indigo-700 mb-6">
                Interview Details
              </h2>
              <p className="text-lg text-gray-600">
                Job Position: {interviewData.JobPosition}
              </p>
              <p className="text-lg text-gray-600">
                Job Description: {interviewData.JobDescription}
              </p>
            </div>
          )}
        </div>

        <ScrollArea className="h-[60vh] overflow-auto border border-gray-200 p-6 rounded-lg shadow-lg bg-white">
          <div className="space-y-6">
            {feedbackData.length > 0 ? (
              feedbackData.map((q, index) => (
                <FeedbackCard key={q._id} {...q} />
              ))
            ) : (
              <div className="text-center py-10">
                <h2 className="text-xl font-semibold text-gray-800 mb-4">
                  No Answers Submitted
                </h2>
                <p className="text-gray-600">
                  Please attempt the test again to receive feedback.
                </p>
                <button
                  className="mt-6 px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition duration-300"
                  onClick={() => navigate("/mock-test")}
                >
                  Retake Test
                </button>
              </div>
            )}
          </div>
        </ScrollArea>

        <Button
          className="mt-6 w-full bg-blue-600 text-white p-4 rounded-lg shadow-lg hover:bg-blue-700"
          onClick={() => navigate("/dashboard")}
        >
          Go To Dashboard
        </Button>
      </div>
    </ErrorBoundary>
  );
};

export default Feedback;
