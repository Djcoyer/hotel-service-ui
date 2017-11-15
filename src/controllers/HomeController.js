/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HomeController extends Component {
    constructor(props) {
        super(props);

        this.state = {};
    }

    render() {

        return (
            <div className="pt-3">
                <div className="row">
                    <div className="col-sm-12">
                    <h2 className="page-title">
                        Welcome to Hotel Service
                    </h2>
                        <hr/>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-9">
                        <p>Here, you can do lots of stuff related to hotels.</p>
                    </div>
                </div>
            </div>
        )
    }
}

HomeController.propTypes = {

};

export default HomeController;