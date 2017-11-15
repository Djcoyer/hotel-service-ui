/**
 * Created by dcoyer on 11/3/2017.
 */
import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../ActionTypes';
class RoomActions{

    getRooms = (hotelId) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_ROOMS,
            hotelId: hotelId
        });
    };

    getRoom = (hotelId, roomNum) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_ROOM,
            hotelId: hotelId,
            roomNum: roomNum
        });
    };

    addRoom = (hotelId, room) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.CREATE_ROOM,
            hotelId: hotelId,
            room: room
        });
    };

}

export default RoomActions;