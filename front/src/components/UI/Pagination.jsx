import {getPagesArray, getLimitsArray} from '../../utils/pages';
import {useMemo} from 'react'
import '../../static/css/UI/pagination.scss';

const Pagination = ({totalPages, totalCount, limit, setLimit, page, setPage}) => {
  const pagesArray = useMemo(() => getPagesArray(totalPages), [totalPages]);
  const limitsArray = useMemo(() => getLimitsArray(totalCount), [totalCount]);

  return(
    <div className='pagination-bar'>
      <div className='numbers-wrapper'>
        <span>Отобразить:</span>
        {limitsArray.map(l =>
          <button onClick={() => setLimit(l)}
                key={l}
                className={l===limit ? 'number active_number' : 'number'}
                disabled={l===limit ? true : false}>
              {l}
          </button>
        )}
      </div>
      <div className='numbers-wrapper'>
        <span>Страница:</span>
        {pagesArray.map(p =>
          <button onClick={() => setPage(p)}
                key={p}
                className={p===page ? 'number active_number' : 'number'}
                disabled={p===page ? true : false}>
              {p}
          </button>
        )}
      </div>
    </div>
  )
}

export default Pagination;
