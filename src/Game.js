import React, {Component} from 'react'
import PropTypes from 'prop-types'
import Questions from './Questions'
import Background from './Background'
import SidePanel from './SidePanel'
import EndScreen from './EndScreen'
import {connect} from "react-redux";
import {getQuestions, resetGame, setBadAnswer, setGoodAnswer} from "./store/actions";
import managementReducer from "./store/managment.reducer";

class Game extends Component {
    componentDidMount() {
        const {
            appSettings: {
                nick,
                difficulty,
                gameStarted
            },
            history
        } = this.props

        if (!nick || !difficulty || !gameStarted) {
            history.replace('/')
            return
        }

        this.fetchQuestions()
    }

    resetGameAndReturn = async () => {
        await this.props.resetGame();
        this.props.history.push("/");
    }

    fetchQuestions = () => {
        this.props.getQuestions(this.props.appSettings.difficulty)
    }


    setCurrentAnswer = (answer) => {
        return () => {
            const {questions, currentQuestionNumber, setGoodAnswer, setBadAnswer} = this.props;
            const currentQuestion = questions[currentQuestionNumber]
            return answer === currentQuestion.correctAnswer ? setGoodAnswer() : setBadAnswer()
        }
    }


    render() {
        const {
            questions,
            currentQuestionNumber,
            hasWon,
            isGameFinished,
        } = this.props;

        if (!questions.length) {
            return null;
        }

        const {
            question,
            correctAnswer,
            answers
        } = questions[currentQuestionNumber]

        return isGameFinished
            ? (
                <EndScreen
                    hasWon={hasWon}
                    currentQuestionNumber={currentQuestionNumber}
                    resetGame={this.resetGameAndReturn}
                />
            )
            : (
                <div className='l-game'>
                    <Background>
                        <div className='c-questions'>
                            <Questions
                                question={question}
                                answers={answers}
                                correctAnswer={correctAnswer}
                                onSelect={this.setCurrentAnswer}
                            />
                        </div>
                    </Background>
                    <SidePanel
                        currentQuestionNumber={currentQuestionNumber}
                        correctAnswer={correctAnswer}
                        answers={answers}
                        setCurrentQuestionAnswers={this.setCurrentQuestionAnswers}
                    />
                </div>
            )
    }
}

Game.propTypes = {
    appSettings: PropTypes.object,
    history: PropTypes.object,
    resetGame: PropTypes.func,
    getQuestions: PropTypes.func,
    setGoodAnswer: PropTypes.func,
    setBadAnswer: PropTypes.func,
    questions: PropTypes.array,
}
const mapStateToProps = state => ({
    appSettings: state.managementReducer,
    questions: state.gameReducer.questions,
    currentQuestionNumber: state.gameReducer.currentQuestionNumber,
    isGameFinished: state.managementReducer.isGameFinished,
    hasWon: state.managementReducer.hasWon,
})
const mapDispatchToProps = {resetGame, getQuestions, setGoodAnswer, setBadAnswer};
export default connect(mapStateToProps, mapDispatchToProps)(Game)
