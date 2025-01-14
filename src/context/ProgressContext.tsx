// src/ProgressContext.js
import  { createContext, useState, useContext } from "react";

const ProgressContext = createContext(null);

export const useProgress = () => {
  return useContext(ProgressContext);
};

export const ProgressProvider = ({ children }: {children: any}) => {
  const [progress, setProgress] = useState(0); // Initial progress value is 0
  
  const updateProgress = (value: number) => {
    setProgress(value);
  };

  return (
    <ProgressContext.Provider value={{ progress, updateProgress }}>
      {children}
    </ProgressContext.Provider>
  );
};
