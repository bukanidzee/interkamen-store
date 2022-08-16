const FormInput = ({label, name, type, placeholder}) => {
  return(
    <label>{label}:<input name={name}
                        type={type}
                        placeholder={placeholder}/></label>
  )
}

export default FormInput;
