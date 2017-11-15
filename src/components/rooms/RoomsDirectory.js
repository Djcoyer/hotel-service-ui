/**
 * Created by dcoyer on 11/3/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import Table from "../common/Table";

class RoomsDirectory extends Component {
    constructor(props) {
        super(props);

        this.state = {
            rooms: []
        };
    }

    componentWillReceiveProps(nextProps) {
        if (this.state.rooms !== nextProps.rooms) {
            this.setState({rooms: nextProps.rooms});
        }
        if (this.state.hotelId !== nextProps.hotelId) {
            this.setState({hotelId: nextProps.hotelId});
        }
    }


    render() {

        if(this.state.rooms == null || this.state.rooms.length === 0){return <div>Loading...</div>}
        else return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12">
                        <h2>All Rooms</h2>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-12">
                        <Table items={this.state.rooms} headers={["Room Type","Price"]} baseUrl={"/rooms"}/>
                    </div>
                </div>
            </div>
        );
    }
}

RoomsDirectory.propTypes = {
    rooms: PropTypes.array.isRequired,
    hotelId: PropTypes.string
};

export default RoomsDirectory;