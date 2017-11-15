/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";
import RoomsDirectory from "../rooms/RoomsDirectory";
import Table from "../common/Table";

class HotelDetails extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotel: this.props.hotel,
            rooms: this.props.rooms
        };
    }

    componentDidMount(){
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.hotel !== this.props.hotel){
            this.setState({hotel: nextProps.hotel});
        }
        if(nextProps.rooms !== this.props.rooms){
            this.setState({rooms: nextProps.rooms});
        }
    }

    render() {

        if(this.state.rooms == null || this.state.rooms.length === 0){
            return <div>Loading...</div>
        }

        return (
            <div className="container">
                <div className="row">
                    <div className="col-sm-12 text-center pt-3">
                        <h3>{this.props.hotel.name}</h3>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-5">
                        <p><strong>Details:</strong><br/>{this.props.hotel.description}</p>
                    </div>
                </div>
                <Table items={this.state.rooms} headers={["Name", "Price"]} baseUrl={"/rooms"}/>
            </div>
        )
    }
}

HotelDetails.propTypes = {
    hotel: PropTypes.object.isRequired,
    rooms: PropTypes.array.isRequired
};

export default HotelDetails;
