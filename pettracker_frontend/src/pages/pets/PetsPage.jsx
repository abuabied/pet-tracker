import { Button, Container } from "@mui/material"
import { ItemsContainer } from "../../components/pets/PetsContainer"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DoubleEmptyLines, EmptyLine } from "../../components/helper components/EmptyLines";
import { NewPetDialog } from "../../components/pets/NewPetDialog";
import { useEffect, useState } from "react";
import { getPets } from "../../services/apiServices";
import { getCookie } from "../../helpers/helperFunctions";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";

export const PetsPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState([])

    const onClose = async () => {
        setIsOpen(false)
        getPetsList()
        window.location.reload();
    }

    const getPetsList = async () => {
        const user = {
            username: getCookie("username"),
        };
        const res = await getPets(user);
        switch (res?.status) {
            case HttpStatusCode.Ok:
                setItems(res?.data)
                break;
            default:
                toast.warning("Could not retrieve all pets");
        }
    }


    useEffect(() => {
        getPetsList()
    }, []);

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
                onClick={() => { setIsOpen(true) }}
                sx={{
                    width: { xs: "90vw", sm: "40vw", lg: "20vw" },
                    margin: "auto 1rem auto 1rem",
                }}>
                Add
            </Button>
            <DoubleEmptyLines />
            <ItemsContainer items={items} />
        </Container>
        <NewPetDialog isOpen={isOpen} onClose={onClose} />
    </>

}