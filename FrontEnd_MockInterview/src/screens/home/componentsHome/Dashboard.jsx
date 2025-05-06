import { useEffect, useState } from "react";
import {
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Clock,
  ArrowUpRight,
  ArrowLeftCircle,
  PlayCircle,
  BarChart3,
  Calendar,
  CheckCircle2,
  PlusCircle,
  Search,
  Filter,
  LayoutGrid,
  List,
} from "lucide-react";
import MockDetails from "./MockDetails";
import useFetchData from "@/hooks/Apihooks/useApiResponse";
import ApiEndPoints from "@/constants/endpoint";
import { useNavigate } from "react-router";
import { Badge } from "@/components/ui/badge";
import { format } from "date-fns";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

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
  const [viewMode, setViewMode] = useState("grid");
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

  // Get the most common job position for the welcome message
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

  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white">
      {/* Header Section */}
      <div className="bg-white border-b border-slate-200">
        <div className="container mx-auto py-6 px-4">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
            <div className="flex items-center gap-4">
              <Avatar className="h-12 w-12 border-2 border-white shadow-sm">
                <AvatarImage
                  src="/placeholder.svg?height=40&width=40"
                  alt="User"
                />
                <AvatarFallback className="bg-gradient-to-br from-violet-500 to-purple-700 text-white">
                  UI
                </AvatarFallback>
              </Avatar>
              <div>
                <h1 className="text-2xl font-bold text-slate-900">
                  Welcome back!
                </h1>
                <p className="text-slate-500">
                  Ready to practice for your {getTopPosition()} interviews?
                </p>
              </div>
            </div>
            <Button
              onClick={() => setIsModalOpen(true)}
              className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-full shadow-md hover:shadow-lg transition-all duration-200"
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
          <Card className="bg-white border-none rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-violet-500/10 to-purple-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Total Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-violet-100 mr-4">
                  <BarChart3 className="h-6 w-6 text-violet-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-800">
                    {totalInterviews}
                  </p>
                  <p className="text-sm text-slate-500">All time</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-emerald-500/10 to-teal-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Recent Interviews
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-emerald-100 mr-4">
                  <Clock className="h-6 w-6 text-emerald-600" />
                </div>
                <div>
                  <p className="text-3xl font-bold text-slate-800">
                    {recentInterviews}
                  </p>
                  <p className="text-sm text-slate-500">Last 7 days</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-white border-none rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden">
            <div className="absolute top-0 right-0 w-24 h-24 bg-gradient-to-br from-blue-500/10 to-indigo-500/10 rounded-bl-full"></div>
            <CardHeader className="pb-2">
              <CardTitle className="text-sm font-medium text-slate-500">
                Next Interview
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center">
                <div className="p-3 rounded-lg bg-blue-100 mr-4">
                  <Calendar className="h-6 w-6 text-blue-600" />
                </div>
                <div>
                  <p className="text-lg font-medium text-slate-800">
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
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-slate-400" />
            <Input
              placeholder="Search interviews..."
              className="pl-9 bg-white border-slate-200 rounded-lg"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-3 w-full md:w-auto">
            <Button
              variant="outline"
              size="sm"
              className="text-slate-600 border-slate-200"
              onClick={() =>
                setFilterExperience((prev) => (prev === 2 ? null : 2))
              } // Toggle filter example
            >
              <Filter className="h-4 w-4 mr-2" /> 2+ Years
            </Button>

            <div className="flex items-center bg-slate-100 rounded-lg p-1 ml-auto">
              <Button
                variant={viewMode === "grid" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("grid")}
              >
                <LayoutGrid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "secondary" : "ghost"}
                size="sm"
                className="h-8 w-8 p-0"
                onClick={() => setViewMode("list")}
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Tabs and Interview List */}
        <Tabs defaultValue="all" className="w-full">
          <div className="flex justify-between items-center mb-6">
            <TabsList className="bg-slate-100 p-1 rounded-lg">
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
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInterviews.map((interview) => (
                  <InterviewCard
                    key={interview._id}
                    interview={interview}
                    navigate={navigate}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInterviews.map((interview) => (
                  <InterviewListItem
                    key={interview._id}
                    interview={interview}
                    navigate={navigate}
                    formatDate={formatDate}
                  />
                ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="recent" className="mt-0">
            {viewMode === "grid" ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredInterviews
                  .filter(
                    (interview) =>
                      new Date(interview.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  )
                  .map((interview) => (
                    <InterviewCard
                      key={interview._id}
                      interview={interview}
                      navigate={navigate}
                      formatDate={formatDate}
                    />
                  ))}
              </div>
            ) : (
              <div className="space-y-4">
                {filteredInterviews
                  .filter(
                    (interview) =>
                      new Date(interview.createdAt) >
                      new Date(Date.now() - 7 * 24 * 60 * 60 * 1000)
                  )
                  .map((interview) => (
                    <InterviewListItem
                      key={interview._id}
                      interview={interview}
                      navigate={navigate}
                      formatDate={formatDate}
                    />
                  ))}
              </div>
            )}
          </TabsContent>

          <TabsContent value="by-position" className="mt-0">
            {Object.keys(positionGroups).map((position) => (
              <div key={position} className="mb-8">
                <div className="flex items-center gap-2 mb-4">
                  <div className="h-8 w-1 bg-gradient-to-b from-violet-500 to-purple-600 rounded-full"></div>
                  <h3 className="text-lg font-semibold text-slate-800">
                    {position}
                  </h3>
                </div>

                {viewMode === "grid" ? (
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
                ) : (
                  <div className="space-y-4">
                    {positionGroups[position].map((interview) => (
                      <InterviewListItem
                        key={interview._id}
                        interview={interview}
                        navigate={navigate}
                        formatDate={formatDate}
                      />
                    ))}
                  </div>
                )}
              </div>
            ))}
          </TabsContent>
        </Tabs>
      </div>

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
const InterviewCard = ({ interview, navigate, formatDate }) => {
  const questionCount = interview.InterviewQuestions?.length || 0;

  // Determine badge color based on job position
  const getBadgeColor = (position) => {
    const positionLower = position.toLowerCase();
    if (positionLower.includes("python"))
      return "bg-blue-50/80 text-blue-700 border-blue-200";
    if (positionLower.includes("java"))
      return "bg-amber-50/80 text-amber-700 border-amber-200";
    if (positionLower.includes("react"))
      return "bg-cyan-50/80 text-cyan-700 border-cyan-200";
    if (positionLower.includes("node"))
      return "bg-green-50/80 text-green-700 border-green-200";
    if (positionLower.includes("full"))
      return "bg-purple-50/80 text-purple-700 border-purple-200";
    return "bg-slate-50/80 text-slate-700 border-slate-200";
  };

  // Calculate completion percentage for visual indicators
  const completionPercentage = Math.min(100, (questionCount / 10) * 100);

  return (
    <Card className="bg-white/80 backdrop-blur-xl border border-slate-200 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group">
      <CardHeader className="pt-6 pb-6 px-6">
        <div className="flex justify-between items-start">
          <Badge
            variant="outline"
            className={`text-indigo-600 bg-indigo-100/60 border border-indigo-200 font-semibold text-xs px-4 py-2 uppercase backdrop-blur-sm`}
          >
            {interview.JobPosition}
          </Badge>
          <span className="flex items-center gap-1 text-xs text-slate-500 bg-slate-100 px-2 py-1 rounded-full border border-slate-200">
            <Calendar className="h-3 w-3" />
            {formatDate(interview.createdAt)}
          </span>
        </div>
        <CardTitle className="mt-2 text-lg font-bold text-slate-800 group-hover:text-indigo-700 transition-colors line-clamp-2 capitalize">
          {interview.JobDescription}
        </CardTitle>
      </CardHeader>

      <CardContent className="px-6 pb-6">
        <div className="flex flex-wrap gap-3 text-xs text-slate-700">
          <div className="flex items-center bg-emerald-50 border border-emerald-200 text-emerald-700 px-3 py-2 rounded-full font-medium backdrop-blur-sm">
            <CheckCircle2 className="h-4 w-4 mr-4" />
            {questionCount} question{questionCount !== 1 ? "s" : ""}
          </div>
          <div className="flex items-center bg-slate-100 border border-slate-300 text-slate-700 px-3 py-2 rounded-full font-medium backdrop-blur-sm">
            {interview.YearOfExperience} year
            {interview.YearOfExperience !== 1 ? "s" : ""} exp
          </div>
        </div>
      </CardContent>

      <CardFooter className="px-6 pt-0 pb-6 flex gap-4 flex-col sm:flex-row">
        <Button
          variant="ghost"
          className="flex-1 flex items-center justify-center gap-2 border border-slate-200 text-slate-600 hover:bg-slate-100 hover:text-indigo-600 rounded-xl py-3 font-medium transition-all duration-200 shadow-sm"
          onClick={() =>
            navigate(`/interview/${interview.mockInterviewId}/feedback`)
          }
        >
          <ArrowLeftCircle className="h-5 w-5" />
          View Feedback
        </Button>

        <Button
          className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-green-500 to-green-500 hover:from-green-600 hover:to-green-600 text-white rounded-xl py-3 font-semibold shadow-md hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200"
          onClick={() =>
            navigate(`/interview/${interview.mockInterviewId}/start`)
          }
        >
          <PlayCircle className="h-5 w-5" />
          Start Interview
        </Button>
      </CardFooter>
    </Card>
  );
};
const InterviewListItem = ({ interview, navigate, formatDate }) => {
  const questionCount = interview.InterviewQuestions?.length || 0;

  // Determine badge color based on job position
  const getBadgeColor = (position) => {
    const positionLower = position.toLowerCase();
    if (positionLower.includes("python"))
      return "bg-blue-50 text-blue-700 border-blue-100";
    if (positionLower.includes("java"))
      return "bg-amber-50 text-amber-700 border-amber-100";
    if (positionLower.includes("react"))
      return "bg-cyan-50 text-cyan-700 border-cyan-100";
    if (positionLower.includes("node"))
      return "bg-green-50 text-green-700 border-green-100";
    if (positionLower.includes("full"))
      return "bg-purple-50 text-purple-700 border-purple-100";
    return "bg-slate-50 text-slate-700 border-slate-100";
  };

  return (
    <Card className="bg-white border-none rounded-xl shadow-sm hover:shadow-md transition-all duration-200 overflow-hidden group">
      <div className="flex flex-col md:flex-row md:items-center p-4 gap-4">
        <div className="flex-grow">
          <div className="flex items-center gap-2 mb-1">
            <Badge
              variant="outline"
              className={`${getBadgeColor(interview.JobPosition)}`}
            >
              {interview.JobPosition}
            </Badge>
            <span className="text-xs text-slate-400 flex items-center">
              <Calendar className="h-3 w-3 mr-1" />
              {formatDate(interview.createdAt)}
            </span>
          </div>
          <h3 className="text-lg font-semibold text-slate-800 mb-1">
            {interview.JobDescription}
          </h3>
          <div className="flex items-center text-sm text-slate-500">
            <div className="flex items-center bg-emerald-50 text-emerald-700 px-2 py-1 rounded-full text-xs">
              <CheckCircle2 className="h-3 w-3 mr-1" />
              <span>
                {questionCount} question{questionCount !== 1 ? "s" : ""}
              </span>
            </div>
            <div className="w-1 h-1 bg-slate-300 rounded-full mx-2"></div>
            <div className="text-xs text-slate-500">
              {interview.YearOfExperience} year
              {interview.YearOfExperience !== 1 ? "s" : ""} exp
            </div>
          </div>
        </div>
        <div className="flex gap-2 md:w-auto w-full">
          <Button
            variant="outline"
            className="border-slate-200 text-slate-700 hover:bg-slate-50 hover:text-slate-900 rounded-lg"
            onClick={() =>
              navigate(`/interview/${interview.mockInterviewId}/feedback`)
            }
          >
            View Feedback
          </Button>
          <Button
            className="bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 text-white rounded-lg"
            onClick={() =>
              navigate(`/interview/${interview.mockInterviewId}/start`)
            }
          >
            Start Interview
          </Button>
        </div>
      </div>
    </Card>
  );
};

export default Dashboard;
