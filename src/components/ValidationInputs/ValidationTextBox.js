import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validation from '../../Functions/ValidationFunctions';

const validation = new Validation();
class ValidationTextBox extends Component{

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
        let value = event.target.value;
        let validations = element.dataset.validations.split(",");
        validation.performValidation(id, value, validations);
    };

    render(){
        return(
            <div>
            <input type={this.props.id === 'password' ? "password": "text"} className="form-control" id={this.props.id} onChange={this.onChange} data-validations={this.props.validations}
            value={this.props.value} onBlur={this.onBlur}/>
                {this.props.errorMessage ? (<span className="text-danger" style={{visibility: 'hidden'}}>{this.props.errorMessage}</span>) : null}
            </div>
        )
    }
}

ValidationTextBox.propTypes = {
    id: PropTypes.string.isRequired,
    validations: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default ValidationTextBox;