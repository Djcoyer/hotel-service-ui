import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validation from '../../Functions/ValidationFunctions';

const validation = new Validation();
class ValidationSelect extends Component{

    constructor(props){
        super(props);

        this.state = {
            value: this.props.value
        }
    }

    onChange= (event) => {
        let id = event.target.id;
        let value = event.target.value;
        this.props.onChange(id, value);
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
            <select className="form-control" style={{width: '90%'}} id={this.props.id} onChange={this.onChange} data-validations={this.props.validations}
                   value={this.props.value} onBlur={this.onBlur}>
                {(this.props.value === "" || this.props.value === null ? <option key="default" value="">Select One...</option> : null)}
                {this.props.options.map((option) => {return <option key={option.key} value={option.value}>{option.text}</option>})}
            });
            </select>
                {this.props.errorMessage ? (<span className="text-danger" style={{visibility: 'hidden'}}>{this.props.errorMessage}</span>) : null}
            </div>
        )
    }
}

ValidationSelect.propTypes = {
    id: PropTypes.string.isRequired,
    validations: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    options: PropTypes.array.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string
};

export default ValidationSelect;