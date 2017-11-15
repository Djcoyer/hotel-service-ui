/**
 * Created by dcoyer on 11/14/2017.
 */
import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validation from '../../Functions/ValidationFunctions';

const validation = new Validation();
class ValidationNumber extends Component{

    constructor(props){
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    onChange= (event) => {
        this.props.onChange(event);
    };

    onBlur = (event) => {
        let id = event.target.id;
        let element = document.getElementById(id);
        let value = parseInt(event.target.value);
        let validations = element.dataset.validations.split(",");
        validation.handleNumberValidation(id, value, validations);
    };

    render(){
        return(
            <div>
                <input type="number" className="form-control" id={this.props.id} onChange={this.onChange} data-validations={this.props.validations}
                       value={this.props.value} min={this.props.min} max={this.props.max} onBlur={this.onBlur}/>
                {this.props.errorMessage ? (<span className="text-danger" style={{visibility: 'hidden'}}>{this.props.errorMessage}</span>) : null}
            </div>
        )
    }
}

ValidationNumber.propTypes = {
    id: PropTypes.string.isRequired,
    validations: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    min: PropTypes.number,
    max: PropTypes.number
};

export default ValidationNumber;