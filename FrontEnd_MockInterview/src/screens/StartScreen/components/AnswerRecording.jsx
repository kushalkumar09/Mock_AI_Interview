import { Button } from "@/components/ui/button";
import ApiEndPoints from "@/constants/endpoint";
import { usePromptResponse } from "@/hooks/Apihooks/usePromptResponse";
import { useToast } from "@/hooks/use-toast";
import { Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import SpeechRecognition, { useSpeechRecognition } from "react-speech-recognition";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";

const AnswerRecording = ({ data, currentQuestion, handleActiveQuestion }) => {
  const { toast } = useToast();
  const [recording, setRecording] = useState(true);
  const [useranswer, setUserAnswer] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [savingFeedback, setSavingFeedback] = useState(false);
  const navigate = useNavigate();

  const prompt = {
    question: data?.InterviewQuestions[currentQuestion].question,
    userAnswer: useranswer,
    mockId: data?.mockInterviewId,
    questionNumber: currentQuestion,
  };

  const { endPoint, method } = ApiEndPoints?.AiFeedback;
  const { endPoint: scoreEndPoint, method: scoreMethod } =
    ApiEndPoints?.UpdateInterviewScore;
  const { fetchData } = usePromptResponse(endPoint, method);

  // speech recognition setup
  const startListening = () =>
    SpeechRecognition.startListening({ continuous: true, language: "en-US" });
  const stopListening = () => SpeechRecognition.stopListening();

  const { transcript, browserSupportsSpeechRecognition, resetTranscript } = useSpeechRecognition();

  // keep useranswer synced with transcript (debounced)
  useEffect(() => {
    const handler = setTimeout(() => {
      if (transcript) {
        setUserAnswer(transcript.trim());
      }
    }, 300); // debounce to avoid too many re-renders
    return () => clearTimeout(handler);
  }, [transcript]);

  // reset state when moving to next question
  useEffect(() => {
    stopListening();
    setIsRecording(false);
    setUserAnswer("");
    resetTranscript();
  }, [currentQuestion]);

  const handleQuestionNavigation = async () => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);
    }

    if (!useranswer || useranswer.length < 10) {
      toast({ description: "Please provide a longer answer before moving on." });
      return;
    }

    try {
      setSavingFeedback(true); // start saving feedback
      await fetchData(prompt);  // wait until feedback is saved
      setSavingFeedback(false); // done saving

      const totalQuestions = data?.InterviewQuestions.length;

      // Navigate forward
      if (currentQuestion < totalQuestions - 1) {
        handleActiveQuestion(currentQuestion + 1);
        return;
      }

      // Last question: update score
      const res = await fetch(scoreEndPoint.replace(":id", data?.mockInterviewId), {
        method: scoreMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (res.ok) {
        console.log("Score updated:", result.data.InterviewScore.userScore);
      } else {
        console.error("Error updating score:", result.message);
      }

      navigate(`/interview/${data?.mockInterviewId}/feedback`);
    } catch (error) {
      setSavingFeedback(false);
      console.error("Error saving feedback:", error);
      toast({ description: "Failed to save feedback. Please try again." });
    }
  };


  const saveUserAnswer = async() => {
    if (isRecording) {
      stopListening();
      setIsRecording(false);

      if (useranswer && useranswer.length > 10) {
        const savingFeedback = await fetchData(prompt);
        toast({ description: "Your Answer is saved" });
      } else {
        toast({ description: "Answer too short, not saved" });
      }
    } else {
      startListening();
      setIsRecording(true);
    }
  };

  const handleSkipQuestion = async () => {
  if (isRecording) {
    stopListening();
    setIsRecording(false);
  }

  try {
    setSavingFeedback(true);

    // Save feedback for skipped question
    await fetchData(prompt);

    const totalQuestions = data?.InterviewQuestions.length;

    if (currentQuestion < totalQuestions - 1) {
      toast({ description: "You skipped this question." });
      handleActiveQuestion(currentQuestion + 1);
    } else {
      // Last question: update score
      const res = await fetch(scoreEndPoint.replace(":id", data?.mockInterviewId), {
        method: scoreMethod,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
      });
      const result = await res.json();
      if (res.ok) {
        console.log("Score updated:", result.data.InterviewScore.userScore);
      } else {
        console.error("Error updating score:", result.message);
      }
      toast({ description: "Skipped last question, feedback saved." });
      navigate(`/interview/${data?.mockInterviewId}/feedback`);
    }
  } catch (error) {
    console.error("Error saving skipped feedback:", error);
    toast({ description: "Failed to save skipped feedback. Please try again." });
  } finally {
    setSavingFeedback(false);
  }
};


  if (!browserSupportsSpeechRecognition) {
    return <span>Browser doesn't support speech recognition.</span>;
  }

  return (
    <div className="flex flex-col items-center justify-around w-full h-full p-5 space-y-5 bg-gray-800 rounded-md">
      {/* Camera / Webcam */}
      <div className="flex flex-col items-center justify-center w-full min-h-60 max-h-72 bg-black rounded-md">
        {recording ? (
          <Webcam
            onUserMedia={() => setRecording(true)}
            onUserMediaError={() => setRecording(false)}
            mirrored
            className="w-full h-full rounded-md"
          />
        ) : (
          <div className="flex items-center justify-center w-full h-full p-5 bg-background text-white font-bold rounded-md">
            Camera Not Permitted
          </div>
        )}
      </div>

      {/* Controls */}
      <div className="flex flex-col items-center space-y-3">
        {/* Question counter */}
        <div className="text-gray-300">
          Question {currentQuestion + 1} of {data?.InterviewQuestions.length}
        </div>

        <Button
          variant="outline"
          className={`border rounded-lg ${
            isRecording ? "bg-red-500" : "bg-green-500"
          } text-white`}
          onClick={saveUserAnswer}
        >
          <h1 className="flex items-center gap-2 text-lg font-medium">
            <Mic />
            {!isRecording && "Start Recording"}
            {isRecording && (
              <span className="text-red-400 animate-pulse">Recording...</span>
            )}
          </h1>
        </Button>

        <div className="flex space-x-4">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => {
              if (currentQuestion > 0) {
                stopListening();
                setIsRecording(false);
                handleActiveQuestion(currentQuestion - 1);
              }
            }}
          >
            Previous Question
          </Button>
          <Button
            variant="outline"
            className="bg-yellow-500 text-white"
            onClick={handleSkipQuestion}
          >
            Skip Question
          </Button>
          <Button
            variant="danger"
            disabled={savingFeedback}
            className={`${
              currentQuestion === data?.InterviewQuestions.length - 1
                ? "bg-red-600 text-white"
                : "bg-blue-600 text-white"
            }`}
            onClick={handleQuestionNavigation}
          >
            {currentQuestion + 1 === data?.InterviewQuestions.length
              ? "End Interview"
              : "Next Question"}
          </Button>
          
        </div>

        {/* Transcript preview */}
        <div className="text-white mt-2" aria-live="polite">
          {useranswer || (isRecording ? "Listening..." : "No answer yet")}
        </div>
      </div>
    </div>
  );
};

export default AnswerRecording;
