"use client"

import { Lightbulb, WebcamIcon } from 'lucide-react';
import { useState } from "react";
import { useNavigate, useParams } from "react-router";
import Webcam from "react-webcam";

// Mock data for demonstration
const mockData = {
  JobPosition: "Frontend Developer",
  JobDescription: "Develop and maintain user interfaces using React, TypeScript, and modern web technologies. Collaborate with design and backend teams to create seamless user experiences.",
  YearOfExperience: "3-5 years"
};

const Interview = () => {
  const { id } = useParams();
  const { data, loading, error } = useFetchData(
    ApiEndPoints.MockInterview.endPoint.replace(":id", id)
  );
  const navigate = useNavigate();
  console.log("Data",data)
  const [enableCamera, setEnableCamera] = useState(false);

  return (
    <div className="min-h-screen max-w-[900px] max-h-screen overflow-hidden bg-gradient-to-br from-blue-50 via-white to-blue-50">
      <div className="h-screen flex flex-col p-4 md:p-6 lg:p-8">
        {/* Header */}
        <div className="text-center mb-4 md:mb-6">
          <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-800">
            Let's Start the Interview
          </h1>
        </div>

        {/* Main Content */}
        <div className="flex-1 flex flex-col lg:flex-row gap-4 md:gap-6 overflow-hidden">
          {/* Interview Details Section */}
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 h-full flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Interview Details
              </h2>
              
              <div className="flex-1 overflow-y-auto space-y-4">
                <div className="space-y-3">
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Job Position</p>
                    <p className="text-gray-800 font-semibold">{data?.JobPosition}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Experience Required</p>
                    <p className="text-gray-800 font-semibold">{data?.YearOfExperience}</p>
                  </div>
                  
                  <div className="bg-gray-50 p-3 rounded-lg">
                    <p className="text-sm font-medium text-gray-600 mb-1">Job Description</p>
                    <p className="text-gray-800 text-sm leading-relaxed line-clamp-4">
                      {data?.JobDescription}
                    </p>
                  </div>
                </div>

                {/* Information Box */}
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4">
                  <div className="flex items-start gap-2">
                    <Lightbulb className="text-yellow-600 w-5 h-5 mt-0.5 flex-shrink-0" />
                    <div>
                      <p className="font-medium text-yellow-800 text-sm mb-1">
                        Interview Information
                      </p>
                      <p className="text-yellow-700 text-xs leading-relaxed">
                        Welcome to your AI-powered mock interview! Experience personalized 
                        questions, real-time feedback, and detailed performance reports.
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Start Interview Button */}
              <button
                className="w-full mt-4 px-6 py-3 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75 transition duration-300"
                onClick={() => {
                  navigate(`/interview/${id}/start`);
                }}
              >
                Start Interview
              </button>
            </div>
          </div>

          {/* Webcam Section */}
          <div className="flex-1 bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
            <div className="p-4 md:p-6 h-full flex flex-col">
              <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-4">
                Camera Setup
              </h2>
              
              <div className="flex-1 flex flex-col items-center justify-center">
                {/* Webcam Container */}
                <div className="w-full max-w-md aspect-video bg-gray-100 rounded-lg border-2 border-gray-300 overflow-hidden shadow-inner">
                  {enableCamera ? (
                    <Webcam
                      className="w-full h-full object-cover"
                      onUserMedia={() => setEnableCamera(true)}
                      onUserMediaError={() => setEnableCamera(false)}
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center bg-gray-200">
                      <WebcamIcon className="text-gray-400 w-16 h-16" />
                    </div>
                  )}
                </div>

                {/* Camera Toggle Button */}
                <button
                  onClick={() => setEnableCamera(!enableCamera)}
                  className="mt-4 px-6 py-2 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition duration-300 shadow-md text-sm font-medium"
                >
                  {enableCamera ? "Disable Camera" : "Enable Camera"}
                </button>

                {/* Camera Status */}
                <p className="mt-2 text-xs text-gray-500 text-center">
                  {enableCamera 
                    ? "Camera is active and ready for interview" 
                    : "Enable camera to proceed with the interview"
                  }
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Interview;
