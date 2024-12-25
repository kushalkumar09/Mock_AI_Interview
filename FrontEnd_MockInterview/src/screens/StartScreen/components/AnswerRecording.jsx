import ApiEndPoints from "@/constants/endpoint";
import { usePromptResponse } from "@/hooks/Apihooks/usePromptResponse";
import { Mic } from "lucide-react";
import React, { useEffect, useState } from "react";
import useSpeechToText from "react-hook-speech-to-text";
import Webcam from "react-webcam";

const AnswerRecording = ({ data, currentQuestion }) => {
  const [recording, setRecording] = useState(true);
  const [useranswer, setUserAnswer] = useState("");
  const prompt = {
    question: data?.InterviewQuestions[currentQuestion].question,
    userAnswer: useranswer,
  };
  const { endPoint, method } = ApiEndPoints?.AiFeedback;
  const { response, fetchData } = usePromptResponse(endPoint, method);
  const { error, isRecording, results, startSpeechToText, stopSpeechToText } =
    useSpeechToText({
      continuous: true,
      useLegacyResults: false,
    });

  // useEffect(() => {
  //   console.table(results);
  //   results.map((result) => setUserAnswer((prev) => prev + result.transcript));
  // }, [results]);

  useEffect(() => {
    // Check if results have any transcripts
    if (results.length > 0) {
      const newAnswer = results.reduce(
        (acc, result) => acc + result.transcript + " ",
        ""
      );
      setUserAnswer(newAnswer.trim());
    }
  }, [results]);

  useEffect(() => {
    results.length = 0;
    setUserAnswer("");
  }, [currentQuestion]);

  const saveUserAnswer = () => {
    if (isRecording) {
      console.log("recording stopped for question");
      console.table(prompt);
      fetchData(prompt);
      stopSpeechToText();
    } else {
      console.log("recording started for question");
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
    <div>
      <div className="flex flex-col min-h-[300px] items-center justify-center bg-black p-5 mx-10 rounded-md">
        {recording ? (
          <Webcam
            onUserMedia={() => setRecording(true)}
            onUserMediaError={() => setRecording(false)}
            mirrored
            style={{ height: 300, width: "100%", padding: 25 }}
          />
        ) : (
          <div className="flex items-center justify-center h-[30px] w-fit p-5  bg-red-500 text-white font-bold ">
            Camera Not Permitted
          </div>
        )}
      </div>
      <div>
        <button
          className={`px-8 py-2 border rounded-lg mt-5 ${
            isRecording ? "bg-red-500" : "bg-green-500"
          } text-white`}
          onClick={saveUserAnswer}
        >
          <h1 className="flex gap-1 text-center font-medium text-white text-lg ">
            <Mic></Mic>
            {isRecording ? "Stop Recording..." : "Start Recording"}
          </h1>
        </button>
        <button onClick={() => console.log(useranswer)}>show on console</button>
      </div>
    </div>
  );
};

export default AnswerRecording;
