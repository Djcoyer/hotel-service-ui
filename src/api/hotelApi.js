const API_URL = "http://localhost:8081/hotels";

class hotelApi{
    getHotels = async() => {
        let url = API_URL;
        let hotels = await fetch(url, 
            {"method": "GET", 
            "headers": {
                "Content-Type": "application/json",
                 "Accept": "application/json",
                "Authorization": "Bearer " + localStorage.getItem("id_token")
                }
            }
        ).then((response) => response.json())
        .then((responseJson) => {
            return responseJson;
        });
        return hotels;
    };

    getHotel = async(hotelId) => {
      let url = API_URL + '/' + hotelId;
      let hotel = await fetch(url, {
          "method": "GET",
          "headers": {
              "Content-Type": "application/json",
              "Accept": "application/json"
          }
      }).then((response) => response.json())
          .then((responseJson) => {return(responseJson)});
      console.log(hotel);
      return hotel;
    };

    createHotel = async(hotel) => {
        let data = JSON.stringify(hotel);
        let response = await fetch(API_URL, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            body: data
        }).then((response) => response.json())
            .then((responseJson) => {return responseJson.hotelId});
        return response;
    }
}

export default hotelApi;