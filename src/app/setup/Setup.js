import React, {Component} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux'
import {setupApp} from "../store/actions";
import {Button, Checkbox, Form, Image, Select} from "semantic-ui-react";
import image from '../../images/default_avatar.png'
import AvatarSetModal from "./AvatarSetModal";
import {difficulties} from "../const/game.const";

class Setup extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nick: '',
            difficulty: difficulties[0],
            showModal: false,
            agreement: false,
            errors: {}
        }

    }

    componentDidMount() {
        const {
            history,
            gameStarted
        } = this.props;

        if (!gameStarted) {
            history.replace('/')
        }
    }

    getDifficulties() {
        return difficulties.map((difficulty) => {
            return {
                key: difficulty,
                value: difficulty,
                text: difficulty.charAt(0).toUpperCase() + difficulty.slice(1)
            }
        })
    }

    onSubmit = async (e) => {
        e.preventDefault();
        await this.setState({errors: {}})

        if (!this.state.agreement) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    agreement: "You must agree Terms to play"
                },
            });
            return
        }
        if (!this.state.nick || !this.state.nick.length || this.state.nick.length > 255) {
            this.setState({
                errors: {
                    ...this.state.errors,
                    nick: "Please type valid nick name"
                },
            });
            return
        }
        await this.props.setupApp(this.state.nick, this.state.difficulty);
        this.props.history.push("/game");
    };


    handleChange = (e, {name, value}) => {
        const fieldValue = value || !this.state[name]
        this.setState({[name]: fieldValue})
    };

    onModalToggle = () => this.setState({showModal: !this.state.showModal});

    render() {
        const avatar = this.props.appSettings.avatar || image;
        return (
            <div className='setup-center'>
                <Form onSubmit={this.onSubmit} className="setup-form">
                    <Form.Field>
                        <label>Avatar</label>
                        <Image onClick={this.onModalToggle} bordered circular size='tiny' src={avatar}/>
                    </Form.Field>
                    <Form.Field>
                        <label>Nick</label>
                        <Form.Input
                            name="nick"
                            placeholder='Insert nick'
                            onChange={this.handleChange}
                            error={this.state.errors['nick']}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Select
                            defaultValue={difficulties[0]}
                            name="difficulty"
                            placeholder='Difficulty'
                            options={this.getDifficulties()}
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Form.Field>
                        <Form.Checkbox
                            className="rules-agreement-checkbox-input"
                            name="agreement"
                            error={this.state.errors['agreement']}
                            label='I agree to the Terms and Conditions'
                            onChange={this.handleChange}
                        />
                    </Form.Field>
                    <Button type='submit' primary>START</Button>
                </Form>
                {this.state.showModal &&
                <AvatarSetModal
                    onChange={this.handleChange}
                    open={this.state.showModal}
                    onClose={this.onModalToggle}
                />
                }
            </div>
        )
    }
}

Setup.propTypes = {
    setupApp: PropTypes.func,
    gameStarted: PropTypes.bool,
    history: PropTypes.object,
    appSettings: PropTypes.object

};
const mapStateToProps = state => ({
    gameStarted: state.managementReducer.gameStarted,
    appSettings: state.managementReducer

});

export default connect(mapStateToProps, {setupApp})(Setup)
