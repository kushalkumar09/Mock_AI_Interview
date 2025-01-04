import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MockDetails from "./MockDetails";
import { CalendarPlus, ClockIcon as ClockRewind } from "lucide-react";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import ApiEndPoints from "@/constants/endpoint";
import { useParams } from "react-router";

// Mock data for past interviews
const pastInterviews = {
  message: "All interviews",
  data: [
    {
      _id: "1234567890abcdef12345678",
      mockInterviewId: "mock12345",
      userId: "user12345",
      JobPosition: "Python Developer",
      JobDescription: "Python",
      YearOfExperience: 0,
      InterviewQuestions: [
        {
          question: "Why Python?",
          answer: "I enjoy its simplicity and versatility.",
          _id: "1234567890abcdef12345679",
        },
        {
          question: "Difference between list and tuple?",
          answer: "Lists are mutable, tuples are not.",
          _id: "1234567890abcdef1234567A",
        },
      ],
      createdAt: "2025-01-04T10:49:52.498Z",
      updatedAt: "2025-01-04T10:49:52.498Z",
      __v: 0,
    },
    {
      _id: "abcdef123456789012345678",
      mockInterviewId: "mock67890",
      userId: "user67890",
      JobPosition: "React Developer",
      JobDescription: "React, Node.js",
      YearOfExperience: 0,
      InterviewQuestions: [
        {
          question: "Explain React components?",
          answer: "Components are reusable UI elements.",
          _id: "abcdef123456789012345679",
        },
        {
          question: "What is JSX?",
          answer: "JSX is a syntax extension for JavaScript.",
          _id: "abcdef12345678901234567A",
        },
      ],
      createdAt: "2025-01-04T13:27:45.761Z",
      updatedAt: "2025-01-04T13:27:45.761Z",
      __v: 0,
    },
  ],
};

const Dashboard = () => {
  const { id } = useParams();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviewData, setInterviewData] = useState(pastInterviews.data);
  const { endPoint } = ApiEndPoints.GetPreviousInterviews;
  const { data, loading, error } = useFetchData(endPoint);
  useEffect(() => {
    if (data) {
      setInterviewData(data.data);
    }
  }, [data]);

  return (
    <div className="container mx-auto p-8 bg-gray-50 min-h-screen">
      <h1 className="text-3xl font-bold text-gray-900 mb-8">Dashboard</h1>
      <div>
        <Card className="md:w-1/4 mb-4 border-0">
          <CardHeader>
            <CardTitle className="text-xl font-semibold text-gray-700">
              ADD NEW INTERVIEW
            </CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col gap-6 ">
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full h-16 bg-blue-600 text-white hover:bg-blue-700 transition-colors duration-200"
            >
              <span className="p-10 flex">
                <CalendarPlus className="mr-1 h-4 w-4" /> New Mock Interview
              </span>
            </Button>
          </CardContent>
        </Card>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="lg:col-span-2">
          <Card className="shadow-lg rounded-lg border-0 bg-white">
            <CardHeader>
              <CardTitle className="text-xl font-semibold text-gray-700">
                Past Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <ScrollArea className="h-[calc(100vh-20rem)] pr-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                  {interviewData.map((interview) => (
                    <Card
                      key={interview._id}
                      className="border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition-shadow duration-300"
                    >
                      <CardContent className="p-4 space-y-2">
                        <p className="font-medium text-gray-900">
                          {interview.JobDescription}
                        </p>
                        <p className="text-sm text-gray-600">
                          Interviewer: {interview.JobPosition}
                        </p>
                        <p className="text-sm text-gray-600">
                          Score: {interview.YearOfExperience}/10
                        </p>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </ScrollArea>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md transition-all duration-200">
            <MockDetails
              onClose={() => {
                setIsModalOpen(false);
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
