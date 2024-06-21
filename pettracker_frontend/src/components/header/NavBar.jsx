import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import { DesktopSideMenu } from "./desktop/DesktopSideMenu";
import { MobileSideMenu } from "./mobile/MobileSideMenu";
import SetWindowSize from "../../helpers/setWindowSize";
import { MobileMenuBar } from "./mobile/MobileMenuBar";
import { DesktopMenuBar } from "./desktop/DesktopMenuBar";

export const NavBar = () => {
  const windowSize = SetWindowSize();

  return (
    <AppBar sx={{ background: "floralwhite", position: "inherit" , color: "black"}}>
      <Toolbar>
        {windowSize >= 900 ? <DesktopMenuBar /> : <MobileMenuBar />}

        <Box sx={{ flexGrow: 1 }} />

        {windowSize >= 900 ? <DesktopSideMenu /> : <MobileSideMenu />}
      </Toolbar>
    </AppBar>
  );
};
