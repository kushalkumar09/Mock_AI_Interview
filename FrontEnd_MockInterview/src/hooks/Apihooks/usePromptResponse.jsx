import ApiEndPoints from "@/constants/endpoint";
import { useState } from "react";
export const usePromptResponse = () => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mockId, setMockId] = useState("");

  const fetchData = async (prompt) => {
    
    setLoading(true);
    setError("");
    try {
      const res = await fetch(ApiEndPoints.AiResponse.endPoint, {
        method: ApiEndPoints.AiResponse.method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({prompt}), // Send the dynamic prompt
      });

      const data = await res.json();
      console.log(data);
      setResponse(data?.data || "No data returned");
      setMockId(data?.mockId || "");
    } catch (error) {
      console.error("Error fetching data:", error);
      setError("Error fetching data");
    } finally {
      setLoading(false);
    }
  };


  // Fetch data whenever the prompt changes
  return { response, loading, error,fetchData, mockId };
}; 