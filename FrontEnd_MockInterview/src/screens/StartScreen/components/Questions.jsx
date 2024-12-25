import { Lightbulb, Volume2 } from "lucide-react";
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
      <h1 className="text-left font-bold text-4xl mb-10 text-gray-900">
        Questions
      </h1>
      <div className="flex gap-4 flex-wrap">
        {questions.map((_, index) => (
          <span
            onClick={() => handleActiveQuestion(index)}
            key={index}
            className={`flex items-center justify-center h-12 w-12 ${
              index === currentQuestion ? "bg-blue-600" : "bg-gray-300"
            } text-white font-bold rounded-full shadow-md transform transition-transform duration-300 hover:scale-110 cursor-pointer`}
            aria-label={`Question ${index + 1}`}
          >
            {index + 1}
          </span>
        ))}
      </div>
      <div className="text-justify mt-8 text-gray-800 font-medium text-lg leading-relaxed bg-white p-6 rounded-lg shadow-md">
        {questions[currentQuestion].question}
      </div>
      <Volume2
        onClick={() => textToSpeech(questions[currentQuestion].question)}
        className="cursor-pointer mt-4 text-blue-600 hover:text-blue-800 transition-colors duration-300"
        aria-label="Read question aloud"
      />
      <div className="bg-blue-100 p-6 mt-8 rounded-lg shadow-md flex flex-col items-start gap-4">
        <div>
          <span className="font-bold text-gray-900 flex items-center gap-1">
            <Lightbulb className="text-yellow-500 mt-1" />
            NOTE:
          </span>
          <p className="text-gray-700 mt-2 text-justify">
            Click on record Answer when you want to record the answer. We will
            provide you feedback and rating for your answer at the end of the
            interview.
          </p>
        </div>
      </div>
    </>
  );
};

export default Questions;
