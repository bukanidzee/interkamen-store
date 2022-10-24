import {useAPI} from '../hooks/useAPI';
import {useParams} from 'react-router-dom'
import {useRef} from 'react';
import {useDownloadInitial} from '../hooks/useDownloadInitial';
import ProductService from '../API/ProductService';
import {regularFormSubmitAction} from '../utils/forms/formSubmitAction';
import {handleFormsErrors} from '../utils/errors/handleErrors';
import ChangeForm from '../components/UI/forms/ChangeForm';
import CentrifyForm from '../components/UI/forms/CentrifyForm';
import {useTwoStatesForm} from '../hooks/useForm';
import {createFormData} from '../utils/forms/createFormData'


const ProductChange = () => {
  const {productId} = useParams()
  const fields = ['title',
                  'prize',
                  'description',
                  'image']
  const [form,
         setEntireForm,
         errors,
         setErrors,
         setField,
         isLoading,
         setIsLoading] = useTwoStatesForm(fields)

  const imageRef = useRef()
  const getInitialProduct = async () => {
    await ProductService.get_product(
      productId,
      setEntireForm
    )
  }

  useDownloadInitial(getInitialProduct, productId, setIsLoading)

  const fetchChanges = async () => {
    const formdata = createFormData(form,
                                    {'image':imageRef})
    await ProductService.patch_product(
      productId,
      formdata,
      setEntireForm
    )
  }

  const handleErrors = (err, field) => {
    handleFormsErrors(err, setErrors, field)
  }

  const updateProduct = useAPI(
    regularFormSubmitAction(form, fetchChanges, setErrors, handleErrors)
  )

  return(
    <CentrifyForm>
      <ChangeForm header='Страница редактирования продукта'
                  condition={productId}
                  isLoading={isLoading}
                  form={form}
                  onSubmit={updateProduct}
                  setField={setField}
                  errors={errors}
                  ref={imageRef}/>
    </CentrifyForm>
  )
}

export default ProductChange
