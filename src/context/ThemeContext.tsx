import { createContext, ReactNode, useMemo, useState, useContext } from "react";
import { createTheme, ThemeProvider, Theme } from "@mui/material/styles";

interface ThemeContextProps {
  mode: "light" | "dark";
  toggleTheme: () => void;
}

const ThemeContext = createContext<ThemeContextProps | undefined>(undefined);

export const useThemeContext = (): ThemeContextProps => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error(
      "useThemeContext must be used within a ThemeProviderWrapper"
    );
  }
  return context;
};

interface ThemeProviderWrapperProps {
  children: ReactNode;
}

const ThemeProviderWrapper: React.FC<ThemeProviderWrapperProps> = ({
  children,
}) => {
  const [mode, setMode] = useState<"light" | "dark">("light");
  const toggleTheme = () => {
    setMode((prevMode) => (prevMode === "light" ? "dark" : "light"));
  };

  const theme: Theme = useMemo(
    () =>
      createTheme({
        palette: {
          error: {
            main: "#FF0266", // Customize the error color in the theme
          },
        },
        components: {
          MuiTypography: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "#F2F4F4" : "#121212",
              },
            },
          },
          MuiOutlinedInput: {
            styleOverrides: {
              root: {
                backgroundColor: mode === "dark" ? "#6A6A7A" : "#fff", // Set your desired background color
                maxHeight: "40px",
                color: mode === "dark" ? "#f2f2f2" : "#121212",
                "& .MuiOutlinedInput-input": {
                  padding: "8.5px 14px",
                },
                marginTop: "0px !important"
              },
            },
          },
          MuiFormLabel: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "#f2f2f2 !important" : "#121212 !important", // Use the error.main color for the label text
              },
            },
          },
          MuiFormHelperText: {
            styleOverrides: {
              root: ({ theme }) => ({
                color: theme.palette.error.main,
              }),
            },
          },
          MuiCheckbox: {
            styleOverrides: {
              root: {
                color:  mode === "dark" ? "#f2f4f4" : '#121212', // Default color when unchecked
                "&.Mui-checked": {
                  color: "#FF0266", // Checked color
                },
              },
            },
          },
          MuiChip: {
            styleOverrides: {
              root: {
                color: mode === "dark" ? "#F2F4F4" : "#121212",
              }
            }
          }
        },
      }),
    [mode]
  );

  return (
    <ThemeContext.Provider value={{ mode, toggleTheme }}>
      <ThemeProvider theme={theme}>{children}</ThemeProvider>
    </ThemeContext.Provider>
  );
};

export default ThemeProviderWrapper;
