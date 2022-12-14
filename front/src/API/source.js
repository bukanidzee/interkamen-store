const API_ORIGIN = process.env.REACT_APP_API_ORIGIN || 'http://127.0.0.1:8000/api/'

const getUrl = (path) => {
  return `${API_ORIGIN}${path}`
}

export default getUrl
