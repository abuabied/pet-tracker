import { Box, Button, Container, Dialog, DialogTitle, TextField } from "@mui/material"
import { DoubleEmptyLines, EmptyLine } from "../helper components/EmptyLines"
import { validateNewPetData } from "../../helpers/validationFunctions";
import { toast } from "react-toastify";
import { addPet } from "../../services/apiServices";
import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";
import { HttpStatusCode } from "axios";
import { getCookie } from "../../helpers/helperFunctions";
import { useState } from "react";

export const NewPetDialog = ({ isOpen, onClose }) => {
    const [imgData, setImgData] = useState()

    const uploadImg = () => {
        var reader = new FileReader();
        reader.onload = function (e) {
            var thisImage = reader.result;
            setImgData(thisImage)
        };
        reader.readAsDataURL(document.getElementById('image').files[0]);
    };

    const save = async () => {
        const name = document.getElementById("nameInput");
        const age = document.getElementById("age");
        const weight = document.getElementById("weight");
        const species = document.getElementById("species");
        const breed = document.getElementById("breed");
        const petData = {
            name: name?.value?.trim() ? name?.value.trim() : "",
            age: age?.value?.trim() ? age?.value.trim() : "",
            weight: weight?.value?.trim() ? weight?.value.trim() : "",
            species: species?.value?.trim() ? species?.value.trim() : "",
            breed: breed?.value?.trim() ? breed.value.trim() : "",
            image: imgData ? imgData : "",
        };
        const isValid = validateNewPetData(petData);
        if (isValid?.length > 0) {
            isValid.forEach((err) => {
                toast.warning(err);
            });
        } else {
            const user = getCookie(COOKIES_IDS.USERNAME)
            const res = await addPet(petData, user);
            switch (res?.status) {
                case HttpStatusCode.Ok:
                    toast.success(PETS_MESSAGES.ADDED);
                    onClose()
                    break;
                case HttpStatusCode.Conflict:
                    toast.warning("Pet name already added, please choose a different name or add a number!");
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
                    <TextField id="nameInput" placeholder="Name" />
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Age:</h5>
                    <TextField id="age" placeholder="Age" type="number" />
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Weight:</h5>
                    <TextField id="weight" placeholder="Weight" type="number" />
                </Box>

                <EmptyLine />

                <Box>
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
                </Box>

                <DoubleEmptyLines />
                <Button variant="contained" color="success" onClick={save} sx={{ width: "70%" }}>Save</Button>
                <EmptyLine />
                <Button variant="contained" color="error" onClick={onClose} sx={{ width: "70%" }} > Close</Button>
            </Container>
        </Dialog >
    </>
}