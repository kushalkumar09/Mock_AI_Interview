import { Volume2 } from "lucide-react";
import { useEffect } from "react";

const Questions = ({ data, handleActiveQuestion, currentQuestion }) => {
  // Ensure data is valid before proceeding
  const questions = data?.InterviewQuestions || [];

  // Text-to-speech function
  const textToSpeech = (text) => {
    const synth = window.speechSynthesis;
    if (!synth) {
      console.warn("Web Speech API is not available in this browser 🤷");
      return;
    }
    if (synth.speaking) {
      synth.cancel();
      return;
    }
    const utterance = new SpeechSynthesisUtterance(text);
    synth.speak(utterance);
  };

  // Effect to cancel speech synthesis when the active question changes
  useEffect(() => {
    const synth = window.speechSynthesis;
    if (synth && synth.speaking) {
      synth.cancel();
    }
  }, [currentQuestion]);

  // Return null if there are no questions
  if (questions.length === 0) return null;

  return (
    <>
      <h1 className="text-left font-bold text-2xl mb-6">Questions</h1>
      <div className="flex gap-6">
        {questions.map((_, index) => (
          <span
            onClick={() => handleActiveQuestion(index)}
            key={index}
            className={`flex items-center justify-center h-8 w-8 ${
              index === currentQuestion ? "bg-blue-500" : "bg-green-500"
            } text-white font-bold rounded-full border ${
              index === currentQuestion ? "border-blue-600" : "border-green-600"
            } cursor-pointer`}
            aria-label={`Question ${index + 1}`}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <div className="text-justify mt-8 text-gray-600 font-medium text-xl">
        {questions[currentQuestion].question}
      </div>
      <Volume2
        onClick={() => textToSpeech(questions[currentQuestion].question)}
        className="cursor-pointer"
        aria-label="Read question aloud"
      />
    </>
  );
};

export default Questions;
