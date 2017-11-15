/**
 * Created by dcoyer on 11/2/2017.
 */
import ActionTypes from './../ActionTypes';
import AppDispatcher from './../dispatcher/AppDispatcher';
import hotelApi from './../api/hotelApi';
import EventsEmitter from "events";
import Events from './../constants/Events';
const api = new hotelApi();

class HotelStore extends EventsEmitter {
    hotels = [];
    hotel = {};

    createHotel = async(hotel) => {
             let hotelId = await api.createHotel(hotel);
             let _hotel = await this.getCreatedHotel(hotelId);
             this.hotel = _hotel;
             this.emit(Events.CREATED_HOTEL);
    };

    getCreatedHotel = async(hotelId) => {
        let hotel = await api.getHotel(hotelId);
        return hotel;
    };

    getHotel = async(hotelId) => {
        let hotel = await api.getHotel(hotelId);
        if(hotel != null) {
            this.hotel = hotel;
            this.emit(Events.RETRIEVED_HOTEL);
        }
    };

    getHotels = async() => {
        let hotels = await api.getHotels();
        this.hotels = hotels;
        this.emit(Events.RETRIEVED_HOTELS);
    };
}

const hotelStore = new HotelStore();

AppDispatcher.register(function(payload) {
   switch(payload.actionType) {
       case ActionTypes.GET_HOTELS:
           hotelStore.getHotels();
           break;
       case ActionTypes.GET_HOTEL:
           hotelStore.getHotel(payload.hotelId);
           break;
       case ActionTypes.CREATE_HOTEL:
           hotelStore.createHotel(payload.hotel);
           break;
   }
});

export default hotelStore;