/**
 * Created by dcoyer on 11/2/2017.
 */
import ActionTypes from './../ActionTypes';
import AppDispatcher from './../dispatcher/AppDispatcher';
import EventsEmitter from "events";
import Events from './../constants/Events';
import customerApi from "../api/customerApi";


const api = new customerApi();
class CustomerStore extends EventsEmitter {
    customer = {};

    getCustomer = async (idToken) => {
        let customer = await api.getCustomerInfo(idToken);
        if(customer == null) return;
        this.customer = customer;
        this.emit(Events.RETRIEVED_CUSTOMER);
    };

}

const customerStore = new CustomerStore();

AppDispatcher.register(function(payload) {
    switch(payload.actionType) {
        case ActionTypes.GET_CUSTOMER:
            customerStore.getCustomer(payload.idToken);
    }
});

export default customerStore;