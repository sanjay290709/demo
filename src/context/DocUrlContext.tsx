import { createContext, useState, useContext, ReactNode } from "react";

// Define the shape of the context value
interface DocUrlContextType {
  docUrl: string;
  setDocUrl: React.Dispatch<React.SetStateAction<string>>;
}

// Create a Context for docUrl
const DocUrlContext = createContext<DocUrlContextType | undefined>(undefined);

// Create a Provider component
interface DocUrlProviderProps {
  children: ReactNode;
}

export const DocUrlProvider: React.FC<DocUrlProviderProps> = ({ children }) => {
  const [docUrl, setDocUrl] = useState<string>("");

  return (
    <DocUrlContext.Provider value={{ docUrl, setDocUrl }}>
      {children}
    </DocUrlContext.Provider>
  );
};

// Custom hook to use docUrl context
export const useDocUrl = (): DocUrlContextType => {
  const context = useContext(DocUrlContext);
  if (!context) {
    throw new Error("useDocUrl must be used within a DocUrlProvider");
  }
  return context;
};
