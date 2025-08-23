"use client"

import { useEffect, useState } from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Clock, ArrowUpRight, ArrowLeftCircle, PlayCircle, BarChart3, Calendar, CheckCircle2, PlusCircle, Search, Filter, MoreHorizontal, Eye } from 'lucide-react';
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import ApiEndPoints from "@/constants/endpoint";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import { useNavigate } from "react-router";
import MockDetails from "./MockDetails";

// Mock data for demonstration
const pastInterviews = {
  message: "All interviews",
  data: [
    {
      _id: "1234567890abcdef12345678",
      mockInterviewId: "mock12345",
      userId: "user12345",
      JobPosition: "Python Developer",
      JobDescription: "Senior Python Developer with Django experience",
      YearOfExperience: 3,
      InterviewQuestions: [
        {
          question: "Why Python?",
          answer: "I enjoy its simplicity and versatility.",
          _id: "1234567890abcdef12345679",
        },
        {
          question: "Explain Django ORM",
          answer: "Django ORM is an object-relational mapping tool.",
          _id: "1234567890abcdef12345680",
        },
      ],
      createdAt: "2025-01-04T10:49:52.498Z",
    },
    {
      _id: "1234567890abcdef12345681",
      mockInterviewId: "mock12346",
      userId: "user12345",
      JobPosition: "React Developer",
      JobDescription: "Frontend React Developer with TypeScript",
      YearOfExperience: 2,
      InterviewQuestions: [
        {
          question: "What is React?",
          answer: "React is a JavaScript library for building user interfaces.",
          _id: "1234567890abcdef12345682",
        },
      ],
      createdAt: "2025-01-03T08:30:15.123Z",
    },
    {
      _id: "1234567890abcdef12345683",
      mockInterviewId: "mock12347",
      userId: "user12345",
      JobPosition: "Full Stack Developer",
      JobDescription: "Full Stack Developer with MERN stack experience",
      YearOfExperience: 5,
      InterviewQuestions: [
        {
          question: "Explain the MERN stack",
          answer: "MERN stands for MongoDB, Express, React, and Node.js.",
          _id: "1234567890abcdef12345684",
        },
        {
          question: "What is REST API?",
          answer: "REST is an architectural style for web services.",
          _id: "1234567890abcdef12345685",
        },
        {
          question: "Database optimization techniques",
          answer: "Indexing, query optimization, and caching are key techniques.",
          _id: "1234567890abcdef12345686",
        },
      ],
      createdAt: "2025-01-02T14:20:30.456Z",
    },
  ],
};

