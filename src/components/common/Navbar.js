/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from "react";
import PropTypes from 'prop-types';
import {Link} from 'react-router-dom';
import AuthController from './../../controllers/AuthController';
class Navbar extends Component {

    constructor(props) {
        super(props);

        this.state = {};
    }

    onNavClick(target) {
        let id = target.id;
        let a = document.getElementById(id);
        let parent = a.parentNode;
        if (parent.classList.contains("active")) {
            return;
        }
        else if (document.getElementsByClassName("active").length > 0) {
            let activeItems = document.getElementsByClassName("active");
            activeItems[0].classList.remove("active");
        }

        parent.classList.add("active");
    }

    render() {

        return (
            <nav className="navbar navbar-toggleable-md navbar-inverse bg-inverse">
                <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse"
                        data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent"
                        aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <a className="navbar-brand" href="/home">Hotel Service</a>
                <div className="row">
                    <div className="col-sm-12 text-right">
                        {this.props.isAuthenticated ? (<ul className="navbar-nav">
                            <li className="nav-item">
                                <Link to="/home" className="nav-link">Home</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/hotels" className="nav-link">Hotels</Link>
                            </li>
                            <li className="nav-item">
                                <Link to="/customer/profile" className="nav-link">Profile</Link>
                            </li>
                            <li className="nav-item float-right">
                                <button className="btn btn-link nav-link" onClick={() => AuthController.logout()}>Logout</button>
                            </li>
                        </ul>)
                            :
                            (<ul className="navbar-nav">
                                <li className="nav-item">
                                    <Link to="/home" className="nav-link">Home</Link>
                                </li>
                                <li className="nav-item">
                                    <Link to="/hotels" className="nav-link">Hotels</Link>
                                </li><li className="nav-item float-right">
                                <Link to="/login" className="nav-link">Login</Link>
                            </li>
                            </ul>)}

                    </div>
                </div>
            </nav>
        )
    }
}

Navbar.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired
};

export default Navbar;