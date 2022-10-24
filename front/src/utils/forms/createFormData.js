export const createFormData = (form, fileRefs) => {
  let formdata = new FormData()
  for (let field in form) {
    if (form[field].value !== form[field].initialValue) {
      if (field in fileRefs) {
        formdata.append(field, fileRefs[field].current.files[0], form[field].value);
      } else {
        formdata.append(field, form[field].value);
      }
    }
  }
  return formdata
}
