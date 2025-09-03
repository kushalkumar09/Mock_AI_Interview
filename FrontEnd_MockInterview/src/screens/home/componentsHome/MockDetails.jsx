"use client"
import { useState, useEffect } from "react"
import { useNavigate } from "react-router"
import { Loader2 } from "lucide-react"
import ApiEndPoints from "@/constants/endpoint"
import { InputFormDetails } from "@/constants/InputConstants"
import { usePromptResponse } from "@/hooks/Apihooks/usePromptResponse"
import { Button } from "@/components/ui/button"

const MockDetails = ({ onClose }) => {
  const [promptData, setPromptData] = useState({
    JobPosition: "",
    JobDescription: "",
    YearOfExperience: "",
  })
  const [isValid, setIsValid] = useState(false)

  const { endPoint, method } = ApiEndPoints.AiResponse
  const { response, loading, fetchData, error, mockId } = usePromptResponse(endPoint, method)
  const [mockInterview, setMockInterview] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    if (response && Array.isArray(response) && response.length > 0) {
      setMockInterview(response)
    } else if (error) {
    // Clear old questions if an error happens
    setMockInterview([]);
  }
  }, [response, error])

  useEffect(() => {
    const isFormValid =
      promptData.JobPosition.trim() !== "" &&
      promptData.JobDescription.trim() !== "" &&
      !isNaN(promptData.YearOfExperience) &&
      Number(promptData.YearOfExperience) > 0

    setIsValid(isFormValid)
  }, [promptData])

  const handleButton = (e) => {
    e.preventDefault()
    if (isValid) {
      fetchData(promptData)
    }
  }

  const handleInputFields = (e, i) => {
    const { name, value } = e.target
    setPromptData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  if (mockInterview?.length > 0 && mockId) {
    navigate(`/interview/${mockId}`)
  }

  return (
    <div className="w-full max-w-2xl mx-auto bg-white rounded-sm shadow-lg overflow-hidden transition-all duration-300">
      <div className="bg-background p-6">
        <h1 className="text-2xl font-bold text-white">Mock Interview Setup</h1>
        <p className="text-violet-100 mt-1">Prepare for your next opportunity</p>
      </div>

      <div className="p-6">
        <form className="space-y-5">
          {InputFormDetails.map((item, i) => (
            <div className="space-y-1.5" key={i}>
              <label htmlFor={`${item.name}_${i}`} className="block text-sm font-medium text-gray-700">
                {item.title}
              </label>
              <input
                id={`${item.name}_${i}`}
                type={item.name === "YearOfExperience" ? "number" : "text"}
                name={item.name}
                placeholder={item.placeHolderData}
                required={true}
                onChange={(e) => handleInputFields(e, i)}
                value={promptData[item.name]}
                className="w-full px-4 py-2.5 rounded-lg border border-gray-300 focus:ring-2 focus:ring-violet-500 focus:border-violet-500 text-background transition-colors duration-200"
              />
            </div>
          ))}

          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error}</p>
            </div>
          )}

          <div className="flex gap-3 pt-2">
            <Button
            variant="outline"
              onClick={handleButton}
              disabled={!isValid || loading}
              className={`flex-1 py-2.5 px-4 rounded-lg font-medium transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                isValid && !loading
                  ? " hover:bg-green-600 text-white focus:ring-violet-500"
                  : " bg-gray-200 text-gray-500 cursor-not-allowed"
              }`}
            >
              {loading ? (
                <span className="flex items-center justify-center">
                  <Loader2 className="animate-spin mr-2 h-4 w-4" />
                  Preparing...
                </span>
              ) : (
                "Start Interview"
              )}
            </Button>

            <Button
              type="button"
              onClick={onClose}
              className="flex-1 py-2.5 px-4 bg-white border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
            >
              Cancel
            </Button>
          </div>
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">
                {error.includes("overloaded")
                  ? "Our AI service is currently overloaded. Please wait a moment and try again."
                  : error.includes("Too many requests")
                    ? "You are sending too many requests. Please slow down."
                    : error}
              </p>
            </div>
          )}
        </form>

        {mockInterview?.length > 0 && (
          <div className="mt-8 space-y-4">
            <div className="flex items-center space-x-2">
              <div className="h-px flex-1 bg-gray-200"></div>
              <h2 className="text-lg font-medium text-gray-900">Interview Questions</h2>
              <div className="h-px flex-1 bg-gray-200"></div>
            </div>

            <div className="space-y-3">
              {mockInterview.map((ques, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-violet-50 border border-violet-100 rounded-lg hover:shadow-md transition-all duration-200"
                >
                  <p className="text-gray-800">{ques.question}</p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
      {/* {(error || fetchError) && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-600 text-sm">{error || fetchError}</p>
            </div>
          )} */}
    </div>
  )
}

export default MockDetails

