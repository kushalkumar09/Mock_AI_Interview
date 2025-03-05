"use client"
import { Button } from "@/components/ui/button"
import { ScrollArea } from "@/components/ui/scroll-area"
import ApiEndPoints from "@/constants/endpoint"
import useFetchData from "@/hooks/Apihooks/useApiResponse"
import { CheckCircle, XCircle, Award, Briefcase, FileText } from "lucide-react"
import { useNavigate, useParams } from "react-router"
import Loader from "../home/componentsHome/Loader"

const ErrorBoundary = ({ children }) => {
  try {
    return children
  } catch (error) {
    return <div className="text-red-500 p-4">Error occurred: {error.message}</div>
  }
}

const FeedbackCard = ({ question, feedback, userAnswer, rating }) => (
  <div className="bg-white rounded-md p-5 shadow-sm border border-gray-100 transition-all hover:shadow-md">
    <h3 className="text-lg font-medium text-gray-800 mb-3">Question</h3>
    <p className="text-gray-600 mb-4 text-sm">{question}</p>

    <div className="space-y-3">
      <div
        className={`p-3 rounded-md ${
          rating >= 3 ? "bg-green-50 border border-green-100" : "bg-red-50 border border-red-100"
        }`}
      >
        <p className={`text-sm ${rating >= 3 ? "text-green-700" : "text-red-700"}`}>
          <span className="font-medium">Your Answer:</span> {userAnswer}
        </p>
      </div>

      <div className="flex items-start gap-2 text-sm">
        {rating >= 3 ? (
          <CheckCircle className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
        ) : (
          <XCircle className="w-5 h-5 text-red-500 mt-0.5 flex-shrink-0" />
        )}
        <p className="text-gray-600">{feedback}</p>
      </div>
    </div>
  </div>
)

const Feedback = () => {
  const { id } = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useFetchData(ApiEndPoints.GetInterviewFeedback.endPoint.replace(":id", id))

  const { data: interviewData } = useFetchData(ApiEndPoints.MockInterview.endPoint.replace(":id", id))

  if (loading)
    return (
      <Loader />
    )

  if (error || !data?.data)
    return (
      <div className="flex items-center justify-center h-screen">
        <div className="text-red-500">Error fetching feedback data.</div>
      </div>
    )

  const feedbackData = data.data
  const score = feedbackData.filter((q) => q.rating >= 3).length
  const totalQuestions = 5
  const scorePercentage = (score / totalQuestions) * 100

  return (
    <ErrorBoundary>
      <div className="max-w-6xl mt-4 mx-auto p-6 bg-white rounded-lg shadow-sm">
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold text-gray-800 mb-2">Interview Feedback</h1>
          <p className="text-gray-500 text-sm">Your mock interview results are ready</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
          <div className="bg-gray-50 p-5 rounded-md col-span-2">
            <div className="flex items-center gap-3 mb-4">
              <Award className="w-5 h-5 text-blue-500" />
              <h2 className="text-lg font-medium text-gray-800">Your Score</h2>
            </div>

            <div className="flex items-end gap-2 mb-3">
              <span className="text-3xl font-bold text-gray-800">{score}</span>
              <span className="text-gray-500 pb-1">/ {totalQuestions}</span>
            </div>

            <div className="w-full bg-gray-200 rounded-full h-2">
              <div
                className={`h-2 rounded-full ${scorePercentage >= 60 ? "bg-green-500" : "bg-orange-500"}`}
                style={{ width: `${scorePercentage}%` }}
              ></div>
            </div>
          </div>

          {interviewData && (
            <div className="bg-gray-50 p-5 rounded-md">
              <div className="flex items-center gap-3 mb-4">
                <Briefcase className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-medium text-gray-800">Position</h2>
              </div>
              <p className="text-gray-600 text-sm mb-3">{interviewData.JobPosition}</p>

              <div className="flex items-center gap-3 mb-2">
                <FileText className="w-5 h-5 text-blue-500" />
                <h2 className="text-lg font-medium text-gray-800">Description</h2>
              </div>
              <p className="text-gray-600 text-sm line-clamp-3">{interviewData.JobDescription}</p>
            </div>
          )}
        </div>

        <div className="mb-2 flex items-center justify-between">
          <h2 className="text-lg font-medium text-gray-800">Detailed Feedback</h2>
          <span className="text-sm text-gray-500">{feedbackData.length} questions</span>
        </div>

        <ScrollArea className="h-[400px] pr-4">
          <div className="space-y-4">
            {feedbackData.length > 0 ? (
              feedbackData.map((q) => <FeedbackCard key={q._id} {...q} />)
            ) : (
              <div className="text-center py-10 bg-gray-50 rounded-md">
                <h2 className="text-lg font-medium text-gray-800 mb-2">No Answers Submitted</h2>
                <p className="text-gray-500 text-sm mb-4">Please attempt the test again to receive feedback.</p>
                <Button
                  className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition-colors"
                  onClick={() => navigate(`/interview/${id}/start`)}
                >
                  Retake Test
                </Button>
              </div>
            )}
          </div>
        </ScrollArea>

        <div className="mt-6 flex justify-end">
          <Button
            className="px-4 py-2 bg-gray-800 text-white rounded-md hover:bg-gray-900 transition-colors"
            onClick={() => navigate("/dashboard")}
          >
            Back to Dashboard
          </Button>
        </div>
      </div>
    </ErrorBoundary>
  )
}

export default Feedback

