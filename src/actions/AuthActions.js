/**
 * Created by dcoyer on 11/10/2017.
 */
import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../ActionTypes';

class AuthActions {

    login = (username, password) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.LOGIN_REQUEST,
            username: username,
            password: password
        });
    };

    logout = () => {
      AppDispatcher.dispatch({
         actionType: ActionTypes.LOGOUT
      });
    };
}

export default AuthActions;