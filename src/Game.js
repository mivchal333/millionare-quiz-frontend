import React, {useEffect} from 'react'
import PropTypes from 'prop-types'
import Questions from './Questions'
import SidePanel from './SidePanel'
import EndScreen from './app/end/EndScreen'
import {connect} from "react-redux";
import {getQuestions, resetGame, setBadAnswer, setGoodAnswer} from "./app/store/actions";

const Game = (props) => {
    const {
        questions,
        currentQuestionNumber,
        hasWon,
        isGameFinished,
        appSettings: {nick}
    } = props;

    useEffect(() => {
        const {
            appSettings: {
                nick,
                difficulty,
                gameStarted
            },
            history
        } = props;

        if (!nick || !difficulty || !gameStarted) {
            history.replace('/');
            return
        }
        props.getQuestions(props.appSettings.difficulty)
    }, [isGameFinished, currentQuestionNumber]);
    const resetGameAndReturn = async () => {
        await props.resetGame();
        props.history.push("/");

    };
    
    const setCurrentAnswer = (answer) => {
        return () => {
            const {questions, currentQuestionNumber, setGoodAnswer, setBadAnswer} = props;
            const currentQuestion = questions[currentQuestionNumber]
            return answer === currentQuestion.correctAnswer ? setGoodAnswer() : setBadAnswer()
        };
    };
    if (!questions.length) {
        return null;

    }
    const {
        question,
        correctAnswer,
        answers
    } = questions[currentQuestionNumber];

    return isGameFinished
        ? (
            <EndScreen
                hasWon={hasWon}
                currentQuestionNumber={currentQuestionNumber}
                resetGame={resetGameAndReturn}
                nick={nick}
            />
        )
        : (
            <div className="game-container">
                <Questions
                    question={question}
                    answers={answers}
                    correctAnswer={correctAnswer}
                    onSelect={setCurrentAnswer}
                />
                <SidePanel
                    currentQuestionNumber={currentQuestionNumber}
                    correctAnswer={correctAnswer}
                    answers={answers}
                    setCurrentQuestionAnswers={props.setCurrentQuestionAnswers}
                />
            </div>
        )
};


Game.propTypes = {
    appSettings: PropTypes.object,
    history: PropTypes.object,
    resetGame: PropTypes.func,
    getQuestions: PropTypes.func,
    setGoodAnswer: PropTypes.func,
    setBadAnswer: PropTypes.func,
    questions: PropTypes.array,
};
const mapStateToProps = state => ({
    appSettings: state.managementReducer,
    questions: state.gameReducer.questions,
    currentQuestionNumber: state.gameReducer.currentQuestionNumber,
    isGameFinished: state.managementReducer.isGameFinished,
    hasWon: state.managementReducer.hasWon,
});
const mapDispatchToProps = {resetGame, getQuestions, setGoodAnswer, setBadAnswer};
export default connect(mapStateToProps, mapDispatchToProps)(Game)
