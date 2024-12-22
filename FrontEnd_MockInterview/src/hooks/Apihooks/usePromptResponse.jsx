import { useState } from "react";

export const usePromptResponse = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = async (prompt) => {
    console.log(prompt)
    const {YearOfExperience,JobPosition,JobDescription} = prompt;
    const newPrompt = `Job Position : ${JobPosition}, Job Description: ${JobDescription}, Year of experience:${YearOfExperience}. Depends on the information generate 5 Interview question and answer . generate question and answer as  json field in response`
    console.log(newPrompt);
    setLoading(true);
    setError("");
    try {
      const res = await fetch("http://localhost:3000/res", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ newPrompt }), // Send the dynamic prompt
      });

      const data = await res.json();
      console.log(data);
      setResponse(data?.data || "No data returned");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  // Fetch data whenever the prompt changes
  return { response, loading, error,fetchData };
}; 