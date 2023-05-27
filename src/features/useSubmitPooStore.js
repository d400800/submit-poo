import _ from 'lodash';
import {create} from 'zustand';

import {data} from '../data';
import {shuffleArray} from '../utils';

const dataIndexed = data.map(([w1, w2], i) => [
    {id: i.toString(), content: w1, answer: w2},
    {id: i.toString(), content: w2, answer: w1}
]);

const [w1, w2] = _.unzip(dataIndexed);

const shuffledWords = {w1: shuffleArray(w1), w2: shuffleArray(w2)};

const w1Answers = _.groupBy(shuffledWords.w1, 'content');

export const useSubmitPooStore = create((set) => ({
    words: shuffledWords,
    onChange: (updatedItems, key) => set((state) => ({words: {...state.words, [key]: updatedItems}})),
    isComplete: false,
    closeDialog: () => set(() => ({isComplete : false})),
    verifyResult: () => set(state => {
        let count = 0;

        const zipped = _.zip([...state.words.w1], [...state.words.w2]);

        const checkResult = zipped.map(([w1, w2]) => {
            const isCorrect = w1Answers[w1.content]
                .find(answer => answer.answer === w2.content);

            if (isCorrect) {
                count++;
            }

            return [{...w1, isCorrect}, {...w2, isCorrect}];
        });

        const [w1, w2] = _.unzip(checkResult);

        return {
            ...state,
            isComplete: count >= zipped.length,
            words: {w1, w2}
        };
    }),
    reset: () => set(state => ({
        ...state,
        isComplete: false,
        words: {w1: shuffleArray(w1), w2: shuffleArray(w2)}
    })),
    searchTerm1: '',
    searchTerm2: '',
    setSearchTerm1: (value) => set(() => ({searchTerm1: value})),
    setSearchTerm2: (value) => set(() => ({searchTerm2: value}))
}));