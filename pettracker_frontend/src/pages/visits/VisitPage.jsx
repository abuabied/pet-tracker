import { Button, Container } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DoubleEmptyLines, EmptyLine } from "../../components/helper components/EmptyLines";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/helperFunctions";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { NewVisitDialog } from "../../components/visit/NewVisitDialog";
import { VisitsContainer } from "../../components/visit/VisitsContainer";

export const VisitsPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState([])

    const onClose = async () => {
        setIsOpen(false)
        window.location.reload();
    }
    
    return <>
        <DoubleEmptyLines />
        <h3 style={{ margin: "auto 3rem auto 3rem" }}>My Visits:</h3>
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
            <VisitsContainer items={items} />
        </Container>
        <NewVisitDialog isOpen={isOpen} onClose={onClose} />
    </>

}