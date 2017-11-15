import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../ActionTypes';

class HotelActions {

    getHotels = () => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_HOTELS
        });
    };

    getHotel = (hotelId) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_HOTEL,
            hotelId: hotelId
        });
    };

    createHotel = (hotel) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.CREATE_HOTEL,
            hotel: hotel
        });
    };


}

export default HotelActions;