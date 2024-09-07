import { Box, Button, Container, Dialog, DialogTitle, TextField } from "@mui/material"
import { DoubleEmptyLines, EmptyLine } from "../helper components/EmptyLines"
import { validateNewClinicData } from "../../helpers/validationFunctions";
import { toast } from "react-toastify";
import { addClinic, addPet } from "../../services/apiServices";
import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";
import { HttpStatusCode } from "axios";
import { getCookie } from "../../helpers/helperFunctions";
import { useState } from "react";

export const NewClinicDialog = ({ isOpen, onClose }) => {
    const save = async () => {
        const name = document.getElementById("nameNew");
        const number = document.getElementById("numberNew");
        const address = document.getElementById("addressNew");
        const data = {
            name: name?.value?.trim() ? name?.value.trim() : "",
            number: number?.value?.trim() ? number?.value.trim() : "",
            address: address?.value?.trim() ? address?.value.trim() : "",
        };
        const isValid = validateNewClinicData(data);
        if (isValid?.length > 0) {
            isValid.forEach((err) => {
                toast.warning(err);
            });
        } else {
            const user = getCookie(COOKIES_IDS.USERNAME)
            const res = await addClinic(data, user);
            switch (res?.status) {
                case HttpStatusCode.Ok:
                    toast.success("Clinic added!");
                    onClose()
                    break;
                case HttpStatusCode.Conflict:
                    toast.warning("Clinic name already added, please choose a different name or add a number!");
                    onClose()
                    break;
                default:
                    toast.error(PETS_MESSAGES.ERROR_GENERAL);
            }
        }
    }

    return <>
        <Dialog open={isOpen}>
            <Container sx={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <DialogTitle>Fill details:</DialogTitle>
                <Box>
                    <h5>Name:</h5>
                    <TextField id="nameNew" placeholder="Name" />
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Number:</h5>
                    <TextField id="numberNew" placeholder="Number"/>
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Address:</h5>
                    <TextField id="addressNew" placeholder="Address" />
                </Box>

                <EmptyLine />

                {/* <Box>
                    <h5>Species:</h5>
                    <TextField id="species" placeholder="Species" />
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Breed:</h5>
                    <TextField id="breed" placeholder="Breed" />
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Image:</h5>
                    <input id="image" onChange={uploadImg} type="file" name="filename" accept="image/png, image/jpeg" />
                </Box> */}

                <DoubleEmptyLines />
                <Button variant="contained" color="success" onClick={save} sx={{ width: "70%" }}>Save</Button>
                <EmptyLine />
                <Button variant="contained" color="error" onClick={onClose} sx={{ width: "70%" }} > Close</Button>
            </Container>
        </Dialog >
    </>
}