export function getExpectedCount(totalCount, page, limit) {
  if (page*limit > totalCount) {
    return totalCount
  } else {
    return page*limit
  }
}
