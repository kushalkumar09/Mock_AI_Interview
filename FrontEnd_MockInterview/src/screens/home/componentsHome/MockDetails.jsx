import { InputFormDetails } from "@/constants/InputConstants";
import { usePromptResponse } from "@/hooks/ApiHooks/usePromptResponse.jsx";
import React, { useState } from "react";

const MockDetails = () => {
  const [promptData, setPromptData] = useState({
    JobPosition: "",
    JobDescription: "",
    YearOfExperience: 0,
  }); 
  
  const { response, loading, fetchData, error } = usePromptResponse();
  const [mockInterview,setMockInterview] = useState(response);

  const handleButton = (e) => {
    e.preventDefault();
    console.log(promptData);
    if (promptData) {
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

  console.log(typeof(response))
  return (
    <div className="max-w-xl mx-auto p-4 bg-white rounded-lg shadow-md">
      <form className="space-y-4">
        {InputFormDetails.map((item, i) => (
          <div className="flex flex-col" key={i}>
            <label
              htmlFor={`${item.name}_${i}`}
              className="text-sm font-medium text-gray-700"
            >
              {item.title}
            </label>
            <input
              id={`${item.name}_${i}`}
              type="text"
              name={item.name}
              placeholder={item.placeholderdata}
              required
              onChange={(e) => handleInputFields(e, i)}
              className="mt-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500"
            />
          </div>
        ))}

        <div className="flex justify-center">
          <button
            onClick={handleButton}
            disabled={loading}
            className="w-full py-2 px-4 bg-indigo-600 text-white font-semibold rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 disabled:bg-gray-400"
          >
            {loading ? "Loading..." : "Start Interview"}
          </button>
        </div>
      </form>

      {error && <p className="mt-4 text-red-500">{error}</p>}
      {response && (
  <div className="mt-4 text-green-500">
    {response?.interviewQuestions.map((ques, idx) => (
      <div key={idx}>
        <h2>{ques.question}</h2>
      </div>
    ))}
  </div>
)}

    </div>
  );
};

export default MockDetails;