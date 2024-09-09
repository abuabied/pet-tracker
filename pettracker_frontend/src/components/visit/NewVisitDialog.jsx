import { Box, Button, Container, Dialog, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { DoubleEmptyLines, EmptyLine } from "../helper components/EmptyLines"
import { validateNewVisitData } from "../../helpers/validationFunctions";
import { toast } from "react-toastify";
import { addVisit, getClinics, getPets } from "../../services/apiServices";
import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";
import { HttpStatusCode } from "axios";
import { getCookie } from "../../helpers/helperFunctions";
import { useEffect, useState } from "react";

export const NewVisitDialog = ({ isOpen, onClose }) => {

    const [petsList, setPetsList] = useState([])
    const [clinicsList, setClinicsList] = useState([])
    const [petSelectedName, setPetSelectedName] = useState('');
    const [clinicSelectedName, setClinicSelectedName] = useState('');

    const handleChangePet = (event) => {
        setPetSelectedName(event.target.value);
    };
    const handleChangeClinic = (event) => {
        setClinicSelectedName(event.target.value);
    };

    const save = async () => {
        const date = document.getElementById("dateNew");
        const nextVisit = document.getElementById("nextVisitNew");
        const description = document.getElementById("descriptionNew");
        const data = {
            petName: petSelectedName,
            clinic: clinicSelectedName,
            date: date?.value?.trim() ? date?.value.trim() : "",
            nextVisit: nextVisit?.value?.trim() ? nextVisit?.value.trim() : "",
            description: description?.value?.trim() ? description?.value.trim() : "",
        };
        const isValid = validateNewVisitData(data);
        console.log(data)
        if (isValid?.length > 0) {
            isValid.forEach((err) => {
                toast.warning(err);
            });
        } else {
            const user = getCookie(COOKIES_IDS.USERNAME)
            const res = await addVisit(data, user);
            switch (res?.status) {
                case HttpStatusCode.Ok:
                    toast.success("Visit added!");
                    onClose()
                    break;
                default:
                    toast.error(PETS_MESSAGES.ERROR_GENERAL);
            }
        }
    }

    const getClinicsList = async () => {
        const user = {
            username: getCookie("username"),
        };
        const res = await getClinics(user);
        switch (res?.status) {
            case HttpStatusCode.Ok:
                setClinicsList(res?.data)
                break;
            default:
                toast.warning("Could not retrieve all clinics");
        }
    }
    const getPetsList = async () => {
        const user = {
            username: getCookie("username"),
        };
        const res = await getPets(user);
        switch (res?.status) {
            case HttpStatusCode.Ok:
                setPetsList(res?.data)
                break;
            default:
                toast.warning("Could not retrieve all pets");
        }
    }

    const getListsData = async () => {
        await getClinicsList();
        await getPetsList();
    }

    useEffect(() => {
        getListsData();
    }, []);

    return <>
        <Dialog open={isOpen}>
            <Container sx={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <DialogTitle>Fill details:</DialogTitle>
                <Box width={"100%"}>
                    <h5>Pet Name:</h5>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Pet Name</InputLabel>
                        <Select
                            labelId="petSelectedName-label"
                            id="petSelectedName"
                            value={petSelectedName}
                            label="petSelectedName"
                            onChange={handleChangePet}
                        >
                            {petsList.map((pet) => { return <MenuItem value={pet.name}>{pet.name}</MenuItem>; })}
                        </Select>
                    </FormControl>
                </Box>

                <EmptyLine />

                <Box width={"100%"}>
                    <h5>Clinic:</h5>
                    <FormControl fullWidth>
                    <InputLabel id="demo-simple-select-label">Clinic</InputLabel>
                        <Select
                            labelId="clinicSelectedName-label"
                            id="clinicSelectedName"
                            value={clinicSelectedName}
                            label="clinicSelectedName"
                            onChange={handleChangeClinic}
                        >
                            {clinicsList.map((clinic) => { return <MenuItem value={clinic.name}>{clinic.name}</MenuItem>; })}
                        </Select>
                    </FormControl>
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Date:</h5>
                    <TextField id="dateNew" placeholder="Date" />
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Next visit:</h5>
                    <TextField id="nextVisitNew" placeholder="Next Visit" />
                </Box>

                <EmptyLine />

                <Box>
                    <h5>Description:</h5>
                    <TextField id="descriptionNew" placeholder="Description" />
                </Box>

                <DoubleEmptyLines />
                <Button variant="contained" color="success" onClick={save} sx={{ width: "70%" }}>Save</Button>
                <EmptyLine />
                <Button variant="contained" color="error" onClick={onClose} sx={{ width: "70%" }} > Close</Button>
            </Container>
        </Dialog >
    </>
}