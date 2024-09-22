import IconButton from "@mui/material/IconButton";
import MenuIcon from "@mui/icons-material/Menu";
import {
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from '@mui/icons-material/Pets';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../helpers/setWindowSize";
import { isLogged } from "../../../helpers/helperFunctions";
import { toast } from "react-toastify";

export const MobileMenuBar = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    setdrawerState(false);
    scrollToTop();
    navigate("/");
  };
  const goToPage = (pageName) => {
    if (isLogged()) {
      scrollToTop();
      navigate(`${"/" + pageName}`);
    } else {
      toast.warning(
        "Login first!"
      );
    }
  };
  const goToHelp = () => {
    setdrawerState(false);
    scrollToTop();
    navigate("/help");
  };

  const [drawerState, setdrawerState] = useState(false);
  const toggleDrawer = (open) => (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }
    setdrawerState(open);
  };

  return (
    <Box>
      <IconButton
        size="large"
        edge="start"
        color="inherit"
        aria-label="open drawer"
        sx={{ mr: 2 }}
        onClick={toggleDrawer(true)}
      >
        <MenuIcon />
      </IconButton>
      <Drawer
        anchor={"left"}
        open={drawerState}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "#434446",
            color: "white",
          },
        }}
      >
        <List>
          <ListItem>
            <ListItemButton onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <CloseIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Close menu" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={goToHome}>
              <ListItemIcon>
                <HomeIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Home" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => goToPage("pets")}>
              <ListItemIcon>
                <PetsIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Pets" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => goToPage("visits")}>
              <ListItemIcon>
                <DoorSlidingIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Visits" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={() => goToPage("clinics")}>
              <ListItemIcon>
                <LocalHospitalIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Clinics" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemButton onClick={goToHelp}>
              <ListItemIcon>
                <InfoIcon sx={{ color: "white" }} />
              </ListItemIcon>
              <ListItemText primary="Help" />
            </ListItemButton>
          </ListItem>
        </List>
      </Drawer>
    </Box>
  );
};
