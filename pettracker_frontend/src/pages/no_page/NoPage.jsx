import { Box, Typography } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../helpers/setWindowSize";
import HomeIcon from "@mui/icons-material/Home";

export const NoPage = () => {
  const navigate = useNavigate();
  const goToHome = () => {
    scrollToTop();
    navigate("/");
  };

  const textStyle = {
    fontSize: { xs: "20px", sm: "28px", md: "32px" },
    fontWeight: "200",
    lineHeight: { xs: "30px", sm: "40px", md: "50px" },
    letterSpacing: "3px",
    textAlign: "center",
    padding: { xs: "1rem", sm: "4rem", md: "8rem" },
    color: "white",
  };
  return (
    <Box>
      <Typography component="div" sx={textStyle}>
        <b>Page not found!</b> Please use the navbar on top of the page for
        easier navigation.
      </Typography>

      <Box
        onClick={goToHome}
        sx={{ color: " white", display: "flex", justifyContent: "center", margin: "0 0 2rem 0", fontSize: "large", cursor: "pointer"  }}
      >
        <HomeIcon sx={{ color: "white", margin: " 0 1rem" }} /> Home
      </Box>
    </Box>
  );
};
