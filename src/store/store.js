import {applyMiddleware, combineReducers, compose, createStore} from "redux";
import ReduxThunk from 'redux-thunk'
import managementReducer from "./managment.reducer";
import gameReducer from "./game.reducer";

const store = createStore(
    combineReducers({managementReducer, gameReducer}),
    compose(
        applyMiddleware(ReduxThunk),
        window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
    ));

export default store