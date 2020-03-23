import {GET_QUESTIONS, RESET_GAME, SET_GOOD_ANSWER} from "./actionTypes";

const gameState = {
    questions: [],
    currentQuestion: {},
    answers: [],
    currentQuestionNumber: 0,
    answer: {}
}

const gameReducer = (state = gameState, action) => {
    const {type, payload} = action;
    switch (type) {
        case GET_QUESTIONS:
            return {
                ...state,
                questions: payload,
            }
        case SET_GOOD_ANSWER:
            return {
                ...state,
                currentQuestionNumber: ++state.currentQuestionNumber,
            }
        case RESET_GAME:
            return {
                ...gameState
            }
        default:
            return state
    }
}

export default gameReducer
