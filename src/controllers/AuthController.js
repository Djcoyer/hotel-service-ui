/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from "react";
import authApi from "./../api/authApi";
import AuthActions from './../actions/AuthActions';
import authStore from './../stores/AuthStore';
import Events from "../constants/Events";
import jwt_decode from 'jwt-decode';
import PropTypes from 'prop-types';
import User from "../models/User";
import LoginForm from "../components/login/LoginForm";

const actions = new AuthActions();
const api = new authApi();
class AuthController extends Component {

    constructor(props) {
        super(props);

        this.state = {
            username: '',
            password: ''
        };
    }

    componentDidMount() {
        authStore.on(Events.LOGIN_FAILED, () => this.invalidLogin());
    }

    static logout = () => {
        console.log("Hit");
        actions.logout();
    };

    static logoutSuccess = () => {
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        localStorage.removeItem('expires_at');
    };

    static loginSuccess = () => {
        let idToken = authStore.idToken;
        let accessToken = authStore.accessToken;
        let userInfo = jwt_decode(idToken);
        let expiresAt = userInfo.exp;
        AuthController.setTokens(idToken, accessToken, expiresAt);
        let form = document.getElementById('loginForm');
        form.reset();
    };

    // getUserInfoFromToken = (userInfo) => {
    //     let customerInfo = userInfo["http://customerInfo"];
    //     let userId = customerInfo.uid;
    //     let firstName = customerInfo.firstName;
    //     let lastName = customerInfo.lastName;
    //     let email = userInfo.email;
    //     let user = new User(userId, email, firstName, lastName);
    //     return user;
    // };

    static setTokens = (idToken, accessToken, expiresAt) => {
        localStorage.setItem('id_token', idToken);
        localStorage.setItem('access_token', accessToken);
        localStorage.setItem('expires_at', expiresAt * 1000);
    };

    onChange = (e) => {
        let value = e.target.value;
        let id = e.target.id;
        this.setState({[id]: value});
    };

    login = async () => {
        let username = this.state.username;
        let password = this.state.password;
        actions.login(username, password);
    };

    render() {
        if(this.props.match.path.indexOf("login") > -1){
            return (
                <LoginForm username={this.state.username} password={this.state.password} login={this.login} onChange={this.onChange}/>
            )
        }
        else if(this.props.match.path.indexOf("logout") > -1){
            return(
                <div>Loading...</div>
            )
        }
    }
}

AuthController.propTypes = {
    setUser: PropTypes.func.isRequired
};

export default AuthController;