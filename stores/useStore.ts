import { create } from 'zustand';

type StoreProps = {
    currentQuestionIndex: number,
    score: number,
    totalQuestions: number,
    userAnswers: string[],
    setCurrentQuestionIndex: (index: number) => void,
    incrementScore: () => void,
    addUserAnswer: (answer: string) => void,
    resetQuiz: () => void,
}

const useStore = create<StoreProps>((set) => ({
    currentQuestionIndex: 0,
    score: 0,
    totalQuestions: 10,
    userAnswers: [],
    setCurrentQuestionIndex: (index) => set({ currentQuestionIndex: index }),
    incrementScore: () => set((state) => ({ score: state.score + 1 })),
    addUserAnswer: (answer) => set((state) => ({
        userAnswers: [...state.userAnswers, answer]
    })),
    resetQuiz: () => set({ currentQuestionIndex: 0, score: 0, userAnswers: [] }),
}));

export default useStore;