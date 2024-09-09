import { AppBar, Box, Button, Container, Dialog, IconButton, Input, TextField, Toolbar } from "@mui/material"
// import { useState } from "react";
// import CloseIcon from '@mui/icons-material/Close';
// import { validateNewClinicData } from "../../helpers/validationFunctions";
// import { getCookie } from "../../helpers/helperFunctions";
// import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";
// import { HttpStatusCode } from "axios";
// import { toast } from "react-toastify";
// import { removeClinic, updateClinic } from "../../services/apiServices";

export const VisitCard = ({ visit, showName }) => {
    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
        }}>
            <Container sx={{
                display: "flex",
                flexWrap: "wrap",
                gap: "2rem"
            }}>
                {showName === false ? <></>
                    :
                    <Box>
                        <h5>Pet Name:</h5>
                        <TextField id="nameInfo" value={visit.petName === "" ? "Pet name" : visit.petName} />
                    </Box>
                }

                <Box>
                    <h5>Clinic:</h5>
                    <TextField id="clinicInfo" value={visit.clinic === "" ? "Clinic" : visit.clinic} />
                </Box>


                <Box>
                    <h5>Date:</h5>
                    <TextField id="dateInput" value={visit.date === "" ? "Address" : visit.date} />
                </Box>

                <Box>
                    <h5>Next Visit:</h5>
                    <TextField id="nextVisitInput" value={visit.date === "" ? "Next Visit" : visit.nextVisit} />
                </Box>

                <Box>
                    <h5>Description:</h5>
                    <TextField id="descInfoInput" value={visit.description === "" ? "Description" : visit.description} />
                </Box>
            </Container>
            <hr style={{ height: "2rem" }}></hr>
        </Container>
    )
}