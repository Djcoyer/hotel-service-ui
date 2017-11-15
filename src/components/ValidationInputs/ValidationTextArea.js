import React, {Component} from 'react';
import PropTypes from 'prop-types';
import Validation from '../../Functions/ValidationFunctions';

const validation = new Validation();
class ValidationTextArea extends Component{

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
                <textarea className="form-control" style={{width: '90%'}} id={this.props.id} onChange={this.onChange} data-validations={this.props.validations}
                          value={this.props.value} onBlur={this.onBlur} rows={(this.props.rows ? this.props.rows : 3)}></textarea>
                {this.props.errorMessage ? (<span className="text-danger" style={{visibility: 'hidden'}}>{this.props.errorMessage}</span>) : null}
            </div>
        )
    }
}

ValidationTextArea.propTypes = {
    id: PropTypes.string.isRequired,
    validations: PropTypes.array.isRequired,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    errorMessage: PropTypes.string,
    rows: PropTypes.number
};

export default ValidationTextArea;