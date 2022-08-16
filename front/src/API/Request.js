import axios from 'axios'
import axiosRetry from 'axios-retry'

export default async function handleRequest (requestData, callback) {
  const retryDelay = (retryCount) => {
    return Math.pow(2, retryCount)*1000
  }
  axiosRetry(axios, {
    retries: 2,
    retryDelay: retryDelay,
    retryCondition: axiosRetry.isRetryableError
  })
  // console.log(requestData)
  await axios(requestData)
    .then(async res => {
      // console.log(res)
      if (callback && res?.data){
        await callback(res.data)
      } else if (callback){
        await callback()
      }
    })
    .catch(err => {
      throw err
    })
}
