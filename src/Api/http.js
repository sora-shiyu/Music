import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://netease-cloud-music-api-delta-rouge.vercel.app',
  //baseURL: 'http://musicapi.leanapp.cn',
  timeout: 10000
})
//请求拦截
instance.interceptors.request.use(config => {
  // config.headers = {

  // }
  return config
}, err => {
  return Promise.reject(err)
})
//响应拦截
instance.interceptors.response.use(res => {
  return res.data;
}, err => {
  console.log(err);
  return Promise.reject(err)
})
export default instance