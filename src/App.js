import './App.css';
import DraggableList from "./components/DraggableList";
import {Box, Button, Container, Grid, Paper} from "@mui/material";
import {data} from './data';
import _ from 'lodash';
import {useState} from "react";
import {shuffleArray} from "./utils";

function App() {
    const dataIndexed = data.map(([w1, w2], i) => {
        return [
            {id: i.toString(), content: w1, answer: w2},
            {id: i.toString(), content: w2, answer: w1},
        ];
    });

    const [w1, w2] = _.unzip(dataIndexed);

    const [state, setState] = useState({w1: shuffleArray(w1), w2: shuffleArray(w2)});

    const w1Answers = _.groupBy(state.w1, 'content');

    function onChange(updatedItems, key) {
        const newState = {
            ...state,
            [key]: updatedItems,
        };

        setState(newState);
    }

    function verifyResult() {
        const a = {...state};

        const zipped = _.zip([...a.w1], [...a.w2]);

        const checkResult = zipped.map(([w1, w2]) => {
            const isCorrect = w1Answers[w1.content].find(answer => answer.answer === w2.content);

            return [{...w1, isCorrect}, {...w2, isCorrect}];
        });

        const [w1, w2] = _.unzip(checkResult);

        setState({w1, w2});
    }

    function reset() {
        setState({w1: shuffleArray(w1), w2: shuffleArray(w2)});
    }

    return (
        <Box>
            <Container maxWidth="sm">
                <Box my={4} textAlign="center" sx={{display: "flex", justifyContent: "space-around"}}>
                    <Button color="primary" variant="contained" onClick={() => verifyResult()}>Сдать говно</Button>
                    <Button color="primary" variant="outlined" onClick={() => reset()}>Начать заново</Button>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Paper>
                            <DraggableList initialItems={state.w1} onChange={onChange} fieldName="w1"/>
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Paper>
                            <DraggableList initialItems={state.w2} onChange={onChange} fieldName="w2"/>
                        </Paper>
                    </Grid>
                </Grid>
            </Container>
        </Box>
    );
}

export default App;
