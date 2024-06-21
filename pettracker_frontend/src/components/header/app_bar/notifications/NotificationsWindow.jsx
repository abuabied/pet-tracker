import NotificationsIcon from "@mui/icons-material/Notifications";
import IconButton from "@mui/material/IconButton";
import Badge from "@mui/material/Badge";
import { useState } from "react";
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

export const NotificationsWindow = ({ withText }) => {
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
      <Box sx={{ display: "flex" }} onClick={toggleDrawer(true)}>
        <IconButton size="large" aria-label="show new inbox" color="inherit">
          <Badge badgeContent={0} color="error">
            <NotificationsIcon />
          </Badge>
        </IconButton>
        {withText ? (
          <p style={{ margin: 0, alignSelf: "center" }}>Notification</p>
        ) : (
          ""
        )}
      </Box>
      <Drawer
        anchor={"right"}
        open={drawerState}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: "floralwhite",
            display: "flex",
            justifyContent: "space-between",
            minWidth: { xs: "80vw", md: "70vw", lg: "50vw", xl: "40vw" },
          },
        }}
      >
        <List sx={{ padding: "3rem 0" }}>
          <ListItem
            disablePadding
            sx={{
              backgroundColor: "white",
              position: "fixed",
              top: 0,
              zIndex: 1,
              maxHeight: "3rem",
            }}
          >
            <ListItemButton onClick={toggleDrawer(false)}>
              <ListItemIcon>
                <CloseIcon/>
              </ListItemIcon>
              <ListItemText primary="Close window" />
            </ListItemButton>
          </ListItem>

          <ListItem>
            <ListItemText primary="No new notifications!" />
          </ListItem>
          
        </List>
        <ListItem
          disablePadding
          sx={{
            position: "fixed",
            bottom: 0,
            zIndex: 1,
            maxHeight: "3rem",
          }}
        >
        </ListItem>
      </Drawer>
    </Box>
  );
};
