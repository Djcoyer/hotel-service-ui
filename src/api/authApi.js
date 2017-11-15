/**
 * Created by dcoyer on 11/1/2017.
 */

let authUrl = "http://localhost:8081/auth";

class authApi {

    login = async(username, password) => {
        let url = authUrl + "/login";
        let loginInfo = {"username": username, "password": password};
        let tokens = await fetch(url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json"
            },
            "body": JSON.stringify(loginInfo)
        }).then((response) => response.json())
            .then((responseJson) => {
            return responseJson;
            });
        return tokens;
    };

    logout = async(idToken) => {
        let url = authUrl + "/logout";
        let response = await fetch(url, {
            "method": "POST",
            "headers": {
                "Content-Type": "application/json",
                "Accept": "application/json",
                "Authorization": "Bearer " + idToken
            }
        })
            .then((response) => {return response});
        return (response.status === 200);
    };
}

export default authApi;