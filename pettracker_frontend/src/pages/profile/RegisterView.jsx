import {
  Box,
  Container,
  FormControl,
  Input,
  InputLabel,
  Typography,
} from "@mui/material";
import { contentStyle, titleStyle } from "./TextStyles";
import { StyledButton } from "../../components/helper components/StyledButton";
import {
  EmptyLine,
  DoubleEmptyLines,
} from "../../components/helper components/EmptyLines";
import { scrollToTop } from "../../helpers/setWindowSize";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { validateRegisterData } from "../../helpers/resgisterFunctions";
import { registerUser } from "../../services/apiServices";
import { HttpStatusCode } from "axios";
import { COOKIES_IDS, REGISTRATION_MESSAGES } from "../../consts/StringConsts";
import { setCookie } from "../../helpers/helperFunctions";

export const RegisterView = () => {
  const navigate = useNavigate();
  const goToLogin = () => {
    scrollToTop();
    navigate("/profile");
  };
  const goToHome = () => {
    scrollToTop();
    navigate("/");
  };

  const registerClick = async () => {
    const fname = document.getElementById("fname");
    const lname = document.getElementById("lname");
    const uname = document.getElementById("uname");
    const email = document.getElementById("email");
    const pass = document.getElementById("pass1");
    const pass2 = document.getElementById("pass2");
    const pass2Val = pass2?.value ? pass2.value : "";
    const registerData = {
      firstName: fname?.value.trim() ? fname.value.trim() : "",
      lastName: lname?.value.trim() ? lname.value.trim() : "",
      username: uname?.value.trim() ? uname.value.trim() : "",
      email: email?.value.trim() ? email.value.trim() : "",
      password: pass?.value.trim() ? pass.value.trim() : "",
    };

    const isValid = validateRegisterData(registerData);
    if (isValid?.length > 0) {
      isValid.forEach((err) => {
        toast.warning(err);
      });
    } else if (pass2Val !== registerData.password) {
      toast.warning(
        REGISTRATION_MESSAGES.INVALID_PASSWORD_PASSWORDS_DONT_MATCH
      );
    } else {
      const res = await registerUser(registerData);
      console.log(res)
      switch (res?.status) {
        case HttpStatusCode.Created:
          toast.success(REGISTRATION_MESSAGES.REGISTERED);
          setCookie(COOKIES_IDS.USERNAME, registerData.username);
          setCookie(COOKIES_IDS.GAME_COLLECTION,"");
          goToHome();
          break;
        case HttpStatusCode.Conflict:
          toast.warning(REGISTRATION_MESSAGES.INVALID_USERNAME_ALREADY_EXIST);
          break;
        default:
          toast.error(REGISTRATION_MESSAGES.ERROR_GENERAL);
      }
    }
  };

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        margin: "2rem 0",
      }}
    >
      <Box
        sx={{
          backgroundColor: "floralwhite",
          padding: { xs: "1rem", md: "3rem" },
          paddingBottom: 0,
        }}
      >
        <Typography sx={titleStyle}>register</Typography>
        <EmptyLine />
        <FormControl
          sx={{
            minWidth: { md: "30vw", lg: "20vw" },
          }}
        >
          <InputLabel htmlFor="fname" sx={contentStyle}>
            {"First name:"}
          </InputLabel>
          <DoubleEmptyLines />
          <Input id="fname" placeholder="-First-"/>
        </FormControl>
        <DoubleEmptyLines />

        <FormControl
          sx={{
            minWidth: { md: "30vw", lg: "20vw" },
          }}
        >
          <InputLabel htmlFor="lname" sx={contentStyle}>
            {"Last name:"}
          </InputLabel>
          <DoubleEmptyLines />
          <Input id="lname" placeholder="-Last-" />
        </FormControl>
        <DoubleEmptyLines />

        <FormControl
          sx={{
            minWidth: { md: "30vw", lg: "20vw" },
          }}
        >
          <InputLabel htmlFor="uname" sx={contentStyle}>
            {"Username:"}
          </InputLabel>
          <DoubleEmptyLines />
          <Input id="uname" placeholder="Username"/>
        </FormControl>
        <DoubleEmptyLines />

        <FormControl
          sx={{
            minWidth: { md: "30vw", lg: "20vw" },
          }}
        >
          <InputLabel htmlFor="email" sx={contentStyle}>
            {"Email: *Optional*"}
          </InputLabel>
          <DoubleEmptyLines />
          <Input id="email" placeholder="Email"/>
        </FormControl>
        <DoubleEmptyLines />

        <FormControl
          sx={{
            minWidth: { md: "30vw", lg: "20vw" },
          }}
        >
          <InputLabel htmlFor="pass" sx={contentStyle}>
            Password:
          </InputLabel>
          <DoubleEmptyLines />
          <Input
            id="pass1"
            placeholder="Password"
            type="password"
          />
        </FormControl>
        <DoubleEmptyLines />
        <FormControl
          sx={{
            minWidth: { md: "30vw", lg: "20vw" },
          }}
        >
          <InputLabel htmlFor="pass" sx={contentStyle}>
            Repeat Password:
          </InputLabel>
          <DoubleEmptyLines />
          <Input
            id="pass2"
            placeholder="Repeat Password"
            type="password"
          />
        </FormControl>
        <DoubleEmptyLines />
        <DoubleEmptyLines />
        <Container
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <StyledButton onClick={registerClick} buttonText={"register"} />
        </Container>
        <DoubleEmptyLines />
        <Typography sx={contentStyle}>
          *Password must be at least 6 characters long.
        </Typography>
        <DoubleEmptyLines />
        <Container
          sx={{ width: "100%", display: "flex", justifyContent: "center" }}
        >
          <StyledButton onClick={goToLogin} buttonText={"Back"} red={true} />
        </Container>
      </Box>
    </div>
  );
};
