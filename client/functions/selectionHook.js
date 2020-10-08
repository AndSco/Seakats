import { useState } from "react";

const selectionHook = () => {
  const [whatIsSelected, setWhatIsSelected] = useState("");

  const setAsSelected = heading => {
    setWhatIsSelected(heading);
  };

  return [whatIsSelected, setAsSelected];
};

export default selectionHook;
