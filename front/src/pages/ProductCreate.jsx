import RegularForm from '../components/UI/forms/RegularForm'
import {useForm} from '../hooks/useForm';
import ProductService from '../API/ProductService';
import {useNavigate} from 'react-router-dom';
import {handleFormsErrors} from '../utils/errors/handleErrors';
import {regularFormSubmitAction} from '../utils/forms/formSubmitAction';
import {createFormData} from '../utils/forms/createFormData';
import {useAPI} from '../hooks/useAPI';
import {useRef, useCallback} from 'react';

const ProductCreate = () => {
  const [form, errors, setErrors, setField] = useForm(['title',
                                                       'prize',
                                                       'description',
                                                       'image'])
  const navigate = useNavigate()
  const imageRef = useRef()
  const fetch = useCallback(async () => {
    const formdata = createFormData(form, {'image':imageRef})
    await ProductService.create_product(
      formdata,
      () => {
        navigate(-1)
      })
  }, [form])

  const handleErrors = (err) => {
    handleFormsErrors(err, setErrors, 'description')
  }

  const createProduct = useAPI(
    regularFormSubmitAction(form, fetch, setErrors, handleErrors)
  )
  return(
      <RegularForm header='Создать продукт'
                   onSubmit={createProduct}
                   form={form}
                   setField={setField}
                   errors={errors}
                   submitName='Создать'
                   ref={imageRef}/>
  )
}

export default ProductCreate;
