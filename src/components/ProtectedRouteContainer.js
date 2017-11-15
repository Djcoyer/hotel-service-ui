/**
 * Created by dcoyer on 11/15/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import AuthController from './../controllers/AuthController';
import Redirect from "react-router-dom/es/Redirect";

class ProtectedRouteContainer extends Component {
    constructor(props) {
        super(props);

        this.state = {
            isAuthenticated: false
        };
    }

    componentWillMount() {
        this.isAuthenticated();
    }

    componentDidMount() {
        this.isAuthenticated();
    }

    componentWillReceiveProps(nextProps) {
        this.isAuthenticated();
    }

    isAuthenticated = () => {
        let idToken = localStorage.getItem('id_token');
        let expiresAt = localStorage.getItem('expires_at');
        if (idToken == null || expiresAt == null) return false;
        if (new Date().getTime() < expiresAt) {
            this.setState({isAuthenticated: true});
        }
    };

    render() {
        if (this.state.isAuthenticated) {
            return (
                <div>
                    {this.props.children}
                </div>
            );
        } else{
            alert("Must have active login to access protected routes.");
            if(localStorage.getItem('id_token') != null){
                AuthController.logout();
                return <div></div>
            }
            else return <Redirect to={"/login"}/>
        }
    }
}

ProtectedRouteContainer.propTypes = {};

export default ProtectedRouteContainer;