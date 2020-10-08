import { useEffect, useRef } from "react";

const useInterval = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const functionToPerform = () => {
      savedCallback.current();
    };

    if (delay != null) {
      let intervalId = setInterval(functionToPerform, delay);
      return () => clearInterval(intervalId);
    }
  }, [delay]);
};

export default useInterval;
