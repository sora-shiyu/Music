import axios from 'axios'


const instance = axios.create({
  baseURL: 'https://netease-cloud-music-api-delta-rouge.vercel.app',
  timeout: 10000
})
//请求拦截
instance.interceptors.request.use(config => {
  //请求带上国内ip
  if (config.url.indexOf('/song/url?id=') != -1) config.url += '&realIP=116.25.146.177'

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