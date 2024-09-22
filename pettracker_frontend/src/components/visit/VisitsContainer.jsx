import { Container, TextField } from "@mui/material"
import { TripleEmptyLines } from "../helper components/EmptyLines";
import { useEffect, useState } from "react";
import { getCookie } from "../../helpers/helperFunctions";
import { toast } from "react-toastify";
import { HttpStatusCode } from "axios";
import { getVisits } from "../../services/apiServices";
import { VisitCard } from "./VisitCard";

export const VisitsContainer = ({ items }) => {
    const [myItems, setItems] = useState(items)

    // const onChange = () => {
    //     const val = document.getElementById("search").value
    //     const filtered = items.filter((pet) => { return pet?.name.includes(val) })
    //     setItems(filtered)
    // }

    useEffect(() => {
        const getVisitsList = async () => {
            const user = {
                username: getCookie("username"),
            };
            const res = await getVisits(user);
            switch (res?.status) {
                case HttpStatusCode.Ok:
                    let tmpList = res?.data
                    tmpList = tmpList ? tmpList : []
                    tmpList.sort((a, b) => new Date(b.id) - new Date(a.id));
                    setItems(tmpList)
                    break;
                default:
                    toast.warning("Could not retrieve all visits");
            }
        }
        getVisitsList()
    }, []);

    return (
        <Container sx={{
            display: "flex",
            flexDirection: "column",
            minHeight: "50vh",
            minWidth: "fit-content"
        }}>
            {/* <TextField id="search" label="Search..." variant="standard" onChange={onChange} />
            <TripleEmptyLines /> */}
            <Container
                sx={{
                    flexDirection: "column",
                    minWidth: "70vw",
                    minHeight: "fit-content",
                    display: "flex",
                    gap: "3rem",
                    flexWrap: "wrap",
                    justifyContent: "center",
                    paddingTop: "3rem",
                    paddingBottom: "3rem",
                    paddingLeft: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                    paddingRight: { xs: "1rem", sm: "2rem", md: "3rem", lg: "4rem" },
                }}
            >
                {
                    myItems.map((visit) => {
                        return <VisitCard visit={visit} />;
                    })
                }
            </Container>
        </Container>)
}