import {useEffect, useRef} from 'react'
import {createPortal} from 'react-dom'


const ModuleOuterComponent = ({children}) => {

  const elRef = useRef(document.createElement('div'))

  useEffect(() => {
    const modal = document.getElementById('modal')
    modal.appendChild(elRef.current)

    return () => elRef.current.remove()
  })

  return createPortal(children, elRef.current)
}

export default ModuleOuterComponent
