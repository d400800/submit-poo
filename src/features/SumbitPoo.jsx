import {Box, Button, Container, Grid, Paper} from "@mui/material";
import DraggableList from "../components/DraggableList";
import {useSubmitPooStore} from "./useSubmitPooStore";

export default function SubmitPoo() {
    const {words, verifyResult, reset, onChange} = useSubmitPooStore();

    return(
        <Container maxWidth="sm">
            <Box my={4} textAlign="center" sx={{display: "flex", justifyContent: "space-around"}}>
                <Button color="primary" variant="contained" onClick={verifyResult}>Сдать говно</Button>
                <Button color="primary" variant="outlined" onClick={reset}>Начать заново</Button>
            </Box>

            <Grid container spacing={3}>
                <Grid item xs={6}>
                    <Paper>
                        <DraggableList initialItems={words.w1} onChange={onChange} fieldName="w1"/>
                    </Paper>
                </Grid>

                <Grid item xs={6}>
                    <Paper>
                        <DraggableList initialItems={words.w2} onChange={onChange} fieldName="w2"/>
                    </Paper>
                </Grid>
            </Grid>
        </Container>
    );
}