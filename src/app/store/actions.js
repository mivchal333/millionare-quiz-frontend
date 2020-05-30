import {
    GET_QUESTIONS,
    RESET_GAME,
    SET_BAD_ANSWER,
    SET_GAME_STARTED,
    SET_GOOD_ANSWER,
    SET_UP_APP,
    SET_USER_AVATAR
} from "./actionTypes";
import {shuffle} from 'lodash'
import {fetchQuestions} from "../api/question.api";

export const setGameStarted = () => dispatch => {
    dispatch(setGameStartedAction())
}

export const setGameStartedAction = () => ({
    type: SET_GAME_STARTED
})


export const setupApp = (nick, difficulty) => dispatch => {
    dispatch(setupAppAction(nick, difficulty))
}
export const setupAppAction = (nick, difficulty) => ({
    type: SET_UP_APP,
    payload: {
        nick,
        difficulty,
    }
})

export const resetGame = () => dispatch => {
    dispatch(resetGameAction())
}
export const resetGameAction = () => ({
    type: RESET_GAME
})

export const getQuestions = difficulty => async dispatch => {
    const response = await fetchQuestions(difficulty);
    const questions = response.map(item => {
        const {
            incorrectAnswers,
            ...rest
        } = item
        return {
            ...rest,
            answers: shuffle([rest.correctAnswer, ...incorrectAnswers])
        }
    })
    dispatch(getQuestionsAction(questions))
}

export const getQuestionsAction = (questions) => ({
    type: GET_QUESTIONS,
    payload: questions,
})

export const setGoodAnswer = () => dispatch => {
    dispatch(setGoodAnswerAction())
}
export const setGoodAnswerAction = () => ({
    type: SET_GOOD_ANSWER,
})


export const setBadAnswer = () => dispatch => {
    dispatch(setBadAnswerAction())
}
export const setBadAnswerAction = () => ({
    type: SET_BAD_ANSWER,
})


export const setUserAvatar = (avatar) => dispatch => {
    dispatch(setUserAvatarAction(avatar))
}
export const setUserAvatarAction = (avatar) => ({
    type: SET_USER_AVATAR,
    payload: {
        avatar
    }
})



