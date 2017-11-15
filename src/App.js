import React, {Component} from "react";
import HotelsController from "./controllers/HotelsController";
import Navbar from "./components/common/Navbar";
import {BrowserRouter, Route, Switch} from "react-router-dom";
import HomeController from "./controllers/HomeController";
import AuthController from "./controllers/AuthController";
import Auth from "./auth0/auth0";
import RoomController from "./controllers/RoomController";
import BookingController from "./controllers/BookingController";
import CustomerController from "./controllers/CustomerController";
import authStore from './stores/AuthStore';
import Events from "./constants/Events";
import ProtectedRouteContainer from "./components/ProtectedRouteContainer";
const auth = new Auth();
class App extends Component {

    constructor(props) {
        super(props);
    }

    componentDidMount() {
        authStore.on(Events.LOGOUT_SUCCESS, () => {
            AuthController.logoutSuccess();
            this.updateSelf("/home");
        });
        authStore.on(Events.LOGIN_SUCCESS, () => {
            AuthController.loginSuccess();
            this.updateSelf("/home");
        });
    }

    updateSelf = (destinationUrl) => {
        window.location.href = destinationUrl;
        this.forceUpdate();
    };

    render() {
        let isAuthenticated = new Date().getTime() < localStorage.getItem('expires_at');
        //new Date().getTime() < expiresAt;

        return (
            <BrowserRouter>
                <div>
                    <Navbar isAuthenticated={isAuthenticated}/>
                    <div className="container-fluid">
                        <Switch>
                            <Route exact path="/home" component={HomeController}/>
                            <Route exact path="/hotels" component={HotelsController}/>
                            <Route exact path="/hotels/:hotelId" component={HotelsController}/>
                            <Route exact path="/rooms/:hotelId" component={RoomController}/>
                            <Route exact path="/rooms/:hotelId/:roomNum" component={RoomController}/>
                            <Route exact path="/login" component={AuthController}/>
                            <ProtectedRouteContainer>
                                <Route exact path="/bookings/add/:hotelId/:roomNum" component={BookingController}/>
                                <Route exact path="/bookings/:bookingId" component={BookingController}/>
                                <Route exact path="/bookings/hotel/:hotelBookingId" component={BookingController}/>
                                <Route exact path="/bookings/hotel/:hotelId/:roomNum" component={BookingController}/>
                                <Route exact path="/logout" component={AuthController}/>
                                <Route exact path="/customer" component={CustomerController}/>
                                <Route exact path="/customer/profile" component={CustomerController}/>
                                <Route exact path="/customer/bookings" component={CustomerController}/>
                                <Route exact path="/customer/bookings/:bookingId" component={CustomerController}/>
                            </ProtectedRouteContainer>
                        </Switch>
                    </div>
                </div>
            </BrowserRouter>
        );
    }
}

export default App;
