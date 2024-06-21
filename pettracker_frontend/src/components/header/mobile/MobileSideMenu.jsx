import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Menu from "@mui/material/Menu";
import AccountCircle from "@mui/icons-material/AccountCircle";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useState } from "react";
import { scrollToTop } from "../../../helpers/setWindowSize";
import { useNavigate } from "react-router-dom";
import { NotificationsWindow } from "../app_bar/notifications/NotificationsWindow";

export const MobileSideMenu = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    handleMobileMenuClose();
    scrollToTop();
    navigate("/profile");
  };

  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  const mobileMenuId = "primary-search-account-menu-mobile";

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
      <MenuItem onClick={handleMobileMenuClose}>
        <NotificationsWindow withText={true} />
      </MenuItem>

      <MenuItem onClick={goToProfile}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p style={{ margin: 0, alignSelf: "center" }}>Account</p>
      </MenuItem>
    </Menu>
  );

  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
      <IconButton
        size="large"
        aria-label="show more"
        aria-controls={mobileMenuId}
        aria-haspopup="true"
        onClick={handleMobileMenuOpen}
        color="inherit"
      >
        <MoreIcon />
      </IconButton>
      {renderMobileMenu}
    </Box>
  );
};
