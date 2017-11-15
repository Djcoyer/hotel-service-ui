/**
 * Created by dcoyer on 11/6/2017.
 */
import ActionTypes from './../ActionTypes';
import AppDispatcher from './../dispatcher/AppDispatcher';
import bookingApi from './../api/bookingApi';
import EventsEmitter from "events";
import Events from './../constants/Events';
const api = new bookingApi();

class BookingStore extends EventsEmitter {

    bookings = [];

    booking = [];

    getBookingsByHotelId = async (hotelId) => {
        if(hotelId == null) return;
        let bookings = await api.getBookingsByHotelId(hotelId);
        this.bookings = bookings;
        this.emit(Events.RETRIEVED_BOOKINGS);
    };

    getBookingsByRoomId = async (hotelId, roomNum) => {
        if(hotelId == null || roomNum == null) return;
        let bookings  = await api.getBookingsByRoomId(hotelId, roomNum);
        this.bookings = bookings;
        this.emit(Events.RETRIEVED_BOOKINGS);
    };

    getBooking = async (bookingId) => {
        if(bookingId == null) return;
        let booking = await api.getBooking(bookingId);
        if(booking == null) return;
        this.booking = booking;
        this.emit(Events.RETRIEVED_BOOKING);
    };

    getCustomerBookings = async() => {
        let idToken = localStorage.getItem('id_token');
      let bookings = await api.getCustomerBookings(idToken);
      this.bookings = bookings;
      console.log(bookings);
      this.emit(Events.RETRIEVED_BOOKINGS);
    };

    addBooking = async (booking) => {
        if(booking == null) return;
        let _booking = await api.addBooking(booking);
        console.log(_booking);
        if(_booking == null){
         this.emit(Events.BOOKING_FAILED);
        }
        else{
            this.booking = _booking;
            this.emit(Events.CREATED_BOOKING);
        }
    };
}

AppDispatcher.register((payload) => {
    switch (payload.actionType) {
        case ActionTypes.GET_BOOKING:
            bookingStore.getBooking(payload.bookingId);
            break;
        case ActionTypes.GET_BOOKINGS_HOTEL:
            bookingStore.getBookingsByHotelId(payload.hotelId);
            break;
        case ActionTypes.GET_BOOKINGS_ROOM:
            bookingStore.getBookingsByRoomId(payload.hotelId, payload.roomNum);
            break;
        case ActionTypes.CREATE_BOOKING:
            bookingStore.addBooking(payload.booking);
            break;
        case ActionTypes.GET_BOOKINGS_CUSTOMER:
            bookingStore.getCustomerBookings();
    }
});

const bookingStore = new BookingStore();

export default bookingStore;

