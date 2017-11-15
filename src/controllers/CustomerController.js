/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';
import BookingActions from './../actions/BookingActions';
import bookingStore from './../stores/BookingStore';
import Events from "../constants/Events";
import BookingsDirectory from "../components/bookings/BookingsDirectory";
import CustomerBookingDirectory from "../components/customer/CustomerBookingDirectory";
import CustomerActions from "../actions/CustomerActions";
import customerStore from './../stores/CustomerStore';
import CustomerProfile from "../components/customer/CustomerProfile";

const bookingActions = new BookingActions();

const customerActions = new CustomerActions();
class CustomerController extends Component {

    constructor(props) {
        super(props);

        this.state = {
            bookings: []
        }
    }

    //region SETUP
    componentWillMount(){
        let params = this.props.match.params;
        let path = this.props.match.path;
        if(params.bookingId != null){
            bookingActions.getBooking(params.bookingId);
        }
        else if(this.props.match.path.indexOf("bookings") > -1){
            bookingActions.getCustomerBookings();
        }
        else if(path.indexOf("profile") > -1){
            let idToken = localStorage.getItem('id_token');
            customerActions.getCustomerInfo(idToken);
        }
    }

    componentDidMount(){
        bookingStore.on(Events.RETRIEVED_BOOKINGS, () => {
            this.setState({bookings: bookingStore.bookings});
        });
        customerStore.on(Events.RETRIEVED_CUSTOMER, () => {
            this.setState({customer: customerStore.customer});
        });
    }


    //endregion

    render() {
        let params = this.props.match.params;
        let path = this.props.match.path;
        if(params.bookingId == null){
            if(path.indexOf("bookings") > -1 && this.state.bookings != null && this.state.bookings.length > 0){
                return(
                    <CustomerBookingDirectory bookings={this.state.bookings}/>
                )
            }
            else if(path.indexOf("/customer/profile") > -1){
                return <CustomerProfile customer={this.state.customer}/>
            }
        }

        return(
            <div>

            </div>
        )
    }
}

CustomerController.propTypes = {

};

export default CustomerController;