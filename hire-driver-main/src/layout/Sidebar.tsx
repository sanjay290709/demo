import { Box, Toolbar } from "@mui/material";
import { styled } from "@mui/material/styles";
import MuiDrawer , { DrawerProps } from "@mui/material/Drawer";
import { SidebarList } from "./ListItem";
import { useThemeContext } from "../context/ThemeContext";
const drawerWidth = 240;
interface CustomDrawerProps extends DrawerProps {
  mode?: "light" | "dark"; // Add the `mode` prop explicitly
  open: boolean;
}
const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open"  && prop !== "mode" ,
})<CustomDrawerProps>(({ theme, open, mode }) => ({
  "& .MuiDrawer-paper": {
    position: "relative",
    whiteSpace: "nowrap",
    minWidth: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
    background: mode === "dark" ? "#363641" : "#fff",
    boxSizing: "border-box",
    ...(!open && {
      overflowX: "hidden",
      transition: theme.transitions.create("width", {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
      }),
      width: theme.spacing(7),
      [theme.breakpoints.up("sm")]: {
        width: theme.spacing(9),
      },
    }),
  },
}));
const StyledImage = styled("img")(({ theme }) => ({
  maxWidth: "240px",
  height: "auto",
  borderRadius: "8px",
  objectFit: "cover",
}));
export const Sidebar = () => {
  const { mode } = useThemeContext();
  return (
    <Drawer variant="permanent" open={true} mode={mode}>
      <Toolbar
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "flex-end",
          px: [1],
        }}
      >
        <Box sx={{ width: "100%", display: "flex", justifyContent: "center" }}>
          {/* <StyledImage src={mode === 'dark' ? "https://d29tl4qldq5y95.cloudfront.net/logo-light.webp" : 'https://d29tl4qldq5y95.cloudfront.net/bw-logo.webp'} /> */}
        </Box>
      </Toolbar>
      <SidebarList />
    </Drawer>
  );
};
