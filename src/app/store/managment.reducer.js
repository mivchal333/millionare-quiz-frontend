import {
    GET_QUESTIONS,
    RESET_GAME, SET_BAD_ANSWER,
    SET_GAME_STARTED, SET_GOOD_ANSWER,
    SET_UP_APP, SET_USER_AVATAR,
} from './actionTypes'

const initialState = {
    nick: '',
    difficulty: null,
    avatar: '',
    gameStarted: false,
    isGameFinished: false,
    hasWon: false,
}


const managementReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_GAME_STARTED:
            return {
                ...state,
                gameStarted: true,
            }
        case SET_UP_APP:
            return {
                ...state,
                nick: action.payload.nick,
                difficulty: action.payload.difficulty
            }
        case SET_USER_AVATAR:
            return {
                ...state,
                avatar: action.payload.avatar,
            }
        case RESET_GAME:
            return {
                ...initialState,
            }
        case SET_BAD_ANSWER:
            return {
                ...state,
                isGameFinished: true,
            }

        default:
            return state;
    }

}
export default managementReducer;
