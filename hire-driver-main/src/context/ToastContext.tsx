import { createContext, useContext, ReactNode } from 'react';
import { toast, ToastContainer, ToastOptions } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

// Define the context type
interface ToastContextType {
  success: (message: string, options?: ToastOptions) => void;
  error: (message: string, options?: ToastOptions) => void;
  info: (message: string, options?: ToastOptions) => void;
  // warning: (message: string, options?: ToastOptions) => void;
}

// Create the ToastContext
const ToastContext = createContext<ToastContextType | undefined>(undefined);

// Create a provider component
interface ToastProviderProps {
  children: ReactNode;
}

export const ToastProvider: React.FC<ToastProviderProps> = ({ children }) => {
  const success = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const error = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  const info = (message: string, options?: ToastOptions) => {
    toast.info(message, options);
  };



  return (
    <ToastContext.Provider value={{ success, error, info }}>
      {children}
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </ToastContext.Provider>
  );
};

export const useToast = (): ToastContextType => {
  const context = useContext(ToastContext);
  if (!context) {
    throw new Error('useToast must be used within a ToastProvider');
  }
  return context;
};
