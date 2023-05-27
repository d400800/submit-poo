import {Box} from '@mui/material';

export default function WordByLetter({word, searchTerm}) {
    const startIndex = word.indexOf(searchTerm);
    const endIndex = startIndex + searchTerm.length;

    const letters = word
        .split('')
        .map((letter, i) => ({
            letter,
            isSelected: startIndex > -1 && searchTerm !== '' && i >= startIndex && i < endIndex
        }));

    return (
        letters.map((letter, i) => (
            <Box
                component="span"
                key={i}
                sx={{
                    backgroundColor: letter.isSelected ? 'success.light': 'transparent',
                    color: letter.isSelected ? 'primary.contrastText': 'text.primary'
                }}>
                {letter.letter}
            </Box>
        ))
    );
}