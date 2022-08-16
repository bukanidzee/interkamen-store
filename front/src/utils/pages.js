export const getPageCount = (totalCount, limit) => {
    return Math.ceil(totalCount / limit)
}

export const getPagesArray = (totalPages) => {
    let result = [];
    for (let i = 0; i < totalPages; i++) {
        result.push(i + 1)
    }
    return result;
}

export const getLimitsArray = (totalCount) => {
  let result =[5, 10, 20, 50];
  for (let number of result) {
    if (number >= totalCount) {
      totalCount = number;
      break;
    }
  }
  return result.filter(limit => totalCount>=limit)
}
