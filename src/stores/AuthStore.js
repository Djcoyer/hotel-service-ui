/**
 * Created by dcoyer on 11/10/2017.
 */
import authApi from "./../api/authApi";
import EventsEmitter from "events";
import ActionTypes from "./../ActionTypes";
import AppDispatcher from "./../dispatcher/AppDispatcher";
import Events from "./../constants/Events";

const api = new authApi();

class AuthStore extends EventsEmitter{
    idToken = '';
    accessToken = '';
    refreshToken = '';
    expiresAt = 0;
    user= {};

    login = async(username, password) => {
        let authTokens = await api.login(username, password);
        if(authTokens.id_token != null){
            console.log(authTokens);
            this.idToken = authTokens.id_token;
            this.accessToken = authTokens.access_token;
            this.emit(Events.LOGIN_SUCCESS);
        }
        else this.emit(Events.LOGIN_FAILED);
    };

    logout = async() => {
        let idToken = localStorage.getItem('id_token');
        let logoutResult = await api.logout(idToken);
        this.emit((logoutResult === true ? Events.LOGOUT_SUCCESS : Events.LOGOUT_FAILED));
    };


}

const authStore = new AuthStore();

AppDispatcher.register((payload)=> {
   switch(payload.actionType){
       case ActionTypes.LOGIN_REQUEST:
           authStore.login(payload.username, payload.password);
           break;
       case ActionTypes.LOGOUT:
           authStore.logout();
           break;
   }
});

export default authStore;