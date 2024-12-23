import { useState, useEffect } from 'react';

const useFetchData = (endpoint) => {
  // States to track loading, data, and errors
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch the data from the endpoint when the component mounts or the endpoint changes
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError(null); 

      try {
        const response = await fetch(endpoint);

        // Check if the response is successful
        if (!response.ok) {
          throw new Error(`Error: ${response.statusText}`);
        }

        // Parse the response data
        const result = await response.json();
        setData(result);
      } catch (err) {
        setError(err.message); // Set the error message if there's an error
      } finally {
        setLoading(false); // Stop loading once the fetch is done
      }
    };

    fetchData();
  }, [endpoint]); // Rerun the effect if the endpoint changes

  return { data, loading, error };
};

export default useFetchData;
