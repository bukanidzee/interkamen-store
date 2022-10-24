import {useEffect, useState} from 'react'

export const useDropChoosed = (choosedOrder,
                               setChoosedOrder,
                               isOrdersWide) => {
  const [isWideWatching, setIsWideWatching] = useState(isOrdersWide)

  const dropOnCondition = () => {
    if (choosedOrder>-1 && isWideWatching!==isOrdersWide) {
      setChoosedOrder(-1)
      setIsWideWatching(prev => !prev)
    }
  }

  useEffect(() => {
    window.addEventListener('resize', dropOnCondition)

    return () => window.removeEventListener('resize', dropOnCondition)
  })
}
