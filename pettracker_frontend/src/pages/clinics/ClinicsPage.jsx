import { Button, Container } from "@mui/material"
import AddCircleIcon from '@mui/icons-material/AddCircle';
import { DoubleEmptyLines, EmptyLine } from "../../components/helper components/EmptyLines";
import { useEffect, useState } from "react";
import { getClinics } from "../../services/apiServices";
import { getCookie } from "../../helpers/helperFunctions";
import { HttpStatusCode } from "axios";
import { toast } from "react-toastify";
import { ClinicsContainer } from "../../components/clinic/ClinicContainer";
import { NewClinicDialog } from "../../components/clinic/NewClinicCard";

export const ClinicsPage = () => {
    const [isOpen, setIsOpen] = useState(false)
    const [items, setItems] = useState([])

    const onClose = async () => {
        setIsOpen(false)
        getClinics()
        window.location.reload();
    }

    const getClinicsList = async () => {
        const user = {
            username: getCookie("username"),
        };
        const res = await getClinics(user);
        switch (res?.status) {
            case HttpStatusCode.Ok:
                setItems(res?.data)
                break;
            default:
                toast.warning("Could not retrieve all clinics");
        }
    }


    useEffect(() => {
        getClinicsList()
    }, []);

    return <>
        <DoubleEmptyLines />
        <h3 style={{ margin: "auto 3rem auto 3rem" }}>My Clinics:</h3>
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
            <ClinicsContainer items={items} />
        </Container>
        <NewClinicDialog isOpen={isOpen} onClose={onClose} />
    </>

}