/**
 * Created by dcoyer on 11/6/2017.
 */
import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../ActionTypes';

class BookingActions{

    createBooking = (booking) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.CREATE_BOOKING,
            booking: booking
        });
    };

    getBookingsByHotelId = (hotelId) => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.GET_BOOKINGS_HOTEL,
          hotelId: hotelId
      });
    };

    getBookingsByRoomId = (hotelId, roomNum) => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.GET_BOOKINGS_ROOM,
          hotelId: hotelId,
          roomNum: roomNum
      });
    };

    getBooking = (bookingId) => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.GET_BOOKING,
          bookingId: bookingId
      });
    };

    getCustomerBookings = () => {
      AppDispatcher.dispatch({
          actionType: ActionTypes.GET_BOOKINGS_CUSTOMER
      });
    };
}

export default BookingActions;