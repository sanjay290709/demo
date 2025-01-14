import React from "react";
import ReactDOM from "react-dom/client";
import reportWebVitals from "./reportWebVitals";
import { BrowserRouter as Router } from "react-router-dom";
import ThemeProviderWrapper from "./context/ThemeContext";
import { Provider } from "react-redux";
import App from "./App";
import { store } from "./app/store";
import { ModalProvider } from "./context/ModalContext";
import { DocUrlProvider } from "./context/DocUrlContext";
import { ProgressProvider } from "./context/ProgressContext";
import { ToastProvider } from "./context/ToastContext";
import "./index.css";
//NOCHANGES
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <Provider store={store}>

      <ThemeProviderWrapper>
        <ModalProvider>
          <DocUrlProvider>
            <ProgressProvider>
              <ToastProvider>
                <Router>
                  <App />
                </Router>
              </ToastProvider>
            </ProgressProvider>
          </DocUrlProvider>
        </ModalProvider>
      </ThemeProviderWrapper>
    </Provider>
  </React.StrictMode>
);
 
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();