import ActionTypes from './../ActionTypes';
import AppDispatcher from './../dispatcher/AppDispatcher';
import EventEmitter from "events";
import roomApi from './../api/roomApi';
import Events from './../constants/Events';

const api = new roomApi();

class RoomStore extends EventEmitter{
    rooms = [];
    room = {};

    getRooms = async(hotelId) => {
        let rooms = await api.getRooms(hotelId);
        this.rooms = rooms;
        this.emit(Events.RETRIEVED_ROOMS);
    };

    getRoom = async(hotelId, roomNum) => {
        let room = await api.getRoom(hotelId, roomNum);
        this.room = room;
        this.emit(Events.RETRIEVED_ROOM);
    };

    addRoom = async(hotelId, room) => {
        let _room = await api.addRoom(room, hotelId);
        this.room = _room;
        this.emit(Events.CREATED_ROOM);
    }


}


const roomStore = new RoomStore();

AppDispatcher.register((payload) => {
    switch(payload.actionType){
        case ActionTypes.GET_ROOMS:
        case ActionTypes.GET_HOTEL:
            console.log("Here");
            roomStore.getRooms(payload.hotelId);
            break;
        case ActionTypes.GET_ROOM:
            roomStore.getRoom(payload.hotelId, payload.roomNum);
            break;
        case ActionTypes.CREATE_ROOM:
            roomStore.addRoom(payload.hotelId, payload.room);
            break;
    }
});

export default roomStore;