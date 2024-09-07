import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../helpers/setWindowSize";

export const DesktopSideMenu = () => {
  const navigate = useNavigate();
  const goToProfile = () => {
    scrollToTop();
    navigate("/profile");
  };
  return (
    <Box sx={{ display: { xs: "none", md: "flex" } }}>
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
