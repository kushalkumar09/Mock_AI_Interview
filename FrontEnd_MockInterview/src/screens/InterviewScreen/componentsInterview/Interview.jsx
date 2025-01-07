import ApiEndPoints from "@/constants/endpoint";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import { Lightbulb, WebcamIcon } from "lucide-react";
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Webcam from "react-webcam";

const Interview = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(
    ApiEndPoints.MockInterview.endPoint.replace(":id", id)
  );
  const navigate = useNavigate();

  const [enableCamera, setEnableCamera] = useState(false);

  return (
    <div className="my-8 mx-10 p-10 md:px-8 border shadow-lg rounded-lg bg-gradient-to-r from-blue-50 to-blue-100">
      <h1 className="text-4xl font-bold text-center text-gray-800 mb-6">
        Let's Start the Interview
      </h1>
      <div className="flex flex-col md:flex-row justify-center items-center space-y-8 md:space-y-0 md:space-x-8">
        {/* Interviewer Details Section */}
        <div className="w-full flex flex-col max-w-xl bg-white p-8 rounded-lg shadow-lg mb-8 border border-gray-200 transition-transform transform hover:scale-105 duration-300">
          <h2 className="text-3xl font-semibold text-gray-800 mb-6">
            Candidate Details
          </h2>
          <div className="flex flex-col gap-6 items-start">
            <p className="text-lg text-gray-700">
              <strong>Job Position:</strong> {data?.JobPosition}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Job Description:</strong> {data?.JobDescription}
            </p>
            <p className="text-lg text-gray-700">
              <strong>Year of Experience:</strong> {data?.YearOfExperience}
            </p>
            <div className="flex flex-col items-center bg-yellow-100 border border-yellow-300 rounded-lg p-6 shadow-md">
              <div className="flex items-center mb-3">
                <Lightbulb className="text-yellow-500 w-6 h-6 mr-2" />
                <strong className="text-gray-800">Information:</strong>
              </div>
              <p className="text-center text-gray-800 text-sm leading-relaxed">
                Welcome to your AI-powered mock interview! Experience
                personalized questions, real-time feedback, and a detailed
                performance report. Prepare, engage, and refine your skills for
                success. Let’s begin your journey!
              </p>
            </div>
            <button
              className="px-8 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
              onClick={() => {
                navigate(`${id}/start`);
              }}
            >
              Start Interview
            </button>
          </div>
        </div>

        {/* Webcam Section */}
        <div className="w-full max-w-xl flex flex-col items-center">
          <div className="min-w-[fit-content] min-h-[fit-content] max-h-[300px] max-w-[500px] bg-gray-200 rounded-lg flex justify-center items-center border-black border-2 shadow-lg">
            {enableCamera ? (
              <Webcam
                style={{
                  height: "300px",
                  width: "500px",
                  padding: "20px",
                  backgroundColor: "black",
                  objectFit: "cover", // Ensures the webcam fills the space without stretching
                }}
                onUserMedia={() => setEnableCamera(true)}
                onUserMediaError={() => setEnableCamera(false)}
              />
            ) : (
              <WebcamIcon
                className="text-gray-500 w-[500px] h-[300px] bg-gray-200 p-20 rounded-lg"
                style={{ fontSize: 60 }}
              />
            )}
          </div>

          {/* Button to Toggle Camera */}
          <button
            onClick={() => setEnableCamera(!enableCamera)}
            className="py-2 mt-8 px-6 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md"
          >
            {enableCamera ? "Disable Camera" : "Enable Web Camera"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Interview;
