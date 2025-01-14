import { InputLabel, Typography, FormLabel } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
const Asterisk = (
  <Typography component="span" color="#FF0266" sx={{ fontSize: "24px" }}>
    *
  </Typography>
);
export const InputLabels = ({
  label,
  error,
  htmlFor,
}: {
  label: string;
  error: any;
  htmlFor: string;
}) => {
  const { mode } = useThemeContext();

  return (
    <InputLabel
      htmlFor={htmlFor}
      error={!!error}
      sx={{
        marginBottom: "8px",
        fontWeight: "bold",
        color: mode === "dark" ? "#F2F4F4" : "#121212",
      }}
    >
      {label} {Asterisk}
    </InputLabel>
  );
};

export const FormLabels = ({ children, Required }) => {
  return (
    <FormLabel
      sx={{
        color: "#fff",
        fontSize: "0.9rem",
        fontWeight: "bold",
        mb: 1,
        textWrap: "nowrap",
      }}
    >
      {children} {Required && Asterisk}
    </FormLabel>
  );
};

export const InputLabelsWithoutAsterisk = ({
  label,
  error,
  htmlFor,
}: {
  label: string;
  error: any;
  htmlFor: string;
}) => {
  const { mode } = useThemeContext();

  return (
    <InputLabel
      htmlFor={htmlFor}
      error={!!error}
      sx={{
        marginBottom: "8px",
        fontWeight: "bold",
        color: mode === "dark" ? "#F2F4F4" : "#121212",
      }}
    >
      {label}{" "}
      <Typography component="span" color="#FF0266" sx={{ fontSize: "24px" , opacity: -1}}>
        *
      </Typography>
    </InputLabel>
  );
};

export const InputLabelX = ({
  label,

  htmlFor,
}: {
  label: string;
  htmlFor: string;
}) => {
  const { mode } = useThemeContext();

  return (
    <InputLabel
      htmlFor={htmlFor}
      sx={{
        marginBottom: "8px",
        fontWeight: "bold",
        color: mode === "dark" ? "#F2F4F4" : "#121212",
      }}
    >
      {label} {Asterisk}
    </InputLabel>
  );
};

export const InputAsterisk = ({
  label,

  htmlFor,
}: {
  label: string;
  htmlFor: string;
}) => {
  const { mode } = useThemeContext();

  return (
    <InputLabel
      htmlFor={htmlFor}
      sx={{
        marginBottom: "8px",
        fontWeight: "bold",
        color: mode === "dark" ? "#F2F4F4" : "#121212",
      }}
    >
      {label} 
    </InputLabel>
  );
};

