import { useEffect, useRef } from "react";

const useTimeout = (callback, delay) => {
  const savedCallback = useRef();

  useEffect(() => {
    savedCallback.current = callback;
  }, [callback]);

  useEffect(() => {
    const functionToPerform = () => {
      savedCallback.current();
    };

    if (delay != null) {
      let timeoutId = setTimeout(functionToPerform, delay);
      return () => clearTimeout(timeoutId);
    }
  }, [delay]);
};

export default useTimeout;
