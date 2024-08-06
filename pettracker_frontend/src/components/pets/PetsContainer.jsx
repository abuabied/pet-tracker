import { Container, TextField } from "@mui/material"
import { PetCard } from "./PetCard";
import { TripleEmptyLines } from "../helper components/EmptyLines";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/helperFunctions";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { getPets } from "../../services/apiServices";

export const ItemsContainer = ({ items }) => {
    const [myItems, setItems] = useState(items)

    const onChange = () => {
        const val = document.getElementById("search").value
        const filtered = items.filter((pet) => { return pet?.name.includes(val) })
        setItems(filtered)
    }

    
    useEffect(() => {
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
        getPetsList()
        console.log(items.length)
    }, []);

    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh",
            minWidth: "fit-content"
        }}>
            <TextField id="search" label="Search..." variant="standard" onChange={onChange} />
            <TripleEmptyLines />
            <Container
                sx={{
                    minWidth: "70vw",
                    minHeight: "fit-content",
                    display: "flex",
                    gap: "2rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    paddingTop: "3rem",
                    paddingBottom: "3rem",
                    paddingLeft: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                    paddingRight: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                }}
            >
                {
                    myItems.map((pet) => {
                        return <PetCard pet={pet} />;
                    })
                }
            </Container>
        </Container>)
}