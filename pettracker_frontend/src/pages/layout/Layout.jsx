import { Outlet } from "react-router-dom";
import { FooterDiv, HeaderDiv, Page, PageContent } from "./styled";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { NavBar } from "../../components/header/NavBar";
import { Logo } from "../../components/footer/Logo";

export const Layout = () => {
  return (
    <Page>
      <HeaderDiv>
        <NavBar />
      </HeaderDiv>

      <PageContent>
        <Outlet />
      </PageContent>

      <FooterDiv>
        <Logo />
      </FooterDiv>
      <ToastContainer position="bottom-right" autoClose={2000} />
    </Page>
  );
};
