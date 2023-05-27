import CloseIcon from '@mui/icons-material/Close';
import {Box, Button, Container, Grid, InputAdornment, Paper, TextField} from '@mui/material';

import {useSubmitPooStore} from './useSubmitPooStore';
import DraggableList from '../components/DraggableList';
import SimpleDialog from '../components/SimpleDialog';

export default function SubmitPoo() {
    const {
        words,
        isComplete,
        verifyResult,
        closeDialog,
        reset,
        onChange,
        searchTerm1,
        searchTerm2,
        setSearchTerm1,
        setSearchTerm2
    } = useSubmitPooStore();

    return(
        <>
            <Container maxWidth="sm">
                {isComplete && (<Box>isComplete</Box>)}

                <Box my={4} textAlign="center" sx={{display: 'flex', justifyContent: 'space-around'}}>
                    <Button color="primary" variant="contained" onClick={verifyResult}>Сдать говно</Button>
                    <Button color="primary" variant="outlined" onClick={reset}>Начать заново</Button>
                </Box>

                <Grid container spacing={3}>
                    <Grid item xs={6}>
                        <Box mb={3}>
                            <TextField
                                fullWidth
                                id="w1-search"
                                size="small"
                                variant="standard"
                                value={searchTerm1}
                                placeholder="поиск"
                                onChange={e => setSearchTerm1(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <CloseIcon
                                                fontSize="small"
                                                onClick={() => setSearchTerm1('')}
                                                sx={{cursor: 'pointer'}}
                                            />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>

                        <Paper>
                            <DraggableList
                                searchTerm={searchTerm1}
                                initialItems={words.w1}
                                onChange={onChange}
                                fieldName="w1"
                            />
                        </Paper>
                    </Grid>

                    <Grid item xs={6}>
                        <Box mb={3}>
                            <TextField
                                fullWidth
                                id="w2-search"
                                size="small"
                                variant="standard"
                                value={searchTerm2}
                                placeholder="поиск"
                                onChange={e => setSearchTerm2(e.target.value)}
                                InputProps={{
                                    endAdornment: (
                                        <InputAdornment position="end">
                                            <CloseIcon
                                                fontSize="small"
                                                onClick={() => setSearchTerm2('')}
                                                sx={{cursor: 'pointer'}}
                                            />
                                        </InputAdornment>
                                    )
                                }}
                            />
                        </Box>

                        <Paper>
                            <DraggableList
                                searchTerm={searchTerm2}
                                initialItems={words.w2}
                                onChange={onChange}
                                fieldName="w2"
                            />
                        </Paper>
                    </Grid>
                </Grid>
            </Container>

            <SimpleDialog
                open={isComplete}
                handleClose={() => closeDialog()}
                handleAction={() => reset()}
            />
        </>
    );
}