import { useState, useCallback, useEffect } from "react";
import axios from "axios";
import apiURL from "../assets/apiUrl";

const useGetOpenPaddles = () => {
  const [paddlingNow, setPaddlingNow] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const getOpenPaddles = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await axios.get(`${apiURL}/api/session/currentlyOpen`);
      const openPaddles = await response.data;
      setPaddlingNow(openPaddles);
      setIsLoading(false);
    } catch (err) {
      setIsLoading(false);
      throw err;
    }
  }, []);

  useEffect(() => {
    getOpenPaddles();
  }, [getOpenPaddles]);

  useEffect(() => console.log("open paddles", paddlingNow), [paddlingNow]);

  return [paddlingNow, isLoading];
};

export default useGetOpenPaddles;
