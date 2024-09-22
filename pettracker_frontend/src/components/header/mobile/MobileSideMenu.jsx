import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { scrollToTop } from "../../../helpers/setWindowSize";
import { useNavigate } from "react-router-dom";

export const MobileSideMenu = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    scrollToTop();
    navigate("/profile");
  };


  return (
    <Box sx={{ display: { xs: "flex", md: "none" } }}>
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
      </MenuItem>
    </Box>
  );
};
