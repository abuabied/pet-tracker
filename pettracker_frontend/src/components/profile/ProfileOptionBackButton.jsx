import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { scrollToTop } from "../../helpers/setWindowSize";

export const ProfileOptionBackButton = () => {

  const goBack = () => {
    scrollToTop();
    window.history.back();
  };
  return (
    <ListItemButton
      onClick={goBack}
      sx={{
        maxWidth: "fit-content",
        border: "solid 1px ghostwhite",
        paddingLeft: "8px",
      }}
    >
      <ListItemIcon sx={{ minWidth: "auto", marginRight: "5px" }}>
        <ArrowBackIcon sx={{ color: "black" }} />
      </ListItemIcon>
      <ListItemText primary={"Back"} />
    </ListItemButton>
  );
};
