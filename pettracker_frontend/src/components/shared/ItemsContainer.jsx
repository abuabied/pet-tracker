import { Container, TextField } from "@mui/material"
import { TripleEmptyLines } from "../helper components/EmptyLines"

export const ItemsContainer = ({ items }) => {
    return (<Container sx={{
        display: "flex",
        flexDirection: "column",
        minHeight: "50vh"
    }}>
        <TextField id="standard-basic" label="Search..." variant="standard" />
        <TripleEmptyLines />
        {items.length == 0 ? <h4>No items to show!</h4> : <></>}
    </Container>)
}