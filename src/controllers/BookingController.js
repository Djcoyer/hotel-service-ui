/**
 * Created by dcoyer on 11/3/2017.
 */
import React, {Component} from "react";
import PropTypes from 'prop-types';
import BookingActions from "./../actions/BookingActions";
import bookingStore from "./../stores/BookingStore";
import Events from "../constants/Events";
import BookingsDirectory from "../components/bookings/BookingsDirectory";
import BookingForm from "../components/bookings/form/BookingForm";
import Booking from "../models/Booking";

const bookingActions = new BookingActions();

class BookingController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            booking: {

            },
            displayErrorMessage: false
        };
    }

    //region SETUP
    componentDidMount() {
        bookingStore.on(Events.RETRIEVED_BOOKINGS, () => {
            this.setState({bookings: bookingStore.bookings});
        });
        bookingStore.on(Events.RETRIEVED_BOOKING, () => {
            this.setState({booking: bookingStore.booking});
        });
        bookingStore.on(Events.CREATED_BOOKING, () => {
            let booking = bookingStore.booking;
            console.log("Hit");
            this.props.history.push("/customer/bookings/"+booking.id);
        });
        bookingStore.on(Events.BOOKING_FAILED, () => {
           this.setState({displayErrorMessage: true});
        });
        let bookingId = this.props.match.params.bookingId;
        let hotelId = this.props.match.params.hotelId;
        let roomNum = this.props.match.params.roomNum;
        let hotelBookingId = this.props.match.params.hotelBookingId;
        let customerId = this.props.match.params.customerId;
        if(hotelId && roomNum){
            let booking = new Booking(null, '', '','','','',hotelId, roomNum);
            this.setState({booking: booking});
        }
        this.callApiBasedOnParams(bookingId, hotelId, roomNum, hotelBookingId, customerId);
    }

    componentWillReceiveProps(nextProps) {
        let params = this.props.match.params;
        let nextParams = nextProps.match.params;
        let hotelId;
        let bookingId;
        let roomNum;
        let hotelBookingId;
        hotelId = (nextParams.hotelId != params.hotelId ? nextParams.hotelId : null);
        bookingId = (nextParams.bookingId != params.bookingId ? nextParams.bookingId : null);
        roomNum = (nextParams.roomNum != params.roomNum ? nextParams.roomNum : null);
        hotelBookingId = (nextParams.hotelBookingId != params.hotelBookingId ? nextParams.hotelBookingId : null);
        this.callApiBasedOnParams(bookingId, hotelId, roomNum, hotelBookingId);
    }

    callApiBasedOnParams = (bookingId, hotelId, roomNum, hotelBookingId, customerId) => {
        if (hotelId != null) {
            if (roomNum != null) bookingActions.getBookingsByRoomId(hotelId, roomNum);
            else bookingActions.getBookingsByHotelId(hotelId);
            // else hotelActions.getHotel(hotelId);
        }
        else if(customerId != null){
            bookingActions.getBookingsByCustomerId(customerId);
        }
        else if (hotelBookingId != null) {
            bookingActions.getBookingsByHotelId(hotelBookingId);
        }
        else if (bookingId != null) {
            bookingActions.getBooking(bookingId);
        }
    };
    //endregion

    submitBooking = (booking) => {
        booking.customerId = null;
        bookingActions.createBooking(booking);
    };


    render() {
        if (this.state.bookings == null || this.state.bookings.length === 0) {
            return <div>Waiting....</div>
        }
        else {
            let params = this.props.match.params;
            if (params.hotelId != null) {

                if (params.roomNum != null) {
                    return (<BookingForm booking={this.state.booking} submitBooking={this.submitBooking} displayErrorMessage={this.state.displayErrorMessage}/>);
                }
                else return <BookingsDirectory bookings={this.state.bookings}/>
            }
        }
    }
}

BookingController.propTypes = {
    customerId: PropTypes.string
};

export default BookingController;