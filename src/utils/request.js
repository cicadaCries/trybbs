// 导入axios
import axios from 'axios';
import router from '@/router'
 
// 基地址
const service = axios.create({
    // axios中请求配置有baseURL选项，表示请求URL公共部分
    baseURL: 'http://localhost:8080',
    // 超时
    timeout: 10000
})
 
// 请求拦截
service.interceptors.request.use(
  config => {
    const token = localStorage.getItem('token');
    console.log("我踏马是请求拦截器，我他妈起作用了,获取到的token:"+token);
    //  若token不为空则让每一个http请求携带token
    if (token) {
      config.headers['Authorization'] = 'Bearer '+ token  ;
      console.log("尝试打印输入到后台的负载："+config);
    } 
    return config
  },
  error => {
    console.log(error)
    return Promise.reject(error)
  }
)

// 响应拦截
service.interceptors.response.use(
  res => {
    console.log("我踏马是响应拦截器，我他妈起作用了:"+res.data.code);
    const code = res.data.code;
    switch (code) {
        case 401:
          window.alert("登录状态过期，请重新登录");
          router.push({ path: '/login' });
          localStorage.removeItem('token');
          return Promise.reject('error');;
        case 500:
          window.alert("服务器内部错误");
          return Promise.reject('error');
        case 601:
          window.alert("业务错误");
          return Promise.reject('error');
        default:
          return res;
      }
    },error => {
        console.log(error);
        return Promise.reject(error);
});
 
// 暴露副本
export default service