import { AppBar, Box, Button, Card, CardHeader, CardMedia, Container, Dialog, IconButton, Input, TextField, Toolbar } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { EmptyLine } from "../helper components/EmptyLines";
import { StyledButton } from "../helper components/StyledButton";
import { getVisitsForPets, updatePet } from "../../services/apiServices";
import { getCookie } from "../../helpers/helperFunctions";
import { HttpStatusCode } from "axios";
import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";
import { toast } from "react-toastify";
import { validateNewPetData } from "../../helpers/validationFunctions";
import { VisitCard } from "../visit/VisitCard";

export const PetCard = ({ pet, removePet }) => {
    const [items, setItems] = useState([]);
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [imgData, setImgData] = useState()
    const [isDisabled, setIsDisabled] = useState(true)
    const [showEditButtons, setShowEditButtons] = useState(false);

    const editInfo = () => {
        setIsDisabled(false);
        setShowEditButtons(true);
    };
    const cancelEdit = () => {
        setIsDisabled(true);
        setShowEditButtons(false);
    };


    const uploadImg = () => {
        var reader = new FileReader();
        reader.onload = function (e) {
            var thisImage = reader.result;
            setImgData(thisImage)
        };
        reader.readAsDataURL(document.getElementById('imageInfo').files[0]);
    };

    const remove = async () => {
        removePet(pet?.name)
        handleCloseConfirm();
    }

    const handleClickOpen = async () => {
        const getVisitsList = async () => {
            const user = {
                username: getCookie("username"),
            };
            console.log(pet.name)
            const res = await getVisitsForPets(user.username, { name: pet.name });
            switch (res?.status) {
                case HttpStatusCode.Ok:
                    let tmpList = res?.data
                    tmpList.sort((a, b) => new Date(b.id) - new Date(a.id));
                    setItems(tmpList)
                    break;
                // default:
                //     toast.warning("Could not retrieve all visits for pet");
            }
        }
        await getVisitsList()
        setOpen(true);
    };

    const handleClose = () => {
        cancelEdit();
        setOpen(false);
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };

    const save = async () => {
        const name = document.getElementById("nameInfoInput");
        const age = document.getElementById("ageInfoInput");
        const weight = document.getElementById("weightInfoInput");
        const species = document.getElementById("speciesInfoInput");
        const breed = document.getElementById("breedInfoInput");

        const cardName = document.getElementById("cardName");

        const petData = {
            name: name?.value?.trim() ? name?.value.trim() : name.placeholder,
            age: age?.value?.trim() ? age?.value.trim() : age.placeholder,
            weight: weight?.value?.trim() ? weight?.value.trim() : weight.placeholder,
            species: species?.value?.trim() ? species?.value.trim() : species.placeholder,
            breed: breed?.value?.trim() ? breed.value.trim() : breed.placeholder,
            image: imgData ? imgData : pet.image,
        };
        const isValid = validateNewPetData(petData);
        if (isValid?.length > 0) {
            isValid.forEach((err) => {
                toast.warning(err);
            });
        } else {
            const user = getCookie(COOKIES_IDS.USERNAME)
            const res = await updatePet(pet.name, petData, user);
            switch (res?.status) {
                case HttpStatusCode.Ok:
                    window.location.reload();
                    toast.success("Pet updated!");
                    handleClose()

                    break;
                case HttpStatusCode.Conflict:
                    toast.warning("Pet name already added, please choose a different name or add a number!");
                    break;
                default:
                    toast.error(PETS_MESSAGES.ERROR_GENERAL);
            }
        }
    }

    return (
        <Box>
            <Card
                sx={{
                    width: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                    height: "fit-content",
                    cursor: "pointer",
                }}
            >
                <CardHeader
                    id="cardName"
                    onClick={handleClickOpen}
                    title={pet?.name}
                    sx={{
                        padding: "0.5rem",
                        color: "ghostwhite",
                        backgroundColor: "black",
                        opacity: "80%",
                        width: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                        height: "fit-content",
                        textAlign: "center",
                        textDecoration: "underline"
                    }}
                />
                <CardMedia
                    onClick={handleClickOpen}
                    sx={{
                        width: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                        height: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                    }}
                >
                    <img
                        style={{ maxHeight: "100%", maxWidth: "100%" }}
                        src={pet?.image}
                        alt={"img"}
                    />
                </CardMedia>

                <Box
                    sx={{
                        width: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                        padding: 0,
                    }}
                >
                    <Box>
                        <Button
                            height={"3rem"}
                            color={"error"}
                            component="label"
                            variant="contained"
                            onClick={handleClickOpenConfirm}
                            startIcon={
                                <RemoveCircleOutlineIcon />
                            }
                            sx={{
                                borderRadius: 0,
                                width: { xs: "250px", sm: "250px", md: "300px", lg: "350px" },
                                fontSize: { xs: "small", sm: "small", md: "medium", lg: "large" },
                            }}
                        >
                            {"Remove pet"}
                        </Button>
                    </Box>
                </Box>
            </Card>
            <Dialog
                fullScreen
                open={open}
                onClose={handleClose}
            >
                <AppBar sx={{ position: 'relative' }}>
                    <Toolbar>
                        <IconButton
                            edge="start"
                            color="inherit"
                            onClick={handleClose}
                            aria-label="close"
                        >
                            <CloseIcon />
                        </IconButton>
                    </Toolbar>
                </AppBar>
                <Container
                    sx={{ display: "flex", flexDirection: "column", gap: "2rem", padding: "2rem" }}>

                    {showEditButtons ? (
                        <Box
                            sx={{
                                display: "flex",
                                justifyContent: "space-evenly",
                                flexWrap: "wrap",
                                gap: "2rem",
                            }}
                        >
                            <StyledButton onClick={save} buttonText={"Save"} />
                            <StyledButton onClick={cancelEdit} buttonText={"Cancel"} />
                        </Box>
                    ) : (
                        <Box>
                            <EmptyLine />
                            <StyledButton onClick={editInfo} buttonText={"Edit info"} />
                        </Box>
                    )}

                    <h1>General Information:</h1>
                    <Box>
                        <h5>Name:</h5>
                        {isDisabled ? <TextField id="nameInfo" value={pet?.name} disabled /> : <Input id="nameInfoInput" placeholder={pet?.name} />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Age:</h5>
                        {isDisabled ? <TextField id="ageInfo" value={pet.age === "" ? "Age" : pet.age} disabled /> : <Input id="ageInfoInput" type="number" placeholder={pet.age === "" ? "Age" : pet.age} />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Weight:</h5>
                        {isDisabled ? <TextField id="weightInfo" value={pet.weight === "" ? "Weight" : pet.weight} disabled={isDisabled} /> : <Input id="weightInfoInput" type="number" placeholder={pet.weight === "" ? "Weight" : pet.weight} />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Species:</h5>
                        {isDisabled ? <TextField id="speciesInfo" value={pet.species === "" ? "Species" : pet.species} disabled={isDisabled} /> : <Input id="speciesInfoInput" placeholder={pet.species === "" ? "Species" : pet.species} />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Breed:</h5>
                        {isDisabled ? <TextField id="breedInfo" value={pet.breed === "" ? "Breed" : pet.breed} disabled={isDisabled} /> : <Input id="breedInfoInput" placeholder={pet.breed === "" ? "Breed" : pet.breed} />}
                    </Box>

                    <EmptyLine />


                    {isDisabled ? <Box>
                        <h3>Image: {pet.image ? "" : "No image added"}</h3>
                        {pet.image ? <img
                            maxWidth={"250px"}
                            maxHeight={"250px"}
                            src={pet?.image}
                            alt={"img"}
                        /> : ""}
                    </Box>
                        :
                        <Box>
                            <h5>Image:</h5>
                            <input id="imageInfo" onChange={uploadImg} type="file" name="filename" accept="image/png, image/jpeg" />
                        </Box>
                    }

                    <hr style={{ width: "80%", textAlign: "left", marginLeft: "0", color: "black" }}></hr>
                    <h1>Medical Information:</h1>
                    <h3>Vaccines:</h3>
                    {items.map((visit) => {
                        return <VisitCard visit={visit} showName={false} />;
                    })}
                    {/* <Button
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
                        {"Add Shot"}
                    </Button> */}
                </Container>
            </Dialog>
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
    );
};