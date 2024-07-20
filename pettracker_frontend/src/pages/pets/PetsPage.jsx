import { Button, Container } from "@mui/material"
import { ItemsContainer } from "../../components/shared/ItemsContainer"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DoubleEmptyLines, EmptyLine } from "../../components/helper components/EmptyLines";
import { NewPetDialog } from "../../components/pets/NewPetDialog";
import { useState } from "react";

export const PetsPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    return <>
        <DoubleEmptyLines />
        <h3 style={{ margin: "auto 3rem auto 3rem" }}>My Pets:</h3>
        <Container sx={{
            display: "flex", flexDirection: "column", alignItems: "center",
            minWidth: "100%", margin: 0,
            padding: "auto 1rem auto 1rem"
        }}>
            <EmptyLine />
            <Button variant="contained" color="success" startIcon={<AddCircleIcon />}
                onClick={() => {setIsOpen(true)}}
                sx={{
                    width: { xs: "90vw", sm: "40vw", lg: "20vw" },
                    margin: "auto 1rem auto 1rem",
                }}>
                Add
            </Button>
            <DoubleEmptyLines />
            <ItemsContainer items={[]} />
        </Container>
        <NewPetDialog isOpen={isOpen} onClose={()=>{setIsOpen(false)}}/>
    </>

}