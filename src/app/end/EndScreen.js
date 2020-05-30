import React from 'react'
import PropTypes from 'prop-types'
import {questionsList} from "../const/game.const";
import {Button, Header} from "semantic-ui-react";

const EndScreen = props => {
    console.log(props)
    const {
        hasWon,
        currentQuestionNumber,
        resetGame,
        nick,
    } = props;

    const getGuaranteedReward = questionNumber => {
        if (!questionNumber) return 0;

        const reward = questionsList
            .slice(-questionNumber)
            .find(({isGuaranteed}) => isGuaranteed)
        return reward ? reward.price : 0
    };

    const reward = hasWon
        ? 1000000
        : getGuaranteedReward(currentQuestionNumber);

    return (
        <div className='end-screen-wrapper'>
            <Header  as="h1" className="end-game-header" id="ala">
                {nick}, you won {reward} $
            </Header>
            <Button
                content="Try Again"
                primary
                onClick={resetGame}
             />
        </div>
    )
}

EndScreen.propTypes = {
    hasWon: PropTypes.bool,
    currentQuestionNumber: PropTypes.number,
    resetGame: PropTypes.func,
    nick: PropTypes.string
}

export default EndScreen
