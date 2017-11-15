/**
 * Created by dcoyer on 11/3/2017.
 */
import constants from './../constants/Constants';

const API_URL = "http://localhost:8081/rooms";


class roomApi {

    getRooms = async(hotelId) => {
        let url = API_URL + "/"+hotelId;
        let rooms = await fetch(url, constants.GetRequest).then((response) => response.json())
            .then((responseJson) => {return responseJson});
        return rooms;
    };

    getRoom = async(hotelId, roomId) => {
      let url = API_URL + "/"+hotelId+"/"+roomId;
      let room = await fetch(url, {
          "method": "GET",
          "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      }).then((response) => response.json())
          .then((responseJson) => {return responseJson});
      return room;
    };

    addRoom = async(room, hotelId) => {
        let data = room.stringify();
        let url = API_URL + "/"+hotelId;
        let _room = await fetch({
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": data
        }).then((response) => response.json())
            .then((responseJson) => {return responseJson});
        return _room;
    }
}

export default roomApi;