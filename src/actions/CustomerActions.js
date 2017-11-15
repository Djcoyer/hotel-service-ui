/**
 * Created by dcoyer on 11/15/2017.
 */
import AppDispatcher from './../dispatcher/AppDispatcher';
import ActionTypes from './../ActionTypes';

class CustomerActions{

    getCustomerInfo = (idToken) => {
        AppDispatcher.dispatch({
            actionType: ActionTypes.GET_CUSTOMER,
            idToken: idToken
        });
    };
}

export default CustomerActions;