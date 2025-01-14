import styled from "@emotion/styled";
import { Box, Button, Toolbar, Switch } from "@mui/material";
import MuiAppBar from "@mui/material/AppBar";
import { useThemeContext } from "../context/ThemeContext";
import { logout } from "../auth/authSlice";
import { useAppDispatch } from "../app/hooks";
import { useNavigate } from "react-router-dom";
import { useToast } from "../context/ToastContext";

// import MuiDrawer from "@mui/material/Drawer";
const drawerWidth = 239.547;
interface AppProps {
  open?: boolean;
  theme?: any;
  mode?: any;
}
const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open" && prop !== "mode",
})<AppProps>(({ theme, open, mode }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  background: mode === "dark" ? "#121212" : "#DD781E",
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const CustomSwitch = styled(Switch)<AppProps>(({ open }) => ({
  width: 60,
  height: 30,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 3,
    "&.Mui-checked": {
      transform: "translateX(30px)",
      color: "#fff",
      "& + .MuiSwitch-track": {
        backgroundColor: "#d3d3d3",
      },
    },
  },
  "& .MuiSwitch-thumb": {
    width: 24,
    height: 24,
    backgroundColor: "#fff",
    position: "relative",
    "&::before": {
      content: !open ? "'🌙'" : "'☀️'",
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      fontSize: 12,
    },
    "&.Mui-checked::before": {
      content: "'🌙'",
    },
  },
  "& .MuiSwitch-track": {
    borderRadius: 15,
    backgroundColor: "#d3d3d3",
    opacity: 1,
    position: "relative",
    "&::before, &::after": {
      content: "''",
      position: "absolute",
      top: "50%",
      transform: "translateY(-50%)",
      width: 14,
      height: 14,
    },
    "&::before": {
      content: "'☀️'",
      left: 8,
      fontSize: 14,
      top: 10,
    },
    "&::after": {
      content: "'🌙'",
      right: 10,
      top: 10,
      fontSize: 14,
    },
  },
}));
export const Header = () => {
  const { mode, toggleTheme } = useThemeContext();
 const {success} =  useToast()
  const dispatch = useAppDispatch()
  const navigate = useNavigate()
  const UserLogout = async () => {
    const res: any = await dispatch(logout());
    if(res?.payload?.status === 200) {
      success('Successfully logged out')
    }
    navigate('/')
  }
  const open = mode === "light" ? true : false;
  return (
    <AppBar position="absolute" open={true} mode={mode} sx={{background: "#DD781E"}}>
      <Toolbar
        sx={{
          pr: "24px",
        }}
      >
        <Box display={"flex"} justifyContent={"end"} width={"100%"} gap={3}>
          <CustomSwitch onChange={toggleTheme} open={open} />
          <Button
            sx={{ color: mode === "dark" ? "#F2F4F4" : "#F2F4F4" }}
            endIcon={<i className="fa-solid fa-right-from-bracket"></i>}
            onClick={UserLogout}
          >
            Log Out
          </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
};
