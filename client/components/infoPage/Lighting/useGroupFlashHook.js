import { useEffect } from "react";

const useGroupFlashHook = (
  conditionsArray,
  callback,
  delay,
  hookDependenciesArray
) => {
  let timeoutId;
  const allConditionsAreSatisfied = conditionsArray.every(
    condition => !!condition
  );

  useEffect(() => {
    const functionToPerform = () => {
      if (allConditionsAreSatisfied) {
        timeoutId = setTimeout(callback, delay);
      }
    };

    if (delay != null) {
      functionToPerform();
      return () => clearTimeout(timeoutId);
    }
  }, hookDependenciesArray);
};

export default useGroupFlashHook;
