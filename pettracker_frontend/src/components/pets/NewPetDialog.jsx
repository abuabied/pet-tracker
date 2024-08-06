import { Button, Container, Dialog, DialogTitle, TextField } from "@mui/material"
import { DoubleEmptyLines, EmptyLine } from "../helper components/EmptyLines"
import { validateNewPetData } from "../../helpers/validationFunctions";
import { toast } from "react-toastify";
import { addPet } from "../../services/apiServices";
import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";
import { HttpStatusCode } from "axios";
import { getCookie } from "../../helpers/helperFunctions";

export const NewPetDialog = ({ isOpen, onClose }) => {
    const save = async () => {
        const name = document.getElementById("name");
        const age = document.getElementById("age");
        const weight = document.getElementById("weight");
        const species = document.getElementById("species");
        const breed = document.getElementById("breed");
        const petData = {
            name: name?.value.trim() ? name.value.trim() : "",
            age: age?.value.trim() ? age.value.trim() : "",
            weight: weight?.value.trim() ? weight.value.trim() : "",
            species: species?.value.trim() ? species.value.trim() : "",
            breed: breed?.value.trim() ? breed.value.trim() : "",
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
                default:
                    toast.error(PETS_MESSAGES.ERROR_GENERAL);
            }
        }
    }

    return <>
        <Dialog open={isOpen}>
            <Container sx={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <DialogTitle>Fill details:</DialogTitle>
                <TextField id="name" placeholder="Name" />
                <EmptyLine />
                <TextField id="age" placeholder="Age" />
                <EmptyLine />
                <TextField id="weight" placeholder="Weight" />
                <EmptyLine />
                <TextField id="species" placeholder="Species" />
                <EmptyLine />
                <TextField id="breed" placeholder="breed" />
                <DoubleEmptyLines />
                <Button variant="contained" color="success" onClick={save} sx={{ width: "70%" }}>Save</Button>
                <EmptyLine />
                <Button variant="contained" color="error" onClick={onClose} sx={{ width: "70%" }} > Close</Button>
            </Container>
        </Dialog >
    </>
}