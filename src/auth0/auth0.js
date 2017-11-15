/**
 * Created by dcoyer on 11/1/2017.
 */

import auth0 from 'auth0-js';
import {AUTH_CONFIG} from './auth-variables';
import history from './../history';
export default class Auth {
    getToken = () => {
        return localStorage.getItem('id_token');
    };

    authenticated;

    handleAuthentication() {
        this.auth0.parseHash((err, authResult) => {
            if (authResult && authResult.accessToken && authResult.idToken) {
                this.setSession(authResult);
                history.replace('/home');
            } else if (err) {
                console.log(err);
            }
        });
    }

    constructor() {
        this.login = this.login.bind(this);
        this.logout = this.logout.bind(this);
        this.handleAuthentication = this.handleAuthentication.bind(this);
        this.isAuthenticated = this.isAuthenticated.bind(this);
        this.getProfile = this.getProfile.bind(this);
    }

    auth0 = new auth0.WebAuth({
        domain: AUTH_CONFIG.domain,
        clientID: AUTH_CONFIG.clientId,
    });


    login() {
        this.auth0.authorize({
            redirectUri: AUTH_CONFIG.callbackUrl,
            responseType: 'token id_token',
            scope: 'openid'
        });
    }

    logout() {
        localStorage.removeItem('id_token');
        localStorage.removeItem('access_token');
        localStorage.removeItem('expires_at');
        this.auth0.logout({
            returnTo: AUTH_CONFIG.logoutUrl,
            client_id: AUTH_CONFIG.clientId,
            federated: true
        });
    }

    setSession(authResult) {
        // Set the time that the access token will expire at
        let expiresAt = JSON.stringify((authResult.expiresIn * 150) + new Date().getTime());
        localStorage.setItem('access_token', authResult.accessToken);
        localStorage.setItem('id_token', authResult.idToken);
        localStorage.setItem('expires_at', expiresAt);
        this.token = authResult.idToken;
    }

    getAccessToken() {
        const accessToken = localStorage.getItem('access_token');
        if (!accessToken) {
            throw new Error("No access token found");
        }
        return accessToken;
    }

    getProfile(cb) {
        let accessToken = this.getAccessToken();
        this.auth0.client.userInfo(accessToken, (err, profile) => {
            if (profile) {

            }
            cb(err, profile);
        });
    }

    isAuthenticated() {
        // Check whether the current time is past the
        // access token's expiry time
        let expiresAt = JSON.parse(localStorage.getItem('expires_at'));
        let isAuthenticated = new Date().getTime() < expiresAt;
        if (expiresAt && !isAuthenticated) {

        }
        return isAuthenticated;
    }
}