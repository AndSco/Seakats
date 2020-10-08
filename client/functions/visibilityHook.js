import { useState } from "react";

const visibilityHook = () => {
  const [isVisible, setIsVisible] = useState(false);
  const toggleVisibility = () => setIsVisible(!isVisible);
  return [isVisible, toggleVisibility];
};

export default visibilityHook;
