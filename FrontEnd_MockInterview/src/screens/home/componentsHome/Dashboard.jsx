'use client'

import React, { useEffect, useState } from "react";
// import { ScrollArea } from "@/components/ui/scroll-area";
import { CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CalendarPlus, Clock, ArrowUpRight, BarChart3, Calendar, CheckCircle2, PlusCircle } from 'lucide-react';
import MockDetails from "./MockDetails";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import ApiEndPoints from "@/constants/endpoint";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { format } from 'date-fns';
import { Card } from "@/components/ui/card";

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

  // Calculate stats
  const totalInterviews = interviewData.length;
  const recentInterviews = interviewData.filter(
    interview => new Date(interview.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
  ).length;

  // Group interviews by job position
  const positionGroups = interviewData.reduce((acc, interview) => {
    const position = interview.JobPosition;
    if (!acc[position]) {
      acc[position] = [];
    }
    acc[position].push(interview);
    return acc;
  }, {});

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'MMM d, yyyy');
    } catch (e) {
      return 'Invalid date';
    }
  };

  return (
    <div className="container mx-auto py-8 px-4 min-h-screen bg-slate-50/50">
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Dashboard</h1>
          <p className="text-slate-500 mt-1">Manage and track your interview practice</p>
        </div>
        <Button 
          onClick={() => setIsModalOpen(true)}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white rounded-md shadow-sm"
        >
          <PlusCircle className="mr-2 h-4 w-4" /> New Interview
        </Button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Total Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <BarChart3 className="h-8 w-8 text-blue-500 mr-3" />
              <div>
                <p className="text-3xl font-bold text-slate-800">{totalInterviews}</p>
                <p className="text-sm text-slate-500">All time</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Recent Interviews</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Clock className="h-8 w-8 text-green-500 mr-3" />
              <div>
                <p className="text-3xl font-bold text-slate-800">{recentInterviews}</p>
                <p className="text-sm text-slate-500">Last 7 days</p>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="bg-white border-none shadow-sm hover:shadow-md transition-shadow">
          <CardHeader className="pb-2">
            <CardTitle className="text-sm font-medium text-slate-500">Next Interview</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center">
              <Calendar className="h-8 w-8 text-indigo-500 mr-3" />
              <div>
                <p className="text-lg font-medium text-slate-800">Schedule your next practice</p>
                <Button 
                  variant="link" 
                  className="p-0 h-auto text-indigo-600 font-medium"
                  onClick={() => setIsModalOpen(true)}
                >
                  Schedule now <ArrowUpRight className="ml-1 h-3 w-3" />
                </Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Tabs and Interview List */}
      <Tabs defaultValue="all" className="w-full">
        <div className="flex justify-between items-center mb-4">
          <TabsList className="bg-slate-100">
            <TabsTrigger value="all">All Interviews</TabsTrigger>
            <TabsTrigger value="recent">Recent</TabsTrigger>
            <TabsTrigger value="by-position">By Position</TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="all" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewData.map((interview) => (
              <InterviewCard 
                key={interview._id} 
                interview={interview} 
                navigate={navigate}
                formatDate={formatDate}
              />
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {interviewData
              .filter(interview => new Date(interview.createdAt) > new Date(Date.now() - 7 * 24 * 60 * 60 * 1000))
              .map((interview) => (
                <InterviewCard 
                  key={interview._id} 
                  interview={interview} 
                  navigate={navigate}
                  formatDate={formatDate}
                />
              ))}
          </div>
        </TabsContent>

        <TabsContent value="by-position" className="mt-0">
          {Object.keys(positionGroups).map(position => (
            <div key={position} className="mb-8">
              <h3 className="text-lg font-semibold text-slate-800 mb-4">{position}</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {positionGroups[position].map((interview) => (
                  <InterviewCard 
                    key={interview._id} 
                    interview={interview} 
                    navigate={navigate}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            </div>
          ))}
        </TabsContent>
      </Tabs>

      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md">
            <MockDetails onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const InterviewCard = ({ interview, navigate, formatDate }) => {
  const questionCount = interview.InterviewQuestions?.length || 0;
  
  return (
    <Card className="bg-white border-none shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-start">
          <Badge variant="outline" className="bg-blue-50 text-blue-700 border-blue-100 mb-2">
            {interview.JobPosition}
          </Badge>
          <span className="text-xs text-slate-400">{formatDate(interview.createdAt)}</span>
        </div>
        <CardTitle className="text-lg font-semibold text-slate-800">
          {interview.JobDescription}
        </CardTitle>
      </CardHeader>
      <CardContent className="pb-3">
        <div className="flex items-center text-sm text-slate-500 mb-2">
          <CheckCircle2 className="h-4 w-4 mr-1 text-green-500" />
          <span>{questionCount} question{questionCount !== 1 ? 's' : ''} completed</span>
        </div>
        <p className="text-sm text-slate-600">
          Experience: {interview.YearOfExperience} year{interview.YearOfExperience !== 1 ? 's' : ''}
        </p>
      </CardContent>
      <CardFooter className="pt-0 flex justify-between gap-2">
        <Button
          variant="outline"
          className="flex-1 border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900"
          onClick={() => navigate(`/interview/${interview.mockInterviewId}/feedback`)}
        >
          View Feedback
        </Button>
        <Button
          className="flex-1 bg-blue-600 hover:bg-blue-700 text-white"
          onClick={() => navigate(`/interview/${interview.mockInterviewId}/start`)}
        >
          Start Interview
        </Button>
      </CardFooter>
    </Card>
  );
};

export default Dashboard;
