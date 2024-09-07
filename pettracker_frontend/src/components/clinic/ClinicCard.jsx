import { AppBar, Box, Button, Container, Dialog, IconButton, Input, TextField, Toolbar } from "@mui/material"
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { validateNewClinicData } from "../../helpers/validationFunctions";
import { getCookie } from "../../helpers/helperFunctions";
import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { removeClinic, updateClinic } from "../../services/apiServices";

export const ClinicCard = ({ clinic }) => {
    const [openConfirm, setOpenConfirm] = useState(false);
    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const save = async () => {
        const name = document.getElementById(`nameInfoInput-${clinic.name}`);
        const number = document.getElementById(`numberInfoInput-${clinic.name}`);
        const address = document.getElementById(`addressInfoInput-${clinic.name}`);

        const clinicData = {
            name: name?.value?.trim() ? name?.value.trim() : name?.placeholder,
            number: number?.value?.trim() ? number?.value.trim() : number?.placeholder,
            address: address?.value?.trim() ? address?.value.trim() : address?.placeholder,
        };
        const isValid = validateNewClinicData(clinicData);
        if (isValid?.length > 0) {
            isValid.forEach((err) => {
                toast.warning(err);
            });
        } else {
            const user = getCookie(COOKIES_IDS.USERNAME)
            const res = await updateClinic(clinic.name, clinicData, user);
            switch (res?.status) {
                case HttpStatusCode.Ok:
                    window.location.reload();
                    toast.success("Clinic updated!");

                    break;
                case HttpStatusCode.Conflict:
                    toast.warning("Clinic name already added, please choose a different name or add a number!");
                    break;
                default:
                    toast.error(PETS_MESSAGES.ERROR_GENERAL);
            }
        }
    }

    const remove = async () => {
        const data = {
            name: clinic.name
        };
        const user = getCookie(COOKIES_IDS.USERNAME)
        const res = await removeClinic(data, user);
        switch (res?.status) {
            case HttpStatusCode.Ok:
                handleCloseConfirm();
                window.location.reload();
                toast.success("Clinic removed!");
                break;
            default:
                toast.error(PETS_MESSAGES.ERROR_GENERAL);
        }
    }

    return (
        <Box>
            <Container sx={{
                display: "flex",
                flexDirection: "column",
                gap: "1rem"
            }}>
                <Container sx={{
                    display: "flex",
                    flexWrap: "wrap",
                    gap: "2rem"
                }}>
                    <Box>
                        <h5>Name:</h5>
                        <Input id={`nameInfoInput-${clinic.name}`} placeholder={clinic?.name} />
                    </Box>


                    <Box>
                        <h5>Number:</h5>
                        <Input id={`numberInfoInput-${clinic.name}`} placeholder={clinic.number === "" ? "Number" : clinic.number} />
                    </Box>


                    <Box>
                        <h5>Address:</h5>
                        <Input id={`addressInfoInput-${clinic.name}`} placeholder={clinic.address === "" ? "Address" : clinic.address} />
                    </Box>
                </Container>
                <Container>
                    <Button onClick={save}>Save</Button>
                    <Button onClick={handleClickOpenConfirm}>Delete</Button>
                </Container>

            </Container>
            <Dialog
                open={openConfirm}
                onClose={handleCloseConfirm}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleCloseConfirm}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container
                    sx={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", alignItems: "center" }}>
                    <h1>Are you sure?</h1>
                    <Box
                        sx={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem", alignItems: "center" }}>
                        <Button
                            height={"3rem"}
                            color={"info"}
                            component="label"
                            variant="contained"
                            onClick={remove}
                            sx={{
                                borderRadius: 0,
                                width: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                                fontSize: { xs: "small", sm: "small", md: "medium", lg: "large" },
                            }}
                        >
                            {"Yes"}
                        </Button>
                        <Button
                            height={"3rem"}
                            color={"info"}
                            component="label"
                            variant="contained"
                            onClick={handleCloseConfirm}
                            sx={{
                                borderRadius: 0,
                                width: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                                fontSize: { xs: "small", sm: "small", md: "medium", lg: "large" },
                            }}
                        >
                            {"No"}
                        </Button>
                    </Box>
                </Container>
            </Dialog>
        </Box>
    )
}