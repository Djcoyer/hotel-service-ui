/**
 * Created by dcoyer on 11/15/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';

class CustomerProfile extends Component {
    constructor(props){
        super(props);

        this.state = {
            customer: this.props.customer
        };
    }

    componentWillReceiveProps(nextProps){
        if(this.state.customer !== nextProps.customer){
            this.setState({customer: nextProps.customer});
        }
    }
    render(){

        return(
            <div>
                <div className="row">
                    <div className="col-sm-3">
                        <h3>Customer Profile</h3>
                    </div>
                </div>
            </div>
        );
    }
}

CustomerProfile.propTypes = {
    customer: PropTypes.object.isRequired
};

export default CustomerProfile;