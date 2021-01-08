import axios from 'axios'

const microcms = axios.create({
  baseURL: `${process.env.MICROCMS_URL}/api/v1/`,
  headers: {
    'X-API-KEY': process.env.MICROCMS_X_API_KEY,
  },
})
export default microcms
