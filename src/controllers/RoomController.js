/**
 * Created by dcoyer on 11/3/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import roomStore from './../stores/RoomStore';
import Events from "../constants/Events";
import RoomActions from './../actions/RoomActions';
import RoomsDirectory from "../components/rooms/RoomsDirectory";
import RoomDetails from "../components/rooms/RoomDetails";

const actions = new RoomActions();
class RoomController extends Component {
    constructor(props){
        super(props);

        this.state = {
            rooms: [],
            room: {}
        };
    }

    componentDidMount(){
        let hotelId = this.props.match.params.hotelId;
        let roomNum = this.props.match.params.roomNum;
        roomStore.on(Events.RETRIEVED_ROOM, () => {
            this.setState({room: roomStore.room});
        });
        roomStore.on(Events.RETRIEVED_ROOMS, () => {
           this.setState({rooms: roomStore.rooms});
        });
        roomStore.on(Events.CREATED_ROOM, () => {
           let rooms = this.state.rooms;
           rooms.push(roomStore.room);
           this.setState({rooms: rooms});
        });

        if(hotelId != null) {
            if(roomNum == null){
                actions.getRooms(hotelId);
            }
            else{
                actions.getRoom(hotelId, roomNum);
            }
        }
    }

    componentWillReceiveProps(nextProps){
        let nextHotelId = nextProps.match.params.hotelId;
        let hotelId = this.props.match.params.hotelId;
        let roomNum = this.props.match.params.roomNum;
        let nextRoomNum = nextProps.match.params.roomNum;
        if(nextHotelId != null){
                   if(hotelId !== nextHotelId){
                       if(nextRoomNum == null){
                           actions.getRooms(nextHotelId);
                       }
               else{
                   if(nextRoomNum !== roomNum){
                       actions.getRoom(nextHotelId, nextRoomNum)
                   }
               }
           }
           else if(nextRoomNum !== roomNum) {
               actions.getRoom(hotelId, nextRoomNum);
           }
        }
        else{
            this.setState({hotels: [], hotel: {}});
        }
    }

    updateState = () => {

    };

    render(){

        if((this.state.hotels == null || this.state.hotels.length === 0) && this.state.room == null){
            return(<h1>Loading...</h1>)
        }
        else if(this.state.rooms != null && this.props.match.params.roomNum == null){
            return (
                <RoomsDirectory rooms={this.state.rooms} hotelId={this.props.match.params.hotelId}/>
            )
        }
        else if(this.state.room != null){
            return(
                <RoomDetails room={this.state.room}/>
            );
        }
            return(
            <div>

            </div>
        );
    }
}

RoomController.propTypes = {

};

export default RoomController;