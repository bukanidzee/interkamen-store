import {useMemo} from 'react';

export const useSearchedProducts = (query, products) => {
  const searchedProducts = useMemo( () => {
    const search = new Set(query.split(' ').map((word) => {
      return word.toLowerCase();
    }));
    const needed = Math.floor(search.size/2) ? Math.floor(search.size/2) : 1;
    return products.filter((product) => {
      let i = 0;
      for (let searchWord of search){
        if (product.title.toLowerCase().includes(searchWord) ||
        product.description.toLowerCase().includes(searchWord)) {
          i += 1;
          }
        if (i >= needed){
          return true;
        }
      }
      return false;
    })
  }, [query, products]);

  return searchedProducts;
}

export const useSortedAndSearchedProducts = (query, products, sort) => {
  const searchedProducts = useSearchedProducts(query, products);
  const sortedAndSearchedProducts = useMemo( () => {
    if (sort) {
      return (sort === 'prize') ?
        [...searchedProducts].sort((a,b) => a[sort]-b[sort]) :
        [...searchedProducts].sort((a,b) => a[sort].localeCompare(b[sort]));
    }
    return searchedProducts;
  }, [sort, searchedProducts]);
  return sortedAndSearchedProducts;
}
