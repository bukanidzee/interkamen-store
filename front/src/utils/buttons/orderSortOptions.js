export const orderSortOptions = (status) => {
  return ['closed', 'dropped'].indexOf(status) !== -1 ?
    [{value: 'prize_plus', name:'Цена от наименьшей'},
     {value: 'prize_minus', name:'Цена от наибольшей'},
     {value: 'created_plus', name:'Дата создания от новейшего'},
     {value: 'created_minus', name:'Дата создания от cтарейшего'},
     {value: 'finished_plus', name:'Дата закрытия от новейшего'},
     {value: 'finished_minus', name:'Дата закрытия от старейшего'},]
     :
     [{value: 'prize_plus', name:'Цена от наименьшей'},
      {value: 'prize_minus', name:'Цена от наибольшей'},
      {value: 'created_plus', name:'Дата создания от новейшего'},
      {value: 'created_minus', name:'Дата создания от cтарейшего'},];
}
