import {useAPI} from '../hooks/useAPI';
import {useParams} from 'react-router-dom'
import {useRef, useCallback} from 'react';
import {useDownloadInitial} from '../hooks/useDownloadInitial';
import ProductService from '../API/ProductService';
import {twoStatesFormSubmitAction} from '../utils/forms/formSubmitAction';
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
         setForm,
         errors,
         setErrors,
         setField,
         isLoading,
         setIsLoading] = useTwoStatesForm(fields)

  const imageRef = useRef()
  const getInitialProduct = useCallback(async () => {
    await ProductService.get_product(
      productId,
      (response) => {
        let newForm = {...form}
        for (let field of fields) {
          newForm[field].value = response[field]
          newForm[field].initialValue = response[field]
        }
        setForm(newForm)
      }
    )
  }, [productId, form])

  useDownloadInitial(getInitialProduct, productId, setIsLoading)

  const fetchChanges = useCallback(async (field) => {
    const formdata = createFormData({[field]: form[field].value},
                                    {'image':imageRef})
    await ProductService.patch_product(
      productId,
      formdata,
      (response) => {
        setField(field, {state:'notActive',
                         initialValue:response[field],
                         value:response[field]})
      })
  }, [form])

  const handleErrors = (err, field) => {
    handleFormsErrors(err, setErrors, field)
  }

  const patchProduct = useAPI(
    twoStatesFormSubmitAction(form, fetchChanges, setErrors, handleErrors)
  )

  return(
    <CentrifyForm>
      <ChangeForm header='Страница редактирования продукта'
                  condition={productId}
                  isLoading={isLoading}
                  form={form}
                  onSubmit={patchProduct}
                  setField={setField}
                  errors={errors}
                  ref={imageRef}/>
    </CentrifyForm>
  )
}

export default ProductChange
