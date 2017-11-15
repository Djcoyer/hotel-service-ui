/**
 * Created by dcoyer on 11/14/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from "../common/Table";

class CustomerBookingDirectory extends Component {
    constructor(props){
        super(props);

        this.state = {
            bookings: this.props.bookings
        };
    }

    componentWillReceiveProps(nextProps) {
        if(nextProps.bookings !== this.state.bookings){
            this.setState({bookings: nextProps.bookings});
        }
    }

    render(){

        return(
        <Table items={this.state.bookings} headers={["Booking Date", "Test"]} baseUrl={"/customer/bookings/"}/>
        );
    }
}

CustomerBookingDirectory.propTypes = {
    bookings: PropTypes.array.isRequired
};

export default CustomerBookingDirectory;