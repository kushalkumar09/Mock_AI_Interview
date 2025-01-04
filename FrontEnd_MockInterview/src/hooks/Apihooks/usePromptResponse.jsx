
import { useState } from "react";
export const usePromptResponse = (endpoint, method) => {
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [mockId, setMockId] = useState("");

  const fetchData = async (prompt) => {
    setLoading(true);
    setError("");
    try {
      const res = await fetch(endpoint, {
        method: method,
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ prompt }), // Send the dynamic prompt
      });

      const data = await res.json();
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
  return { response, loading, error, fetchData, mockId };
};
