export const createFormData = (form, fileRefs) => {
  let formdata = new FormData();
  for (let field in form) {
    if (field in fileRefs) {
      formdata.append(field, fileRefs[field].current.files[0], form[field]);
    } else {
      formdata.append(field, form[field]);
    }
  }
  return formdata
}
