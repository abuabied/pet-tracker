import { Box, Divider, List } from "@mui/material";
import AccountCircle from "@mui/icons-material/AccountCircle";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../helpers/setWindowSize";
import HomeIcon from "@mui/icons-material/Home";
import { deleteCookie, isLogged } from "../../helpers/helperFunctions";
import { ProfileViewOption } from "../../components/profile/ProfileViewOption";
import { StyledButton } from "../../components/helper components/StyledButton";
import { DoubleEmptyLines } from "../../components/helper components/EmptyLines";

export const ProfileView = () => {
  const navigate = useNavigate();
  const goToProfileInfo = () => {
    if (isLogged()) {
      scrollToTop();
      navigate("/profile/info");
    } else {
      window.location.reload();
    }
  };
  const goToHome = () => {
    scrollToTop();
    navigate("/");
  };
  const logout = () => {
    deleteCookie("username");
    goToHome();
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: { xs: "center", md: "flex-start" },
        margin: { xs: "0.5rem", md: "2rem" },
        padding: "1rem 2rem",
      }}
    >
      <List
        sx={{
          color: "black",
          backgroundColor: "#fffaf000",
          minWidth: { xs: "70vw", md: "50vw", lg: "40vw" },
        }}
      >
        <ProfileViewOption
          icon={<AccountCircle sx={{ color: "black" }} />}
          key={"My profile"}
          optionTitle={"My profile"}
          onClickFun={goToProfileInfo}
        />

        <Divider color="white" />

        <ProfileViewOption
          icon={<HomeIcon sx={{ color: "black" }} />}
          key={"home"}
          optionTitle={"Home"}
          onClickFun={goToHome}
        />
        <DoubleEmptyLines />
        <StyledButton onClick={logout} buttonText={"Logout"} />
      </List>
    </Box>
  );
};
