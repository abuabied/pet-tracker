import { AppBar, Box, Button, Card, CardHeader, CardMedia, Container, Dialog, IconButton, Input, TextField, Toolbar } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useEffect, useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { EmptyLine } from "../helper components/EmptyLines";
import { StyledButton } from "../helper components/StyledButton";

export const PetCard = ({ pet, removePet }) => {
    const [open, setOpen] = useState(false);
    const [openConfirm, setOpenConfirm] = useState(false);
    const [imgData, setImgData] = useState()
    const [isDisabled, setIsDisabled] = useState(true)
    const [showEditButtons, setShowEditButtons] = useState(false);

    const editInfo = () => {
        setIsDisabled(false);
        setShowEditButtons(true);
    };
    const saveClick = () => { }
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
        reader.readAsDataURL(document.getElementById('image').files[0]);
    };

    const remove = async () => {
        removePet(pet?.name)
        handleCloseConfirm();
    }

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleClickOpenConfirm = () => {
        setOpenConfirm(true);
    };

    const handleCloseConfirm = () => {
        setOpenConfirm(false);
    };
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
                    id="name"
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
                            <StyledButton onClick={saveClick} buttonText={"Save"} />
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
                        {isDisabled ? <TextField id="nameInputInfo" value={pet?.name} disabled /> : <Input id="nameInputInfoInput" />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Age:</h5>
                        {isDisabled ? <TextField id="ageInfo" value={pet.age === "" ? "Age" : pet.age} disabled /> : <Input id="ageInfoInput" type="number" />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Weight:</h5>
                        {isDisabled ? <TextField id="weightInfo" value={pet.weight === "" ? "Weight" : pet.weight} disabled={isDisabled} /> : <Input id="weightInfoInput" type="number" />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Species:</h5>
                        {isDisabled ? <TextField id="speciesInfo" value={pet.species === "" ? "Species" : pet.species} disabled={isDisabled} /> : <Input id="speciesInfoInput" />}
                    </Box>

                    <EmptyLine />

                    <Box>
                        <h5>Breed:</h5>
                        {isDisabled ? <TextField id="breedInfo" value={pet.breed === "" ? "Breed" : pet.breed} disabled={isDisabled} /> : <Input id="breedInfoInput" />}
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
                            {"Add Shot"}
                        </Button>
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