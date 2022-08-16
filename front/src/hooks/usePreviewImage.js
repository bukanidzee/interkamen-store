import {useRef, useEffect} from 'react'

export const usePreviewImage = (value, initialValue, ref) => {
  const previewRef = useRef()

  useEffect(() => {
    if (value && value != initialValue) {
      const oFReader = new FileReader();
      oFReader.readAsDataURL(ref.current.files[0]);

      oFReader.onload = function (oFREvent) {
        previewRef.current.src = oFREvent.target.result;
      }
    }
  }, [value])

  return previewRef
}
