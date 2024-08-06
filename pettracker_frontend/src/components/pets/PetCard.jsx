import { AppBar, Box, Button, Card, CardHeader, CardMedia, Container, Dialog, IconButton, Toolbar } from "@mui/material";
import RemoveCircleOutlineIcon from "@mui/icons-material/RemoveCircleOutline";
import { useState } from "react";
import CloseIcon from '@mui/icons-material/Close';
import { EmptyLine } from "../helper components/EmptyLines";

export const PetCard = ({ pet }) => {
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
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
                        //   src={`https://img.opencritic.com/${game?.imageURL}`}
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
                    <h1>Info:</h1>
                    <h3>Name: {pet.name}</h3>
                    <h3>Age: {pet.age} years</h3>
                    <h3>Weight: {pet.weight > 0 ? (`${pet.weight} kg`) : "Not given"}</h3>
                    <h3>Species: {pet.species > 0 ? (`${pet.species}`) : "Not given"}</h3>
                    <h3>Breed: {pet.breed != "" ? (`${pet.breed}`) : "Not given"}</h3>

                    <hr style={{width:"80%",textAlign:"left",marginLeft:"0", color:"black"}}></hr>
                    <h1>Info:</h1>
                    
                </Container>
            </Dialog>
        </Box>
    );
};