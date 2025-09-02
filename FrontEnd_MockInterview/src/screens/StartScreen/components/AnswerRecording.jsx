import { Button } from "@/components/ui/button";
import ApiEndPoints from "@/constants/endpoint";
import { usePromptResponse } from "@/hooks/Apihooks/usePromptResponse";
import { useToast } from "@/hooks/use-toast";
import { Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import { useNavigate } from "react-router";
import Webcam from "react-webcam";

const AnswerRecording = ({ data, currentQuestion, handleActiveQuestion }) => {
  const { toast } = useToast();
  const [recording, setRecording] = useState(true);
  const [useranswer, setUserAnswer] = useState("");
  const navigate = useNavigate();
  const prompt = {
    question: data?.InterviewQuestions[currentQuestion].question,
    userAnswer: useranswer,
    mockId: data?.mockInterviewId,
    questionNumber: currentQuestion,
  };
  const { endPoint, method } = ApiEndPoints?.AiFeedback;
  const { fetchData } = usePromptResponse(endPoint, method);
  const {
    error,
    isRecording,
    results,
    startSpeechToText,
    stopSpeechToText,
    setResults,
  } = useSpeechToText({
    continuous: true,
    useLegacyResults: false,
  });

  useEffect(() => {
    if (results.length >0) {
      const newAnswer = results.reduce(
        (acc, result) => acc + result.transcript + " ",
        ""
      );
      setUserAnswer(newAnswer.trim());
    }
  }, [results]);

  useEffect(() => {
    stopSpeechToText();
    setResults([]);
    setUserAnswer("");
  }, [currentQuestion]);

  const saveUserAnswer = () => {
    if (isRecording) {
      stopSpeechToText();
      if (prompt.userAnswer && useranswer.length > 10) {
        fetchData(prompt);
        toast({
          description: "Your Answer is saved",
        });
      } else {
        toast({
          description: "Answer Not Recorded",
        });
        return;
      }
    } else {
      setResults([]);
      startSpeechToText();
    }
  };

  if (error)
    return (
      <p>
        Web Speech API is not available in this browser 🤷‍.Try to Open in
        chrome
      </p>
    );
  return (
    <div className="flex flex-col items-center justify-around w-full h-full p-5 space-y-5 bg-gray-800 rounded-md">
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
      <div className="flex flex-col items-center space-y-3">
        <Button
        variant="outline"
          className={`border rounded-lg ${
            isRecording ? "bg-red-500" : "bg-green-500"
          } text-white`}
          onClick={saveUserAnswer}
        >
          <h1 className="flex items-center gap-2 text-lg font-medium">
            <Mic />
            {isRecording ? "Stop Recording" : "Start Recording"}
          </h1>
        </Button >
        <div className="flex space-x-4">
          <Button
            variant="outline"
            disabled={currentQuestion === 0}
            onClick={() => {
              if (currentQuestion > 0) {
                handleActiveQuestion(currentQuestion - 1);
              }
            }}
          >
            Previous Question
          </Button>
          <Button
            variant="danger"
            className={`${currentQuestion===data?.InterviewQuestions.length-1?"bg-red-600 text-white":"bg-blue-600 text-white"} `}
            onClick={() => {
              if (currentQuestion < data?.InterviewQuestions.length - 1) {
                fetchData(prompt);
                toast({
                  description: "You Did not Answered the Question",
                });
                handleActiveQuestion(currentQuestion + 1);
              } else if (
                currentQuestion ===
                data?.InterviewQuestions.length - 1
              ) {
                if(prompt.userAnswer.length==0 || prompt.userAnswer.length<10){
                  toast({
                    description: "You Did not Answered the Question",
                  });
                  fetchData(prompt);
                }
                navigate(`/interview/${data?.mockInterviewId}/feedback`);
              }
            }}
          >
            {(currentQuestion+1===data?.InterviewQuestions.length)?"End Interview":"Next Question"}
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AnswerRecording;
