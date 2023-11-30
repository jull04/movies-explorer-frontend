import { useState} from "react";

function useFormValidation() {
  const [values, setValues ] = useState({});
  const [errors, setErrors ] = useState({});
  const [isValid, setIsValid] = useState(false);

  function handleChange(evt){
    const name = evt.target.name
    const value = evt.target.value
    const validationMessage = evt.target.validationMessage
    const form = evt.target.form

    setValues((oldValues) => {
      return {...oldValues, [name]: value, }
    })

    setErrors((oldErrors) => {
      return {...oldErrors, [name]: validationMessage, }
    })

    setIsValid(form.checkValidity())
  }


  return {handleChange, values, errors, isValid}
}

export default useFormValidation