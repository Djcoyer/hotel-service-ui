/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import TableItems from "./TableItems";
import HotelModal from "../common/HotelModal";
import Table from "../common/Table";

class HotelsDirectory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: this.props.hotels
        }
    }

    componentWillReceiveProps(nextProps) {
        if (nextProps.hotels !== this.state.hotels) {
            this.setState({hotels: nextProps.hotels});
        }
    }

    render() {

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>Hotels</h2>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-3 text-right offset-9">
                        <button className="btn btn-secondary" onClick={this.props.toggleModal}>Add New Hotel</button>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                       <Table items={this.state.hotels} headers={["Name", "Description"]} baseUrl={"/hotels"}/>
                    </div>
                </div>
                <HotelModal isModalOpen={this.props.isModalOpen} toggleModal={this.props.toggleModal} addHotel={this.props.addHotel}/>
            </div>
        )
    }
}

HotelsDirectory.propTypes = {
    hotels: PropTypes.array,
    addHotel: PropTypes.func.isRequired,
    isModalOpen: PropTypes.bool,
    toggleModal: PropTypes.func.isRequired
};

export default HotelsDirectory;