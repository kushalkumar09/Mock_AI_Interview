import React, { useEffect, useState } from "react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import MockDetails from "./MockDetails";
import { CalendarPlus } from "lucide-react";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import ApiEndPoints from "@/constants/endpoint";
import { useNavigate } from "react-router";

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
      ],
      createdAt: "2025-01-04T10:49:52.498Z",
    },
  ],
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviewData, setInterviewData] = useState(pastInterviews.data);
  const { endPoint } = ApiEndPoints.GetPreviousInterviews;
  const { data } = useFetchData(endPoint);
  const navigate = useNavigate();

  useEffect(() => {
    if (data) {
      const sortByDate = data.data.sort(
        (a, b) => new Date(b.createdAt) - new Date(a.createdAt)
      );
      setInterviewData(sortByDate);
    }
  }, [data]);

  return (
    <div className="container mx-auto p-8 min-h-screen">
      <h1 className="text-4xl font-bold text-gray-800 mb-10">Dashboard</h1>
      <div className="flex mb-10">
        <Card className="w-full max-w-sm border-0 bg-white shadow-lg rounded-lg">
          <CardHeader>
            <CardTitle className="text-2xl font-semibold text-gray-700 text-center">
              New Interview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="w-full py-4 text-lg bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-all"
            >
              <CalendarPlus className="mr-2" /> Schedule Interview
            </Button>
          </CardContent>
        </Card>
      </div>
      <ScrollArea className="h-[50vh] overflow-auto border border-gray-400 p-3 rounded-lg shadow-lg bg-white" style={{ scrollbarGutter: "stable both-edges" }}>
        <div className="grid grid-cols-1 md:grid-cols-3 p-8 gap-8 max-h-80">
          {interviewData.map((interview) => (
            <Card
              key={interview._id}
              className="p-6 border-1 bg-white shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300"
            >
              <CardHeader>
                <CardTitle className="text-xl font-semibold text-gray-800">
                  {interview.JobDescription}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-600 mb-2">
                  Position: {interview.JobPosition}
                </p>
                <p className="text-gray-600 mb-2">
                  Experience: {interview.YearOfExperience} year(s)
                </p>
                <div className="flex justify-between mt-4">
                  <Button
                    onClick={() =>
                      navigate(`/interview/${interview.mockInterviewId}/start`)
                    }
                    className="bg-green-500 text-white py-2 px-4 rounded-lg hover:bg-green-600 transition-all"
                  >
                    Start Interview
                  </Button>
                  <Button
                    onClick={() =>
                      navigate(
                        `/interview/${interview.mockInterviewId}/feedback`
                      )
                    }
                    className="bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-all"
                  >
                    Feedback
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
            <MockDetails onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
