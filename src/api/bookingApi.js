/**
 * Created by dcoyer on 11/3/2017.
 */
import Constants from './../constants/Constants';
const API_URL = "http://localhost:8081/bookings";

class bookingApi {

    getBookingsByRoomId = async (hotelId, roomNum) => {
        let url = API_URL + "/" + hotelId + "/" + roomNum;
        let bookings = await fetch(url, Constants.GetRequest)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            });
        return bookings;
    };

    getBookingsByHotelId = async (hotelId) => {
        let url = API_URL + "/hotel/" + hotelId;
        let bookings = await fetch(url, Constants.GetRequest)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            });
        return bookings;
    };

    getCustomerBookings = async (token) => {
        let url = API_URL + "/customer";
        let bookings = await fetch(url, {
            "method": "GET",
            "headers": {
                "Content-Type":"application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + token
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            });
        return bookings;
    };

    getBooking = async (bookingId) => {
        let url = API_URL + "/" + bookingId;
        let booking = await fetch(url, Constants.GetRequest)
            .then((response) => response.json())
            .then((responseJson) => {
                return responseJson
            });
        return booking;
    };

    addBooking = async (booking) => {
        let data = JSON.stringify(booking);
        let jwt = localStorage.getItem('id_token');
        let _booking = await fetch(API_URL, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + jwt
            },
            "body": data
        }).then((response) => response.json())
            .then((responseJson) => {
                return responseJson;
            });
        return _booking;
    }
}

export default bookingApi;