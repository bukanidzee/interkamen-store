import {useRef, useEffect, useState} from 'react';
import {useUserAgent} from './useUserAgent';

export const useProductGrid = (items) => {
    const productListRef = useRef()
    const [isGrid, setIsGrid] = useState(true)
    const {isProductCardBig} = useUserAgent()

    function checkIfGrid() {
      const width = productListRef.current.getBoundingClientRect().width
      return items.length*400 > width || !isProductCardBig
    }

    const checkAndSetGrid = () => setIsGrid(checkIfGrid())

    useEffect(() => {
      checkAndSetGrid()
      window.addEventListener('resize', checkAndSetGrid)

      return () => window.removeEventListener('resize', checkAndSetGrid)
    })

    return [productListRef, isGrid]
}
