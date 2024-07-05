import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../helpers/setWindowSize";
import { Box, Input } from "@mui/material";
import { StyledButton } from "../../components/helper components/StyledButton";
import {
  DoubleEmptyLines,
  EmptyLine,
} from "../../components/helper components/EmptyLines";
import { toast } from "react-toastify";
import { validateUpdatedData } from "../../helpers/resgisterFunctions";
import {
  deleteCookie,
  getCookie,
  isLogged,
  setCookie,
} from "../../helpers/helperFunctions";
import { getUser, updateUser } from "../../services/apiServices";
import { HttpStatusCode } from "axios";
import { COOKIES_IDS, UPDATE_MESSAGES } from "../../consts/StringConsts";
import { ProfileOptionBackButton } from "../../components/profile/ProfileOptionBackButton";

export const ProfileInfo = () => {
  const [user, setUser] = useState({});
  const navigate = useNavigate();

  const goToLogin = () => {
    scrollToTop();
    navigate("/profile");
  };

  const getUserDetails = async () => {
    const username = getCookie("username");
    const user = { username: username };
    const res = await getUser(user);
    switch (res?.status) {
      case HttpStatusCode.Ok:
        setUser(res?.data);
        document.getElementById("fname").value = res?.data?.firstName;
        document.getElementById("lname").value = res?.data?.lastName;
        document.getElementById("email").value = res?.data?.email;
        break;
      default:
        deleteCookie("username");
        goToLogin();
    }
  };

  useEffect(() => {
    getUserDetails();
  }, []);

  const saveClick = async () => {
    if (!isLogged()) {
      goToLogin();
    } else {
      const fname = document.getElementById("fname");
      const lname = document.getElementById("lname");
      const email = document.getElementById("email");
      const pass = document.getElementById("pass1");
      const pass2 = document.getElementById("pass2");
      const pass2Val = pass2?.value ? pass2.value : "";
      const updatedData = {
        username: getCookie("username"),
        firstName: fname?.value.trim() ? fname.value.trim() : "",
        lastName: lname?.value.trim() ? lname.value.trim() : "",
        email: email?.value.trim() ? email.value.trim() : "",
        password: pass?.value.trim() ? pass.value.trim() : "",
      };
      const isValid = validateUpdatedData(updatedData);
      if (isValid?.length > 0) {
        isValid.forEach((err) => {
          toast.warning(err);
        });
      } else {
        if (pass2Val !== updatedData.password)
          toast.warning("Passwords don't match!");
        else {
          const res = await updateUser(updatedData);
          switch (res?.status) {
            case HttpStatusCode.Ok:
              toast.success(UPDATE_MESSAGES.UPDATED);
              setCookie(COOKIES_IDS.USERNAME, getCookie(COOKIES_IDS.USERNAME));
              updatedData.password = "";
              setUser(updatedData);
              cancelEdit(false);
              break;
            default:
              toast.error(UPDATE_MESSAGES.ERROR_GENERAL);
          }
        }
      }
    }
  };

  const inputStyle = {
    marginBottom: "1rem",
    "& .MuiInputBase-input.Mui-disabled": {
      WebkitTextFillColor: "#a5a5a6",
    },
    fontSize: { xs: "1.2rem", md: "1.6rem", lg: "2.1rem" },
  };

  const [isDisabled, setIsDisabled] = useState(true);
  const [showEditButtons, setShowEditButtons] = useState(false);

  const editInfo = () => {
    if (!isLogged()) {
      goToLogin();
    } else {
      setIsDisabled(false);
      setShowEditButtons(true);
    }
  };
  const cancelEdit = (reset = true) => {
    if (!isLogged()) {
      goToLogin();
    } else {
      setIsDisabled(true);
      setShowEditButtons(false);
      if (reset) {
        document.getElementById("fname").value = user?.firstName;
        document.getElementById("lname").value = user?.lastName;
        document.getElementById("email").value = user?.email;
      }
    }
  };

  return (
    <Box
      sx={{
        backgroundColor: "#fffaf000",
        margin: { xs: "0.5rem", md: "2rem" },
        padding: "1rem 2rem",
      }}
    >
      <h5>{"My Profile"}</h5>
      <h2 style={{ margin: "1rem 0" }}>
        Hello, {user?.firstName}
      </h2>
      <h5 style={{ margin: "1rem 0" }}>{"User info:"}</h5>
      <DoubleEmptyLines />
      <Box>
        <h5 style={{ color: "GrayText" }}>{"First name:"}</h5>
        <Input id="fname" disabled={isDisabled} sx={inputStyle} />

        <h5 style={{ color: "GrayText" }}>{"Last name:"}</h5>
        <Input id="lname" disabled={isDisabled} sx={inputStyle} />

        <h5 style={{ color: "GrayText" }}>{"Email: *Optional"}</h5>
        <Input id="email" disabled={isDisabled} sx={inputStyle} />
        {showEditButtons ? (
          <Box>
            <h5 style={{ color: "GrayText" }}>{"Password:"}</h5>
            <Input
              id="pass1"
              defaultValue={""}
              type="password"
              sx={inputStyle}
            />

            <h5 style={{ color: "GrayText" }}>{"Re-type Password:"}</h5>
            <Input
              id="pass2"
              defaultValue={""}
              type="password"
              sx={inputStyle}
            />
            <DoubleEmptyLines />
            <Box
              sx={{
                display: "flex",
                justifyContent: "space-evenly",
                flexWrap: "wrap",
                gap: "2rem",
              }}
            >
              <StyledButton onClick={saveClick} buttonText={"Save"} />
              <StyledButton onClick={cancelEdit} buttonText={"Cancel"} />
            </Box>
          </Box>
        ) : (
          <Box>
            <EmptyLine />
            <StyledButton onClick={editInfo} buttonText={"Edit info"} />
          </Box>
        )}
        <EmptyLine />
      </Box>
      <ProfileOptionBackButton />
    </Box>
  );
};
