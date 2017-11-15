/**
 * Created by dcoyer on 11/1/2017.
 */

import React, {Component} from 'react';
import PropTypes from 'prop-types';

class HotelForm extends Component {
    constructor(props) {
        super(props);

        this.state = {
            name: "",
            address: "",
            description: "",
            city: "",
            state: "",
            zipCode: "",
            rating: ""
        }
    }

    onChange = (e) => {
        let id = e.target.id;
        let value = e.target.value;
        this.setState((prevState) => {
            prevState[id] = value;
        });
    };

    submitForm = () => {
      let hotel = {
          "name": this.state.name,
          "address": this.state.address,
          "rating": this.state.rating,
          "description": this.state.description,
          "city": this.state.city,
          "state": this.state.state,
          "zipCode": this.state.zipCode
      };
      this.props.addHotel(hotel);
    };

    render() {

        return (
            <div>
                <div className="row">
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-10">
                                <label>Hotel Name:</label>
                                <input type="text" id="name" className="form-control"
                                       onChange={(e) => this.onChange(e)}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10">
                                <label>
                                    Description:
                                </label>
                                <textarea rows="4" className="form-control" onChange={(e) => this.onChange(e)}
                                          id="description"/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10">
                                <label>
                                    Rating:
                                </label>
                                <input type="text" className="form-control" id="rating"
                                       onChange={(e) => this.onChange(e)}/>
                            </div>
                        </div>
                    </div>
                    <div className="col-sm-6">
                        <div className="row">
                            <div className="col-sm-10">
                                <label>
                                    Street Address:
                                </label>
                                <input type="text" className="form-control" id="address"
                                       onChange={(e) => this.onChange(e)}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10">
                                <label>
                                    City:
                                </label>
                                <input type="text" className="form-control" id="city"
                                       onChange={(e) => this.onChange(e)}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10">
                                <label>
                                    State:
                                </label>
                                <input type="text" className="form-control" id="state"
                                       onChange={(e) => this.onChange(e)}/>
                            </div>
                        </div>
                        <div className="row mt-2">
                            <div className="col-sm-10">
                                <label>
                                    Zip Code:
                                </label>
                                <input type="text" className="form-control" id="zipCode"
                                       onChange={(e) => this.onChange(e)}/>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="row">
                    <div className="col-sm-11 text-right">
                        <hr/>
                        <button className="btn btn-primary" type="button" onClick={this.submitForm}>
                            Submit
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}

HotelForm.propTypes = {
    addHotel: PropTypes.func.isRequired
};

export default HotelForm;