import React, {Component} from 'react'
import {Button, Header, Icon, Input, Modal} from 'semantic-ui-react'
import {fetchImages, fetchRandomPhotos} from "../api/unsplash.api";
import ImageList from "./ImagesList";
import {connect} from "react-redux";
import {setUserAvatar} from "../store/actions";
import '../../css/App.css'

const userInputTimeout = 700;

class AvatarSetModal extends Component {
    constructor(props) {
        super(props);
        this.state = {
            ...props,
            isLoading: false,
            imageList: [],
            selectedImage: '',
            searchActionTimeout: null,
        }
    }

    componentDidMount() {

        this.loadRandomImages()
    }

    onSearchInput = (e, {value}) => {
        clearTimeout(this.state.searchActionTimeout);
        const searchActionTimeout = setTimeout(() => {
            this.loadImagesByQuery(value)
        }, userInputTimeout)
        this.setState({searchActionTimeout})
    };

    loadImagesByQuery = async (query) => {
        this.setState({isLoading: true})
        const response = await fetchImages(query);
        this.setState({
            imageList: response,
            isLoading: false
        })
    }

    loadRandomImages = async () => {
        this.setState({isLoading: true})
        const response = await fetchRandomPhotos();
        this.setState({
            imageList: response,
            isLoading: false
        })
    }

    onImageClick = (imageUrl) => {
        const {setUserAvatar, onClose} = this.props;
        setUserAvatar(imageUrl);
        onClose();
    }


    render() {
        return (
            <Modal
                open={this.props.open}
                onClose={this.props.onClose}
                basic
                size='large'
            >
                <h4 className="ui header">
                    <i className="small search icon"/>
                    <span className="content">
                        Search Avatar
                    </span>

                </h4>
                <Input
                    focus
                    className="search-avatar-input"
                    name="searchQuery"
                    placeholder='Search...'
                    loading={this.state.isLoading}
                    onChange={this.onSearchInput}
                    size="big"
                />
                <Modal.Content>
                    <ImageList
                        images={this.state.imageList}
                        onImageClick={this.onImageClick}
                    />
                </Modal.Content>
                <Modal.Actions>
                    <Button
                        color='red'
                        onClick={this.props.onClose}
                        inverted
                    >
                        <Icon name='close'/>
                        Close
                    </Button>
                </Modal.Actions>
            </Modal>
        )
    }
}

const mapDispatchToProps = {setUserAvatar};
export default connect(null, mapDispatchToProps)(AvatarSetModal)
