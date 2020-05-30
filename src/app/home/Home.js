import React from 'react'
import PropTypes from 'prop-types'
import {
    Link
} from 'react-router-dom'
import {connect} from "react-redux";
import {setGameStarted} from "../store/actions";
import {Button} from "semantic-ui-react";
import {Header, Icon} from 'semantic-ui-react'


const Home = props => {
    return (
        <section className="quiz-main-section">
            <div className="quiz-header">
                <Icon size="massive" name='question' className="game-header-icon-left"/>
                    <Header as='h1' icon className="game-header-center">
                        Millionare Game
                        <Header.Subheader>
                            Here you can win 1 000 000 $!
                        </Header.Subheader>
                    </Header>
                <Icon size="massive" name='question' className="game-header-icon-right"/>

                <div className="start-button">
                    <Link
                        to='/setup'
                        onClick={props.setGameStarted}
                    >
                        <Button
                            size="massive"
                            icon="play"
                            content='PLAY'
                            primary
                            onClick={props.setGameStarted}/>
                    </Link>
                </div>
            </div>
        </section>

    )
}

Home.propTypes = {
    setGameStarted: PropTypes.func
}

export default connect(null, {setGameStarted})(Home)
