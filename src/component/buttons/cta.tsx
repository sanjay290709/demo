import { styled } from "@mui/material";
import { useThemeContext } from "../../context/ThemeContext";
interface ButtonProps {
  mode: any;
}
const NextButton = styled('button')<ButtonProps>(({ theme , mode}) => ({
  borderRadius: '20px',
  padding: "8px 30px",
  background:mode === 'dark' ? '#0082FB' : '#01AAE9',
  color : "#F2F4F4",
  fontSize: "18px",
  borderColor: "#fff"
}));
const PreviousButton = styled('button')<ButtonProps>(({ theme, mode }) => ({
  borderRadius: '20px',
  padding: "8px 30px",
  background:mode === 'dark' ?   '#363641' : '#fff',
  color :mode === 'dark' ? "#F2F4F4" : '#000',
  fontSize: "18px",
  borderColor: "#fff"
}));
export const NextActionButton = ({ children }) => {
  const {mode} = useThemeContext()
  return <NextButton type="submit" mode={mode}>{children}</NextButton>;
};
export const PreviousActionButton = ({ children  , handleClick}) => {
  const {mode} = useThemeContext()
  return <PreviousButton mode={mode} onClick={handleClick} type="button">{children}</PreviousButton>;
};


