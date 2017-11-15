/**
 * Created by dcoyer on 11/6/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Table from "../common/Table";

class BookingsDirectory extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }

    render(){

        return(
            <Table items={this.props.bookings} headers={["", ""]} baseUrl={"/"}/>
        );
    }
}

BookingsDirectory.propTypes = {
    bookings: PropTypes.array.isRequired
};

export default BookingsDirectory;