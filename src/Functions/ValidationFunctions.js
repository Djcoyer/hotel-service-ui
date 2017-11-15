import $ from 'jquery';

export default class  Validation{

    highlightRequiredFields = () => {
        let requiredFields = $("[data-validations*='required']");
        for(let i = 0; i < requiredFields.length; i ++){
            let label = requiredFields[i].parentNode.previousSibling;
            label.style.fontWeight = "600";
        }
    };

    validateForm = (form) => {
        let elements = form.querySelectorAll('[data-validations]');
      let isValid = true;
      for(let i = 0; i < elements.length; i ++) {
          let element = elements[i];
          let id = element.id;
          let value = element.value;
          let validations = element.dataset.validations.split(",");
          let result = this.performValidation(id, value, validations);
          if(!result){
              isValid = result;
          }
      }
        return isValid;
    };

    setErrorMessage = (element) => {
        element.classList.add('formError', 'alert-danger');
        if(element.nextSibling){
            let sibling = element.nextSibling;
            sibling.style.visibility = 'visible';
        }
    };

    removeErrorMessage = (element) => {
        element.classList.remove('formError', 'alert-danger');
        if(element.nextSibling){
            element.nextSibling.style.visibility = 'hidden'
        }
    };

    performValidation = (id, value, validations) => {
        if(validations && validations.length > 0){
            let isValid = this.handleValidation(validations, value);
            if(isValid){
                this.removeErrorMessage(document.getElementById(id));
            }
            else{
                this.setErrorMessage(document.getElementById(id));
            }
            return isValid;
        }
    };

    handleNumberValidation = (id, value, min, max, validations) => {
        let isValid;
        if(value < min || value > max){
            isValid = false;
            this.setErrorMessage(document.getElementById(id));
        }
        else{
            isValid = this.performValidation(id, value, validations);
            isValid;
        }
        return isValid;
    };

    handleValidation(validations, value){
        let isValid = true;
        for(let i = 0; i < validations.length; i++){
            let validation = validations[i];
            if(!this.getValidationCase(validation, value)){
                isValid = false;
                break;
            }
        }
        return isValid;
    }

    getValidationCase(validation, value){
        let re;
        switch(validation){
            case "required":
                return value.toString().trim().length > 0;
                break;
            case "alpha":
                re = /^[a-zA-Z]|^$/;
                return re.test(value);
                break;
            case "number":
                re = /^0|[1-9]\d*$/;
                return re.test(value);
                break;
            case "phone":
                re = /^(?:\+?1\s*(?:[.-]\s*)?)?(?:\(\s*([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9])\s*\)|([2-9]1[02-9]|[2-9][02-8]1|[2-9][02-8][02-9]))\s*(?:[.-]\s*)?([0-9]{3})\s*(?:[.-]\s*)?([0-9]{4})(?:\s*(?:#|x\.?|ext\.?|extension)\s*(\d+))?$/;
                return re.test(value);
                break;
            case "email":
                re = /^([a-zA-Z0-9_\-\.]+)@([a-zA-Z0-9_\-\.]+)\.([a-zA-Z]{2,5})$/;
                return re.test(value);
            case "postalCodeUS":
                re = /^\d{5}(?:[-\s]\d{4})?$/;
                return re.test(value);
                break;
            case "postalCodeCA":
                re = /^[ABCEGHJKLMNPRSTVXY]{1}\d{1}[A-Z]{1} *\d{1}[A-Z]{1}\d{1}$/;
                return re.test(value);
                break;
            default:
                return true;
        }
    }
}