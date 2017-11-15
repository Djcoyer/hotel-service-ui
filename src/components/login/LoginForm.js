/**
 * Created by dcoyer on 11/14/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import ValidationTextBox from "../ValidationInputs/ValidationTextBox";
import ValidationFunctions from './../../Functions/ValidationFunctions';

const validation = new ValidationFunctions();
const formId = "loginForm";
class LoginForm extends Component {
    constructor(props){
        super(props);

        this.state = {

        };
    }

    login = () => {
        let form = document.getElementById(formId);
        let isValid = validation.validateForm(form);
        if(isValid) this.props.login();
    };


    invalidLogin = () => {
        let form = document.getElementById(formId);
        form.reset();
    };

    render(){

        return(
            <div className="container">
                <div className="row mt-3">
                    <div className="col-sm-4 offset-8">
                        <form id={formId}>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-3">Email:</label>
                                <div className="col-sm-8 offset-1">
                                    <ValidationTextBox id="username" validations={["required", "email"]} value={this.props.username}
                                                       onChange={this.props.onChange} errorMessage={"Email required"}/>
                                    {/*<input type="text" id="username" className="form-control"*/}
                                           {/*value={this.props.username} onChange={(e) => this.props.onChange(e)}/>*/}
                                </div>
                            </div>
                            <div className="form-group row">
                                <label className="col-form-label col-sm-3">Password:</label>
                                <div className="col-sm-8 offset-1">
                                    <ValidationTextBox id="password" validations={["required"]} value={this.props.password}
                                                       onChange={this.props.onChange} errorMessage={"Password required"}/>
                                    {/*<input type="password" id="password" className="form-control"*/}
                                           {/*value={this.props.password} onChange={(e) => this.props.onChange(e)}/>*/}
                                </div>
                            </div>
                            <div className="form-group row">
                                <div className="col-sm-3 offset-9">
                                    <button className="btn btn-primary" type="button" onClick={() => this.login()}>
                                        Login
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        );
    }
}

LoginForm.propTypes = {
    username: PropTypes.string.isRequired,
    password: PropTypes.string.isRequired,
    login: PropTypes.func.isRequired,
    onChange: PropTypes.func.isRequired
};

export default LoginForm;