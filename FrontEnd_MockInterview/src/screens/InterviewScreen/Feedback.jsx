import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { ScrollArea } from "@/components/ui/scroll-area"
import {
  ArrowLeft,
  Target,
  TrendingUp,
  Award,
  CheckCircle2,
  AlertCircle,
  Download,
  Share2,
  RefreshCw,
  MessageSquare,
  BarChart3,
  ThumbsUp,
  XCircle,
  CheckCircle,
  Briefcase,
  FileText,
  Loader2,
} from "lucide-react"

import ApiEndPoints from "@/constants/endpoint"
import useFetchData from "@/hooks/Apihooks/useApiResponse"
import { useNavigate, useParams } from "react-router"

const FeedbackCard = ({
  question,
  feedback,
  userAnswer,
  rating,
  index,
}) => {
  const getScoreColor = (score) => {
    if (score >= 80) return "text-success"
    if (score >= 40) return "text-warning"
    return "text-destructive"
  }

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-success/10 border-success/20"
    if (score >= 40) return "bg-warning/10 border-warning/20"
    return "bg-destructive/10 border-destructive/20"
  }

  return (
    <Card className="bg-card/50 backdrop-blur-sm border-border/50 hover:shadow-md transition-all duration-200">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center gap-3 mb-2">
              <Badge variant="outline" className="text-xs">
                Question {index + 1}
              </Badge>
              <Badge variant="secondary" className={`text-xs ${getScoreColor(rating)}`}>
                {rating}/100
              </Badge>
            </div>
            <h3 className="text-lg font-medium text-foreground mb-2">{question}</h3>
          </div>
          <div className="flex items-center gap-2">
            {rating >= 40 ? (
              <CheckCircle className="w-5 h-5 text-success" />
            ) : (
              <XCircle className="w-5 h-5 text-destructive" />
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2">Your Answer:</h4>
          <div className={`rounded-lg p-3 text-sm border ${getScoreBg(rating)}`}>
            <p className="text-muted-foreground">{userAnswer}</p>
          </div>
        </div>
        <div>
          <h4 className="text-sm font-medium text-foreground mb-2 flex items-center gap-2">
            <MessageSquare className="w-4 h-4" />
            Feedback:
          </h4>
          <div className="text-sm text-muted-foreground">{feedback}</div>
        </div>
      </CardContent>
    </Card>
  )
}

const InterviewFeedback = () => {
  const {id} = useParams()
  const navigate = useNavigate()

  const { data, loading, error } = useFetchData(ApiEndPoints.GetInterviewFeedback.endPoint.replace(":id", id))
  const { data: interviewData } = useFetchData(ApiEndPoints.MockInterview.endPoint.replace(":id", id))
  console.log("Feedback Id:", id)
  console.log("Feedback Data:",data )

  if (loading) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center space-y-4">
          <Loader2 className="w-8 h-8 animate-spin mx-auto text-primary" />
          <p className="text-muted-foreground">Loading your feedback...</p>
        </div>
      </div>
    )
  }

  if (error || data.length === 0) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <Card className="max-w-md mx-auto">
          <CardContent className="text-center py-8">
            <AlertCircle className="w-12 h-12 text-destructive mx-auto mb-4" />
            <h2 className="text-xl font-semibold mb-2">Unable to Load Feedback</h2>
            <p className="text-muted-foreground mb-4">There was an error fetching your interview feedback.</p>
            <Button onClick={() => navigate("/dashboard")}>Return to Dashboard</Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  const feedbackData = data.data
  const score = feedbackData.filter((q) => q.rating >= 30).length
  const totalQuestions = feedbackData.length || 5
  const scorePercentage = totalQuestions > 0 ? (score / totalQuestions) * 100 : 0

  const averageRating =
    feedbackData.length > 0 ? feedbackData.reduce((sum, q) => sum + q.rating, 0) / feedbackData.length : 0
  const overallScore = Math.round((Math.floor(averageRating) / 100) * 100)

  const strengths = feedbackData
    .filter((q) => q.rating >= 4)
    .map((q) => `Strong performance in: ${q.question.substring(0, 50)}...`)
    .slice(0, 4)

  const improvements = feedbackData
    .filter((q) => q.rating < 3)
    .map((q) => `Needs improvement: ${q.question.substring(0, 50)}...`)
    .slice(0, 3)

  const getScoreColor = (score) => {
    if (score >= 80) return "text-success"
    if (score >= 60) return "text-warning"
    return "text-destructive"
  }

  const getScoreBg = (score) => {
    if (score >= 80) return "bg-success/10"
    if (score >= 60) return "bg-warning/10"
    return "bg-destructive/10"
  }

  const getGradeFromScore = (score) => {
    if (score >= 90) return "A+"
    if (score >= 80) return "A"
    if (score >= 70) return "B"
    if (score >= 60) return "C"
    return "D"
  }

  return (
      <div className="min-h-screen bg-background">
        {/* Header */}
        <div className="glass border-b border-border/50">
          <div className="container mx-auto px-6 py-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => navigate("/dashboard")}
                  className="text-muted-foreground hover:text-foreground"
                >
                  <ArrowLeft className="w-4 h-4 mr-2" />
                  Back to Dashboard
                </Button>
                <div className="h-6 w-px bg-border" />
                <div>
                  <h1 className="text-2xl font-bold text-foreground">Interview Feedback</h1>
                  <p className="text-muted-foreground">{interviewData?.JobPosition || "Interview Results"}</p>
                </div>
              </div>
              <div className="flex items-center gap-3">
                <Button variant="outline" size="sm">
                  <Download className="w-4 h-4 mr-2" />
                  Export Report
                </Button>
                <Button variant="outline" size="sm">
                  <Share2 className="w-4 h-4 mr-2" />
                  Share
                </Button>
                <Button variant="default" size="sm" onClick={() => navigate(`/interview/${id}/start`)}>
                  <RefreshCw className="w-4 h-4 mr-2" />
                  Retake Interview
                </Button>
              </div>
            </div>
          </div>
        </div>

        <div className="container mx-auto px-6 py-8">
          {/* Overall Score Section */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
            <Card className="lg:col-span-2 bg-card/50 backdrop-blur-sm border-border/50">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <CardTitle className="text-xl text-foreground">Overall Performance</CardTitle>
                  <Badge variant="outline" className="text-sm">
                    {score}/{totalQuestions} Correct
                  </Badge>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center gap-6 mb-6">
                  <div className="relative">
                    <div
                      className={`w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ${getScoreBg(overallScore)} ${getScoreColor(overallScore)}`}
                    >
                      {overallScore}%
                    </div>
                    <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2">
                      <Badge variant="secondary" className="text-xs font-medium">
                        Grade {getGradeFromScore(overallScore)}
                      </Badge>
                    </div>
                  </div>
                  <div className="flex-1">
                    <div className="grid grid-cols-2 gap-4">
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                        <div className="text-sm text-muted-foreground">Questions</div>
                      </div>
                      <div className="text-center">
                        <div className="text-2xl font-bold text-foreground">{averageRating}/100</div>
                        <div className="text-sm text-muted-foreground">Avg Rating</div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <div>
                    <div className="flex justify-between text-sm mb-2">
                      <span className="text-muted-foreground">Overall Progress</span>
                      <span className="font-medium text-foreground">{scorePercentage.toFixed(0)}%</span>
                    </div>
                    <Progress value={scorePercentage} className="h-2" />
                  </div>
                </div>
              </CardContent>
            </Card>

            <div className="space-y-6">
              {/* Job Information */}
              {interviewData && (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <Briefcase className="w-5 h-5 text-primary" />
                      Position Details
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div>
                      <p className="font-medium text-foreground">{interviewData.JobPosition}</p>
                      <p className="text-sm text-muted-foreground mt-1">{interviewData.JobDescription}</p>
                    </div>
                  </CardContent>
                </Card>
              )}

              {/* Strengths */}
              {strengths.length > 0 && (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <ThumbsUp className="w-5 h-5 text-success" />
                      Strengths
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {strengths.map((strength, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="w-4 h-4 text-success mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{strength}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}

              {/* Areas for Improvement */}
              {improvements.length > 0 && (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardHeader className="pb-3">
                    <CardTitle className="text-lg text-foreground flex items-center gap-2">
                      <TrendingUp className="w-5 h-5 text-warning" />
                      Areas for Improvement
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {improvements.map((area, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <AlertCircle className="w-4 h-4 text-warning mt-0.5 flex-shrink-0" />
                          <span className="text-muted-foreground">{area}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>

          {/* Detailed Analysis */}
          <Tabs defaultValue="questions" className="w-full">
            <TabsList className="bg-muted/50 p-1 rounded-lg mb-6">
              <TabsTrigger value="questions" className="rounded-md">
                Question Analysis ({feedbackData.length})
              </TabsTrigger>
              <TabsTrigger value="analytics" className="rounded-md">
                Performance Analytics
              </TabsTrigger>
            </TabsList>

            <TabsContent value="questions" className="space-y-4">
              {feedbackData.length > 0 ? (
                <ScrollArea className="min-h-[400px] pr-4">
                  <div className="space-y-4">
                    {feedbackData.map((question, index) => (
                      <FeedbackCard
                        key={question._id || index}
                        question={question.question}
                        feedback={question.feedback}
                        userAnswer={question.userAnswer}
                        rating={question.rating}
                        index={index}
                      />
                    ))}
                  </div>
                </ScrollArea>
              ) : (
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="text-center py-12">
                    <FileText className="w-12 h-12 text-muted-foreground mx-auto mb-4" />
                    <h2 className="text-lg font-medium text-foreground mb-2">No Answers Submitted</h2>
                    <p className="text-muted-foreground text-sm mb-4">
                      Please attempt the test again to receive detailed feedback.
                    </p>
                    <Button onClick={() => navigate(`/interview/${id}/start`)} className="mt-2">
                      <RefreshCw className="w-4 h-4 mr-2" />
                      Retake Interview
                    </Button>
                  </CardContent>
                </Card>
              )}
            </TabsContent>

            <TabsContent value="analytics" className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-primary/10">
                        <Target className="w-5 h-5 text-primary" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{overallScore}%</div>
                        <div className="text-sm text-muted-foreground">Overall Score</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-success/10">
                        <CheckCircle className="w-5 h-5 text-success" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{score}</div>
                        <div className="text-sm text-muted-foreground">Correct Answers</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-warning/10">
                        <BarChart3 className="w-5 h-5 text-warning" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{averageRating.toFixed(1)}</div>
                        <div className="text-sm text-muted-foreground">Avg Rating</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 backdrop-blur-sm border-border/50">
                  <CardContent className="p-4">
                    <div className="flex items-center gap-3">
                      <div className="p-2 rounded-lg bg-accent/10">
                        <Award className="w-5 h-5 text-accent" />
                      </div>
                      <div>
                        <div className="text-2xl font-bold text-foreground">{totalQuestions}</div>
                        <div className="text-sm text-muted-foreground">Total Questions</div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
  )
}

export default InterviewFeedback
