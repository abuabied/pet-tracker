import { Box, Container } from "@mui/material"
import backgroundImage from './home1.jpg';
import { StyledButton } from "../../components/helper components/StyledButton";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../helpers/setWindowSize";
import { getCookie, isLogged } from "../../helpers/helperFunctions";
import { COOKIES_IDS } from "../../consts/StringConsts";

export const Home = () => {
    const navigate = useNavigate();
    const goToLogin = () => {
        scrollToTop();
        navigate("/profile");
    };
    const goToRegister = () => {
        scrollToTop();
        navigate("/profile/register");
    };

    return (<Box sx={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: "no-repeat",
        backgroundSize: "cover",
        width: "100%",
        height: "70vh"
    }}>
        <Box sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "100%",
            width: { md: "100%", lg: "70%" },
        }}>
            <Container sx={{
                backgroundColor: "#60606059",
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-evenly",
                alignItems: "center",
                height: "45%",
                width: "40%"
            }}>
                {isLogged() ? <h3>Welcome, {getCookie(COOKIES_IDS.USERNAME)}!</h3> : <><StyledButton onClick={goToLogin} buttonText={"Login"} />
                    <h4>OR</h4>
                    <StyledButton onClick={goToRegister} buttonText={"register"} /></>}

            </Container>
        </Box>
    </Box>
    );
};