import ApiEndPoints from "@/constants/endpoint";
import { InputFormDetails } from "@/constants/InputConstants";
import { usePromptResponse } from "@/hooks/Apihooks/usePromptResponse";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router";

const MockDetails = ({ onClose }) => {
  const [promptData, setPromptData] = useState({
    JobPosition: "",
    JobDescription: "",
    YearOfExperience: "",
  });
  const [isValid, setIsValid] = useState(false); // New state for button validation

  const { endPoint, method } = ApiEndPoints.AiResponse;
  const { response, loading, fetchData, error, mockId } = usePromptResponse(
    endPoint,
    method
  );
  const [mockInterview, setMockInterview] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (response) {
      setMockInterview(response);
    }
  }, [response, mockId]);

  useEffect(() => {
    // Validation Logic: Enable the button only if all fields are valid
    const isFormValid =
      promptData.JobPosition.trim() !== "" &&
      promptData.JobDescription.trim() !== "" &&
      !isNaN(promptData.YearOfExperience) &&
      Number(promptData.YearOfExperience) > 0;

    setIsValid(isFormValid);
  }, [promptData]);

  const handleButton = (e) => {
    e.preventDefault();
    if (isValid) {
      fetchData(promptData);
    }
  };

  const handleInputFields = (e, i) => {
    const { name, value } = e.target;
    setPromptData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  if (mockInterview?.length > 0 && mockId) {
    navigate(`/interview/${mockId}`);
  }

  return (
    <div className="max-w-2xl mx-auto p-8 bg-white rounded-lg shadow-xl">
      <h1 className="text-3xl font-bold text-center mb-6 text-gray-800">
        Mock Interview Details
      </h1>
      <form className="space-y-6">
        {InputFormDetails.map((item, i) => (
          <div className="flex flex-col" key={i}>
            <label
              htmlFor={`${item.name}_${i}`}
              className="text-sm font-medium text-gray-600 mb-2"
            >
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
              className="mt-2 px-4 py-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 placeholder-gray-500"
            />
          </div>
        ))}

        <div className="flex justify-center">
          <button
            onClick={handleButton}
            disabled={!isValid || loading}
            className={`w-full py-3 px-6 font-semibold rounded-lg transition-all duration-300 focus:outline-none 
              ${isValid ? "bg-indigo-600 text-white hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500" : 
                          "bg-gray-400 text-gray-700 cursor-not-allowed"}`}
          >
            {loading ? "Loading..." : "Start Interview"}
          </button>
        </div>
      </form>

      <button
        onClick={onClose}
        className="w-full mt-5 py-3 px-6 bg-red-600 text-white font-semibold rounded-lg hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:bg-gray-400"
      >
        Cancel
      </button>

      {error && (
        <p className="mt-4 text-red-500 text-center text-sm font-medium">
          {error}
        </p>
      )}

      {mockInterview?.length > 0 && (
        <div className="mt-6">
          <h2 className="text-xl font-semibold text-center text-green-500 mb-4">
            Interview Questions
          </h2>
          <div className="space-y-4">
            {mockInterview.map((ques, idx) => (
              <div
                key={idx}
                className="p-4 bg-gray-100 rounded-lg shadow-sm hover:bg-gray-200 transition-all duration-200"
              >
                <h3 className="text-lg font-medium text-gray-800">{ques.question}</h3>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default MockDetails;
