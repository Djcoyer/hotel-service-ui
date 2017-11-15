/**
 * Created by dcoyer on 11/3/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Link from "react-router-dom/es/Link";

class RoomDetails extends Component {
    constructor(props){
        super(props);

        this.state = {
            room: {}
        };
    }

    componentDidMount(){
        this.setState({room: this.props.room});
    }

    componentWillReceiveProps(nextProps){
        if(this.state.room !== nextProps.room) {
            this.setState({room: nextProps.room});
        }
    }

    formatAsPrice = (price) => {
        return "$"+price.toFixed(2).replace(/(\d)(?=(\d{3})+\.)/g, '$1,');
    };

    render(){
        let room = this.state.room;

        if(room.pricePerNight != null) {
            return(
                <div className="container pt-2">
                    <div className="row">
                        <div className="col-sm-12">
                            <h2 style={{display:'inline'}}>{room.name}</h2>
                                <h3 className="float-right" style={{display:'inline'}}>{this.formatAsPrice(room.pricePerNight)}</h3>
                            <hr/>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-8">
                            <p>{room.details}</p>
                        </div>
                        <div className="col-sm-3 offset-1 text-right">

                        </div>
                    </div>
                    <div className="row">
                        <div className="col-sm-3 offset-9 text-right">
                            <Link to={"/bookings/hotel/" + this.state.room.id.hotelId + "/" + this.state.room.id.roomNumber} className="btn btn-primary btn-sm">
                                Book Room
                            </Link>
                        </div>
                    </div>
                </div>
            );
        }
        else{
            return <h1>Loading...</h1>
        }
    }
}

RoomDetails.propTypes = {
    room: PropTypes.object
};

export default RoomDetails;