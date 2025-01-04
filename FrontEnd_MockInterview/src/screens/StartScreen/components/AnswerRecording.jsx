import ApiEndPoints from "@/constants/endpoint";
import { usePromptResponse } from "@/hooks/Apihooks/usePromptResponse.jsx";
import { useToast } from "@/hooks/use-toast";
import { Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

const AnswerRecording = ({ data, currentQuestion, handleActiveQuestion }) => {
  const { toast } = useToast();
  const [recording, setRecording] = useState(true);
  const [useranswer, setUserAnswer] = useState("");
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
          <div className="flex items-center justify-center w-full h-full p-5 bg-red-500 text-white font-bold rounded-md">
            Camera Not Permitted
          </div>
        )}
      </div>
      <div className="flex flex-col items-center space-y-3">
        <button
          className={`px-8 py-2 border rounded-lg ${
            isRecording ? "bg-red-500" : "bg-green-500"
          } text-white`}
          onClick={saveUserAnswer}
        >
          <h1 className="flex items-center gap-2 text-lg font-medium">
            <Mic />
            {isRecording ? "Stop Recording" : "Start Recording"}
          </h1>
        </button>
        <div className="flex space-x-4">
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => {
              if (currentQuestion > 0) {
                handleActiveQuestion(currentQuestion - 1);
              }
            }}
          >
            Previous Question
          </button>
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg"
            onClick={() => {
              if (currentQuestion < data?.InterviewQuestions.length - 1) {
                handleActiveQuestion(currentQuestion + 1);
              } else if (
                currentQuestion ===
                data?.InterviewQuestions.length - 1
              ) {
                window.location.href = `/interview/${data?.mockInterviewId}/feedback`;
              }
            }}
          >
            {(currentQuestion+1===data?.InterviewQuestions.length)?"End Interview":"Next Question"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default AnswerRecording;
