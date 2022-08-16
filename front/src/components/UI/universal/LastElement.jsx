import {useLastElementRef} from '../../../hooks/useLastElementRef';

const LastElement = ({page,
                      setPage,
                      totalPages,
                      totalCount,
                      array,
                      listOfConditions}) => {

  const lastElement = useLastElementRef(page,
                                        setPage,
                                        totalPages,
                                        totalCount,
                                        array,
                                        listOfConditions)

  return(
    <div ref={lastElement} style={{position:'relative',
                                   height:50}}></div>
  )
}

export default LastElement
