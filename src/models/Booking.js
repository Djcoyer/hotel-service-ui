/**
 * Created by dcoyer on 11/13/2017.
 */

class Booking{

    constructor(bookingId ,customerId, firstName, lastName, bookingStartDate, bookingEndDate, hotelId, roomNumber){
        this.bookingId = bookingId;
        this.customerId = customerId;
        this.firstName = firstName;
        this.lastName = lastName;
        this.bookingEndDate = bookingEndDate;
        this.bookingStartDate = bookingStartDate;
        this.roomId = {hotelId: hotelId, roomNumber: roomNumber};
    }
}

export default Booking;