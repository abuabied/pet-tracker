import { Container, TextField } from "@mui/material"
import { PetCard } from "./PetCard";
import { TripleEmptyLines } from "../helper components/EmptyLines";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/helperFunctions";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { getPets, removePets } from "../../services/apiServices";
import { COOKIES_IDS, PETS_MESSAGES } from "../../consts/StringConsts";

export const ItemsContainer = ({ items }) => {
    const [myItems, setItems] = useState(items)

    const onChange = () => {
        const val = document.getElementById("search").value
        const filtered = items.filter((pet) => { return pet?.name.includes(val) })
        setItems(filtered)
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
            // default:
            //     toast.warning("Could not retrieve all pets");
        }
    }

    const removePet = async (petName) => {
        const petData = {
            name: petName.trim(),
        };
        const user = getCookie(COOKIES_IDS.USERNAME)
        const res = await removePets(petData, user);
        switch (res?.status) {
            case HttpStatusCode.Ok:
                toast.success("Pet removed!");
                getPetsList();
                setTimeout(1000);
                break;
            default:
                toast.error(PETS_MESSAGES.ERROR_GENERAL);
        }
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
                // default:
                //     toast.warning("Could not retrieve all pets");
            }
        }
        getPetsList()
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
                        return <PetCard pet={pet} removePet={removePet} />;
                    })
                }
            </Container>
        </Container>)
}