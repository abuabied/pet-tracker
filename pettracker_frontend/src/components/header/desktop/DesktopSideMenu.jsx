import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../helpers/setWindowSize";
import { NotificationsWindow } from "../app_bar/notifications/NotificationsWindow";

export const DesktopSideMenu = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    scrollToTop();
    navigate("/profile");
  };
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
      <NotificationsWindow />

      <IconButton
        size="large"
        edge="end"
        aria-label="account of current user"
        aria-haspopup="true"
        color="inherit"
        onClick={goToProfile}
      >
        <AccountCircle />
      </IconButton>
    </Box>
  );
};
