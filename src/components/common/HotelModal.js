/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import HotelForm from "../hotels/HotelForm";

const customStyles = {
    overlay: {
        backgroundColor: 'rgba(89, 90, 94, .85)'
    },
    content: {
        position: 'fixed',
        top: '5em',
        left: '3em',
        right: '3em',
        bottom: '7rem',
        padding: '2rem',
        overflow: 'auto'
    }
};

class HotelModal extends Component {
    constructor(props){
        super(props);

        this.state = {
            isModalOpen: this.props.isModalOpen
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.isModalOpen !== this.props.isModalOpen) {
            this.setState({isModalOpen: nextProps.isModalOpen});
        }
    }

    toggleModal = () => {
        this.props.toggleModal();
    };

    render() {

        return(
            <Modal isOpen={this.state.isModalOpen} style={customStyles} onRequestClose={this.toggleModal}>
                <div className="container-fluid">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2>Add New Hotel</h2>
                            <hr/>
                        </div>
                    </div>
                    <HotelForm addHotel={this.props.addHotel}/>
                </div>

            </Modal>
        )
    }
}

HotelModal.propTypes = {
    isModalOpen: PropTypes.bool.isRequired,
    toggleModal: PropTypes.func.isRequired,
    addHotel: PropTypes.func.isRequired
};

export default HotelModal;