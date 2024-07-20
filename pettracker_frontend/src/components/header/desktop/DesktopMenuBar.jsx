import {
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
} from "@mui/material"; import React from 'react';
import { useNavigate } from "react-router-dom";
import { scrollToTop } from "../../../helpers/setWindowSize";
import InfoIcon from "@mui/icons-material/Info";
import HomeIcon from "@mui/icons-material/Home";
import PetsIcon from '@mui/icons-material/Pets';
import DoorSlidingIcon from '@mui/icons-material/DoorSliding';
import LocalHospitalIcon from '@mui/icons-material/LocalHospital';
import { isLogged } from "../../../helpers/helperFunctions";
import { GENERAL_MESSAGES } from "../../../consts/StringConsts";
import { toast } from "react-toastify";

export const DesktopMenuBar = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        scrollToTop();
        navigate("/");
    };
    const goToPage = (pageName) => {
        if (isLogged()) {
            scrollToTop();
            navigate(`${"/" + pageName}`);
        } else {
            toast.warning(
                GENERAL_MESSAGES.LOGIN_BEFORE_ACTION
            );
        }
    };
    const goToHelp = () => {
        scrollToTop();
        navigate("/help");
    };

    return (
        <List sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <ListItem sx={{ margin: "0", padding: "0" }}>
                <ListItemButton onClick={goToHome} sx={{ margin: "0" }}>
                    <ListItemIcon sx={{ margin: "0 -1.5rem 0 0" }}>
                        <HomeIcon sx={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>

            <ListItem sx={{ margin: "0", padding: "0" }}>
                <ListItemButton onClick={() => goToPage("pets")} sx={{ margin: "0" }}>
                    <ListItemIcon sx={{ margin: "0 -1.5rem 0 0" }}>
                        <PetsIcon sx={{ color: "black" }} />
                    </ListItemIcon >
                    <ListItemText primary="Pets" />
                </ListItemButton>
            </ListItem>

            <ListItem sx={{ margin: "0", padding: "0" }}>
                <ListItemButton onClick={() => goToPage("visits")} sx={{ margin: "0" }}>
                    <ListItemIcon sx={{ margin: "0 -1.5rem 0 0" }}>
                        <DoorSlidingIcon sx={{ color: "black" }} />
                    </ListItemIcon >
                    <ListItemText primary="Visits" />
                </ListItemButton>
            </ListItem>

            <ListItem sx={{ margin: "0", padding: "0" }}>
                <ListItemButton onClick={() => goToPage("clinics")} sx={{ margin: "0" }}>
                    <ListItemIcon sx={{ margin: "0 -1.5rem 0 0" }}>
                        <LocalHospitalIcon sx={{ color: "black" }} />
                    </ListItemIcon >
                    <ListItemText primary="Clinics" />
                </ListItemButton>
            </ListItem>

            <ListItem sx={{ margin: "0", padding: "0" }}>
                <ListItemButton onClick={goToHelp} sx={{ margin: "0" }}>
                    <ListItemIcon sx={{ margin: "0 -1.5rem 0 0" }}>
                        <InfoIcon sx={{ color: "black" }} />
                    </ListItemIcon >
                    <ListItemText primary="Help" />
                </ListItemButton>
            </ListItem>
        </List>
    );
}

