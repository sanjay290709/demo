import {
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { NavLink, useLocation, useNavigate } from "react-router-dom";
import { useThemeContext } from "../context/ThemeContext";
import { useAppSelector } from "../app/hooks";
import {
  isRegistered,
  selectDrivingExperience,
  selectProgresStep,
  selectVeteran,
} from "../features/api/globalStateSlice";
import { useEffect } from "react";
import DashboardIcon from '@mui/icons-material/Dashboard';
const StyledStarIcon = styled("i")(({ theme }) => ({
  fontSize: "16px", // Adjust the size
  color: "#0082FB", // Gold color for a star
  margin: "0 8px", // Add some margin
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)", // Add a hover effect
  },
}));
const StyledRightIcon = styled("i")(({ theme }) => ({
  fontSize: "16px", // Adjust the size
  color: "#01EB90", // Gold color for a star
  margin: "0 8px", // Add some margin
  transition: "transform 0.3s ease-in-out",
  "&:hover": {
    transform: "scale(1.2)", // Add a hover effect
  },
}));
const ItemList = [
  {
    path: "/admin/dashboard",
    label: "Dashboard",
    icon: <StyledStarIcon className="fa-solid fa-star"></StyledStarIcon>,
  },
  {
    path: "/admin/product",
    label: "Product",
    icon: <StyledStarIcon className="fa-solid fa-star"></StyledStarIcon>,
  },
  {
    path: "/admin/enquiry",
    label: "Enquiry",
    icon: <StyledStarIcon className="fa-solid fa-star"></StyledStarIcon>,
  },
  {
    path: "/admin/notification",
    label: "Notification",
    icon: <StyledStarIcon className="fa-solid fa-star"></StyledStarIcon>,
  }
];
export const SidebarList = () => {
  const step = useAppSelector(selectProgresStep);
  const isVeteran = useAppSelector(selectVeteran);
  const registerd = useAppSelector(isRegistered);
  const navigate = useNavigate();
  const drivingExperience = useAppSelector(selectDrivingExperience);
  const location = useLocation();
  const { mode } = useThemeContext();
  const filteredItemList = ItemList.filter((item) => {
    // Remove "Military" if not a veteran
    if (!isVeteran && item.path === "/driver/military") {
      return false;
    }
    // Remove "Previous Employer" if driving experience is "NA"
    if (
      drivingExperience === "NA" &&
      item.path === "/driver/previous-employer"
    ) {
      return false;
    }
    // Keep all other items
    return true;
  });
  useEffect(() => {
    if (registerd) {
      navigate("/preview");
    }
  }, [registerd]);
  return (
    <>
      <List>
        {ItemList.map((data, index) => {
          // const isDisabled = registerd ? true : step < index;
          return (
            <NavLink
              to={data.path}
              key={index}
            // onClick={(e) => {
            //   if (isDisabled) e.preventDefault(); // Prevent navigation if disabled
            // }}
            >
              <ListItemButton
                sx={{
                  background:
                    location.pathname === data.path
                      ? mode === "dark"
                        ? "#121212"
                        : "#F0FBFF"
                      : "transparent",
                  "&::before": {
                    content: '" "',
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "7px", // Customize the width
                    height: "100%", // Customize the height
                    backgroundColor:
                      location.pathname === data.path
                        ? mode === "dark"
                          ? "white"
                          : "#01AAE9"
                        : "", // Customize the color
                    borderRadius: "0px 6px 6px 0px",
                  },
                }}

              >
                <ListItemText primary={data?.label} />
                <ListItemIcon>
                  <DashboardIcon />
                </ListItemIcon>
              </ListItemButton>
            </NavLink>
          );
        })}
      </List>
    </>
  );
};
