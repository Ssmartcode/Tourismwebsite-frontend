import { useState, useCallback } from "react";
import axios from "axios";

const useHttpRequest = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const sendRequest = useCallback(
    async (method, url, data = {}, headers = {}) => {
      setIsLoading(true);
      try {
        const response = await axios({
          method,
          url,
          data,
          headers,
        });
        setIsLoading(false);
        setError(null);
        return response;
      } catch (err) {
        if (!err.response) setError(err.message);
        else setError(err.response.data.message);
      }
      setIsLoading(false);
    },
    []
  );

  return { sendRequest, error, isLoading };
};

export default useHttpRequest;
