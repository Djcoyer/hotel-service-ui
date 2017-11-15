/**
 * Created by dcoyer on 11/3/2017.
 */
class Constants {

    GetRequest = {
    "method": "GET",
    "headers": {
        "Content-Type": "application/json",
        "Accept": "application/json"
    }
};


    BaseUrl = "http://localhost:8081/";

}

const constants = new Constants();

export default constants;