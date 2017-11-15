/**
 * Created by dcoyer on 10/31/2017.
 */
import React, {Component} from "react";
import HotelsDirectory from "../components/hotels/HotelsDirectory";
import HotelDetails from "../components/hotels/HotelDetails";
import HotelActions from "./../actions/HotelActions";
import hotelStore from "./../stores/HotelStore";
import roomStore from './../stores/RoomStore';
import BookingActions from "./../actions/BookingActions";
import Events from "./../constants/Events";

const hotelActions = new HotelActions();
const bookingActions = new BookingActions();


class HotelsController extends Component {
    constructor(props) {
        super(props);

        this.state = {
            hotels: [],
            hotel: {},
            hotelRooms: [],
            bookings: [],
            booking: {},
            isModalOpen: false
        };
    }



    componentDidMount(){
        hotelStore.on(Events.RETRIEVED_HOTEL, () => {
            console.log("Hello");
            this.setState({hotel: hotelStore.hotel});
        });
        hotelStore.on(Events.RETRIEVED_HOTELS, () => {
            this.setState({hotels: hotelStore.hotels});
        });
        roomStore.on(Events.RETRIEVED_ROOMS, () => {
            this.setState({hotelRooms: roomStore.rooms});
        });
        hotelStore.on(Events.CREATED_HOTEL, () => {
            let hotels = this.state.hotels;
            hotels.push(hotelStore.hotel);
            this.setState({hotels: hotels});
        });
        let hotelId = this.props.match.params.hotelId;
        this.callApiBasedOnParams(hotelId);
    }

    componentWillReceiveProps(nextProps){
        let params = this.props.match.params;
        let nextParams = nextProps.match.params;
        let hotelId;
        hotelId = (nextParams.hotelId != params.hotelId ? nextParams.hotelId : null);
        this.callApiBasedOnParams(hotelId);
    }

    callApiBasedOnParams = (hotelId) => {
        console.log("HERE");
        if(hotelId == null) hotelActions.getHotels();
        else hotelActions.getHotel(hotelId);
    };

    toggleModal = () => {
        this.setState({isModalOpen: !this.state.isModalOpen});
    };

    addHotel = (hotel) => {
      if(hotel != null) {
          hotelActions.createHotel(hotel);
          this.toggleModal();
      }
    };

    render() {
        if(this.props.match.params.hotelId == null){
            if(this.state.hotels.length === 0 || this.state.hotels == null){
                return(
                    <div>
                        <h1>
                            Waiting...
                        </h1>
                    </div>
                )
            }
            else return (
                <HotelsDirectory hotels={this.state.hotels} addHotel={this.addHotel}
                                 toggleModal={this.toggleModal} isModalOpen={this.state.isModalOpen}/>
            );
        }
        else{
            console.log("Hit else statement");
            if(this.state.hotel == null || this.state.hotelRooms == null || this.state.hotelRooms.length === 0){return <div>Loading...</div>}
            else return <HotelDetails hotel={this.state.hotel} rooms={this.state.hotelRooms}/>
        }
    }

}
HotelsController.propTypes = {

};

export default HotelsController;