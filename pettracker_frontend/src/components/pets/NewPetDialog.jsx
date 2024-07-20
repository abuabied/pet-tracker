import { Button, Container, Dialog, DialogTitle, TextField } from "@mui/material"
import { DoubleEmptyLines, EmptyLine } from "../helper components/EmptyLines"

export const NewPetDialog = ({ isOpen, onClose }) => {
    const save = () => {
        //if dets ok sbaba
        //else warning
        onClose()
    }

    return <>
        <Dialog open={isOpen}>
            <Container sx={{ padding: "1rem", display: "flex", flexDirection: "column", alignItems: "center" }}>
                <DialogTitle>Fill details:</DialogTitle>
                <TextField id="name" placeholder="Name" />
                <EmptyLine />
                <TextField id="age" placeholder="Age" />
                <EmptyLine />
                <TextField id="weight" placeholder="Weight" />
                <EmptyLine />
                <TextField id="species" placeholder="Species" />
                <EmptyLine />
                <TextField id="breed" placeholder="breed" />
                <DoubleEmptyLines />
                <Button variant="contained" color="success" onClick={save} sx={{ width: "70%" }}>Save</Button>
                <EmptyLine />
                <Button variant="contained" color="error" onClick={onClose} sx={{ width: "70%" }} > Close</Button>
            </Container>
        </Dialog >
    </>
}