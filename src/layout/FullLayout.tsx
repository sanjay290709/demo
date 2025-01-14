import { Box, Divider, Typography, styled } from "@mui/material";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import LinearProgress, {
  linearProgressClasses,
} from "@mui/material/LinearProgress";
import { useThemeContext } from "../context/ThemeContext";
import { useProgress } from "../context/ProgressContext";
import { selectProgresStep } from "../features/api/globalStateSlice";
import { useAppSelector } from "../app/hooks";
export const StyledExlamationIcon = styled("i")(() => ({
  fontSize: "16px", // Adjust the size
  color:"#121212", // Gold color for a star
  margin: "0 8px", // Add some margin
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)", // Add a hover effect
  },
  cursor: "pointer",
}));
const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor: theme.palette.grey[200],
    ...theme.applyStyles("dark", {
      backgroundColor: theme.palette.grey[800],
    }),
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor: "#1a90ff",
    ...theme.applyStyles("dark", {
      backgroundColor: "#308fe8",
    }),
  },
}));
const Asterisk = (
  <Typography component="span" color="#FF0266" sx={{ fontSize: "24px" }}>
    *
  </Typography>
);
export const FullLayouts = ({ children }) => {
  const step = useAppSelector(selectProgresStep);
  const [title, setTitle] = useState("");
  const pathName = useLocation().pathname;
  const { progress } = useProgress();
  useEffect(() => {
    switch (pathName) {
      case "/driver/personal-information":
        setTitle("Personal Information");
        break;
      case "/driver/qualification-information":
        setTitle("Qualification Information");
        break;
      case "/driver/vehicle-record":
        setTitle("Motor Vehicle Record");
        break;
      case "/driver/moving-violations":
        setTitle("Moving Violations");
        break;
      case "/driver/accidents":
        setTitle("Accidents");
        break;
      case "/driver/previous-employer":
        setTitle("Previous Employer");
        break;
      case "/driver/unemployement":
        setTitle("Unemployment");
        break;
      case "/driver/driving-school":
        setTitle("Driving School");
        break;
      case "/driver/military":
        setTitle("Military");
        break;
      case "/driver/authorization":
        setTitle("Authorization & Disclosure");
        break;
    }
  }, [pathName]);

  const { mode } = useThemeContext();

  return (
    <Box sx={{ display: "flex" }}>
      <Header />
      <Divider />
      <Sidebar />
      <Box
        sx={{
          pt: 8,
          height: "calc(100vh - 64px)",
          background: "#363640",
          width: "100%",
        }}
      >
          {/* className='!bg-[#DD781E]' */}
        <Box
          bgcolor={mode === "dark" ? "#121212" : "#F0FBFF"}
          px={4}
          py={4}
          height={"calc(100vh - 128px)"}
        >
          <Box>
            <Box
              p={3}
              bgcolor={mode === "dark" ? "#363641" : "#fff"}
              borderRadius={2}
            >
       

              <Box
                sx={{
                  maxHeight: "calc(100vh - 160px)",
                  overflowY: "scroll",
                }}
                className="layout-scrollbar"
              >
                {children}
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};
