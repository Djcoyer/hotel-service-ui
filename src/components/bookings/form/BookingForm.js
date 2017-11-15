/**
 * Created by dcoyer on 11/13/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Booking from "../../../models/Booking";
import ValidationTextBox from "../../ValidationInputs/ValidationTextBox";
import ValidationNumber from "../../ValidationInputs/ValidationNumber";
import ValidationFunctions from './../../../Functions/ValidationFunctions';

const validation = new ValidationFunctions();
class BookingForm extends Component {
    constructor(props) {
        super(props);

        this.onChange = this.onChange.bind(this);
        this.state = {
            booking: this.props.booking
        };
    }

    submitBooking = (e) => {
        e.preventDefault();
        let form = document.querySelector("#bookingForm");
        let isFormValid = validation.validateForm(form);
        if (isFormValid) {
            let booking = this.state.booking;
            this.props.submitBooking(booking);
        }
    };

    onChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        let booking = this.state.booking;
        booking[id] = value;
        this.setState({booking: booking});
    };

    render() {

        return (
            <div>
                <div className="row mt-3">
                    <div className="col-sm-12">
                        <h3>Book Room</h3>
                        <hr/>
                    </div>
                </div>
                <form id="bookingForm">
                    <div className="row">
                        <div className="col-sm-5">
                            <div className="row">
                                <div className="col-sm-9">
                                    <label className="form-label">First Name</label>
                                    <ValidationTextBox id="firstName" validations={["required"]}
                                                       value={this.state.booking.firstName} onChange={this.onChange}
                                                       errorMessage={"Must supply a first name"}/>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-sm-9">
                                    <label>Last Name</label>
                                    <ValidationTextBox id="lastName" validations={["required"]}
                                                       value={this.state.booking.lastName} onChange={this.onChange}
                                                       errorMessage={"Must supply a last name"}/>

                                </div>
                            </div>
                        </div>
                        <div className="col-sm-4 offset-2">
                            <div className="row">
                                <div className="col-sm-12">
                                    <label>Check-In Date: </label>
                                    <input type="date" className="form-control"
                                           value={this.state.booking.bookingStartDate}
                                           id="bookingStartDate" onChange={(e) => this.onChange(e)}/>
                                </div>
                            </div>
                            <div className="row mt-2">
                                <div className="col-sm-12">
                                    <label>Check-Out Date:</label>
                                    <input type="date" className="form-control"
                                           value={this.state.booking.bookingEndDate}
                                           id="bookingEndDate" onChange={(e) => this.onChange(e)}/>
                                </div>
                            </div>
                            <div className="row mt-4">
                                <div className="col-sm-2 offset-9">
                                    <button className="btn btn-primary btn-sm" onClick={this.submitBooking}>
                                        Book
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        );
    }
}

BookingForm.propTypes = {
    submitBooking: PropTypes.func.isRequired,
    booking: PropTypes.object.isRequired,
    displayErrorMessage: PropTypes.bool
};

export default BookingForm;