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

export const DesktopMenuBar = () => {
    const navigate = useNavigate();
    const goToHome = () => {
        scrollToTop();
        navigate("/");
    };
    const goToHelp = () => {
        scrollToTop();
        navigate("/help");
    };

    return (
        <List sx={{ display: 'flex', flexDirection: 'row', gap: '1rem' }}>
            <ListItem sx={{margin: "0", padding: "0"}}> 
                <ListItemButton onClick={goToHome}  sx={{margin: "0"}}>
                    <ListItemIcon sx={{margin: "0 -1.5rem 0 0"}}>
                        <HomeIcon sx={{ color: "black" }} />
                    </ListItemIcon>
                    <ListItemText primary="Home" />
                </ListItemButton>
            </ListItem>

            <ListItem sx={{margin: "0", padding: "0"}}>
                <ListItemButton onClick={goToHelp}  sx={{margin: "0"}}>
                    <ListItemIcon sx={{margin: "0 -1.5rem 0 0"}}>
                        <InfoIcon sx={{ color: "black" }} />
                    </ListItemIcon >
                    <ListItemText primary="Help" />
                </ListItemButton>
            </ListItem>
        </List>
    );
}