const Dashboard = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [interviewData, setInterviewData] = useState(pastInterviews.data);
  const { endPoint } = ApiEndPoints.GetPreviousInterviews;
  const { data } = useFetchData(endPoint);
  const [searchTerm, setSearchTerm] = useState("");
  const [filteredInterviews, setFilteredInterviews] = useState(interviewData);
  const [filterExperience, setFilterExperience] = useState(null); // Example: 2, 3, or 'all'

  const navigate = useNavigate();

  useEffect(() => {
    const results = interviewData.filter(
      (interview) =>
        interview.JobDescription.toLowerCase().includes(
          searchTerm.toLowerCase()
        ) ||
        interview.JobPosition.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredInterviews(results);
  }, [searchTerm, interviewData]);

  useEffect(() => {
    let results = interviewData;
    if (searchTerm) {
      results = results.filter(
        (interview) =>
          interview.JobDescription.toLowerCase().includes(
            searchTerm.toLowerCase()
          ) ||
          interview.JobPosition.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
    if (filterExperience !== null) {
      results = results.filter(
        (interview) => interview.YearOfExperience === filterExperience
      );
    }
    setFilteredInterviews(results);
  }, [searchTerm, filterExperience, interviewData]);

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
    (interview) =>
      new Date(interview.createdAt) >
      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
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
      return format(new Date(dateString), "MMM d, yyyy");
    } catch (e) {
      return "Invalid date";
    }
  };

  const getTopPosition = () => {
    if (Object.keys(positionGroups).length === 0) return "interviews";
    let maxCount = 0;
    let topPosition = "";
    Object.entries(positionGroups).forEach(([position, interviews]) => {
      if (interviews.length > maxCount) {
        maxCount = interviews.length;
        topPosition = position;
      }
    });
    return topPosition;
  };

  const getBadgeVariant = (position) => {
    const positionLower = position.toLowerCase();
    if (positionLower.includes("python")) return "default";
    if (positionLower.includes("react")) return "secondary";
    if (positionLower.includes("full")) return "outline";
    return "default";
  };

  return (
    <div className="min-h-screen bg-gray-50/30">
      {/* Header Section */}
      <div className="bg-white border-b border-gray-100">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback className="bg-gradient-to-br from-blue-500 to-indigo-600 text-white">
                  UI
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-gray-900">
                  Welcome back!
                </h1>
                <p className="text-gray-500">
                  Ready to practice for your {getTopPosition()} interviews?
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-sm hover:shadow-md transition-all duration-200"
              size="lg"
            >
              <PlusCircle className="mr-2 h-4 w-4" /> New Interview
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto py-8 px-4">
        {/* Stats Section */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          <Card className="bg-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Total Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-50 mr-4">
                  <BarChart3 className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {totalInterviews}
                  </p>
                  <p className="text-sm text-gray-500">All time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Recent Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-green-50 mr-4">
                  <Clock className="h-6 w-6 text-green-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-gray-900">
                    {recentInterviews}
                  </p>
                  <p className="text-sm text-gray-500">Last 7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-0 rounded-xl shadow-sm hover:shadow-md transition-all duration-200">
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-gray-500">
                Next Interview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-purple-50 mr-4">
                  <Calendar className="h-6 w-6 text-purple-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-gray-900">
                    Schedule your next practice
                  </p>
                  <Button
                    variant="link"
                    className="p-0 h-auto text-blue-600 font-medium"
                    onClick={() => setIsModalOpen(true)}
                  >
                    Schedule now <ArrowUpRight className="ml-1 h-3 w-3" />
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Search and Filter Bar */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-6">
          <div className="relative w-full md:w-auto md:min-w-[320px]">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
            <Input
              placeholder="Search interviews..."
              className="pl-9 bg-white border-gray-200 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              className={`text-gray-600 border-gray-200 ${
                filterExperience === 2 ? 'bg-blue-50 border-blue-200 text-blue-700' : ''
              }`}
              onClick={() =>
                setFilterExperience((prev) => (prev === 2 ? null : 2))
              }
            >
              <Filter className="h-4 w-4 mr-2" /> 2+ Years
            </Button>
          </div>
        </div>

        {/* Tabs and Interview Table */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-gray-100 p-1 rounded-lg">
              <TabsTrigger
                value="all"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                All Interviews
              </TabsTrigger>
              <TabsTrigger
                value="recent"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                Recent
              </TabsTrigger>
              <TabsTrigger
                value="by-position"
                className="rounded-md data-[state=active]:bg-white data-[state=active]:shadow-sm"
              >
                By Position
              </TabsTrigger>
            </TabsList>
          </div>

          <TabsContent value="all" className="mt-0">
            <InterviewTable 
              interviews={filteredInterviews} 
              navigate={navigate} 
              formatDate={formatDate}
              getBadgeVariant={getBadgeVariant}
            />
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            <InterviewTable 
              interviews={filteredInterviews.filter(
                (interview) =>
                  new Date(interview.createdAt) >
                  new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
              )} 
              navigate={navigate} 
              formatDate={formatDate}
              getBadgeVariant={getBadgeVariant}
            />
          </TabsContent>

          <TabsContent value="by-position" className="mt-0">
            {Object.keys(positionGroups).map((position) => (
              <div key={position} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-1 bg-gradient-to-b from-blue-500 to-indigo-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    {position}
                  </h3>
                </div>
                <InterviewTable 
                  interviews={positionGroups[position]} 
                  navigate={navigate} 
                  formatDate={formatDate}
                  getBadgeVariant={getBadgeVariant}
                />
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

      {/* Mock Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/50 backdrop-blur-sm z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-full max-w-md">
            <MockDetails onClose={() => setIsModalOpen(false)} />
          </div>
        </div>
      )}
    </div>
  );
};

const InterviewTable = ({ interviews, navigate, formatDate, getBadgeVariant }) => {
  if (interviews.length === 0) {
    return (
      <div className="bg-white rounded-xl border border-gray-100 p-12 text-center">
        <div className="text-gray-400 mb-4">
          <Calendar className="h-12 w-12 mx-auto" />
        </div>
        <h3 className="text-lg font-medium text-gray-900 mb-2">No interviews found</h3>
        <p className="text-gray-500">Try adjusting your search or filters</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl border border-gray-100 overflow-hidden shadow-sm">
      <Table>
        <TableHeader>
          <TableRow className="border-b border-gray-100 bg-gray-50/50">
            <TableHead className="font-semibold text-gray-700 py-4">Position</TableHead>
            <TableHead className="font-semibold text-gray-700">Description</TableHead>
            <TableHead className="font-semibold text-gray-700">Experience</TableHead>
            <TableHead className="font-semibold text-gray-700">Questions</TableHead>
            <TableHead className="font-semibold text-gray-700">Date</TableHead>
            <TableHead className="font-semibold text-gray-700 text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {interviews.map((interview) => {
            const questionCount = interview.InterviewQuestions?.length || 0;
            
            return (
              <TableRow 
                key={interview._id} 
                className="border-b border-gray-50 hover:bg-gray-50/50 transition-colors"
              >
                <TableCell className="py-4">
                  <Badge 
                    variant={getBadgeVariant(interview.JobPosition)}
                    className="font-medium"
                  >
                    {interview.JobPosition}
                  </Badge>
                </TableCell>
                <TableCell className="py-4">
                  <div className="font-medium text-gray-900 max-w-xs truncate">
                    {interview.JobDescription}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <span className="text-sm text-gray-600">
                    {interview.YearOfExperience} year{interview.YearOfExperience !== 1 ? 's' : ''}
                  </span>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center text-sm text-gray-600">
                    <CheckCircle2 className="h-4 w-4 text-green-500 mr-1" />
                    {questionCount} question{questionCount !== 1 ? 's' : ''}
                  </div>
                </TableCell>
                <TableCell className="py-4">
                  <div className="flex items-center text-sm text-gray-500">
                    <Calendar className="h-4 w-4 mr-1" />
                    {formatDate(interview.createdAt)}
                  </div>
                </TableCell>
                <TableCell className="py-4 text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                      onClick={() =>
                        navigate(`/interview/${interview.mockInterviewId}/feedback`)
                      }
                    >
                      <Eye className="h-4 w-4 mr-1" />
                      Feedback
                    </Button>
                    <Button
                      size="sm"
                      className="bg-blue-600 hover:bg-blue-700 text-white"
                      onClick={() =>
                        navigate(`/interview/${interview.mockInterviewId}/start`)
                      }
                    >
                      <PlayCircle className="h-4 w-4 mr-1" />
                      Start
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    </div>
  );
};

export default Dashboard;
