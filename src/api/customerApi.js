/**
 * Created by dcoyer on 11/15/2017.
 */
import Constants from './../constants/Constants';

const API_URL = Constants.BaseUrl + "customers";
class customerApi {

    getCustomerInfo = async(idToken) => {
        let customerInfo = await fetch(API_URL, {
            "Method": "GET",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + idToken
            }
        })
            .then((response) => response.json())
            .then((responseJson) => {return responseJson});
        return customerInfo;
    };

}

export default customerApi;