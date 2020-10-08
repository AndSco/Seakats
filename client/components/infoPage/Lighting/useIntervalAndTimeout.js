import { useEffect, useRef } from "react";

const useIntervalAndTimeout = (
  startingCondition,
  functionToBeDelayed,
  timeoutDelay,
  intervalDelay
) => {
  const initialisationFunction = useRef();
  const delayedFunction = useRef();
  let timeoutId;

  useEffect(() => {
    initialisationFunction.current = startingCondition;
    delayedFunction.current = functionToBeDelayed;
  }, [startingCondition, functionToBeDelayed]);

  useEffect(() => {
    const functionToPerform = () => {
      initialisationFunction.current();
      timeoutId = setTimeout(() => {
        delayedFunction.current();
      }, timeoutDelay);
    };

    if (intervalDelay != null) {
      // this runs the function already once at the beginning, then starts the intervals
      functionToPerform();
      let intervalId = setInterval(functionToPerform, intervalDelay);
      return () => {
        clearTimeout(timeoutId);
        clearInterval(intervalId);
      };
    }
  }, [intervalDelay]);
};

export default useIntervalAndTimeout;
