import axios, { AxiosError } from  'axios';
import {showLoading,hideLoading} from './loading';
import storage from './storage';
import { message } from 'antd'
const instance = axios.create({
  baseURL: import.meta.env.VITE_MOCK === 'true'?import.meta.env.VITE_MOCK_API:import.meta.env.VITE_BASE_API,
  timeout: 8000,
  timeoutErrorMessage:'请求超时，请稍后重试',//请求超时文案
  // withCredentials: true //默认跨域
});

// 添加请求拦截器
instance.interceptors.request.use(function (config) {
  // console.log(import.meta.env.VITE_MOCK === 'true','import.meta.env.VITE_BASE_API')
  // console.log(store,'store')
  showLoading();
  // 在发送请求之前做些什么
 
  const token = storage.local.get('token')
  // console.log(store,'token')
  // 是否需要设置 token
  const isToken = (config.headers || {}).isToken === true
  if(token && !isToken) 
  config.headers.Authorization = "Bearer "+token;
  // config.headers['UnibuitAuth'] = 'Unibuit ' + getToken() // 让每个请求携带自定义token 请根据实际情况自行修改
  config.headers.icode = "E69163D5ABC1EE69";
  return config;
}, function (error:AxiosError) {
  // 对请求错误做些什么
  return Promise.reject(error);
});

// 添加响应拦截器
instance.interceptors.response.use(function (response) {
  const data = response.data;
  hideLoading()
    // 2xx 范围内的状态码都会触发该函数。
  if (data.code === 500001){ //登录失效
    message.error(data.msg);
    localStorage.removeItem('token')
    location.href = '#/login?callback='+ encodeURIComponent(location.href)
  }else if(data.code != 0) {//0成功，非0失败
    message.error(data.msg)
    return Promise.reject(data.msg);
  }else {
    if(data.msg)
    message.success(data.msg)
  }
  // 对响应数据做点什么
  return data;
}, function (error) {
  // 超出 2xx 范围的状态码都会触发该函数。
  // 对响应错误做点什么
  hideLoading()
  message.error(error.message)
  // if (error.response.code) {            
  //   switch (error.response.code) {                
  //       // 401: 未登录
  //       // 未登录则跳转登录页面，并携带当前页面的路径
  //       // 在登录成功后返回当前页面，这一步需要在登录页操作。                
  //       case 401:                    
  //           // router.replace({                        
  //           //     path: '/login',                        
  //           //     query: { 
  //           //         redirect: router.currentRoute.fullPath 
  //           //     }
  //           // });
  //           break;
  //       // 403 token过期
  //       // 登录过期对用户进行提示
  //       // 清除本地token和清空vuex中token对象
  //       // 跳转登录页面                
  //       case 403:
  //           // 清除token
  //           // localStorage.removeItem('token');
  //           // store.commit('loginSuccess', null);
  //           // // 跳转登录页面，并将要浏览的页面fullPath传过去，登录成功后跳转需要访问的页面 
  //           // setTimeout(() => {                        
  //           //     router.replace({                            
  //           //         path: '/login',                            
  //           //         query: { 
  //           //             redirect: router.currentRoute.fullPath 
  //           //         }                        
  //           //     });                    
  //           // }, 1000);                    
  //           // break; 
  //       // 404请求不存在
  //       case 404:
  //           // Toast({
  //           //     message: '网络请求不存在',
  //           //     duration: 1500,
  //           //     forbidClick: true
  //           // });
  //           // break;
  //       // 其他错误，直接抛出错误提示
  //       default:
  //         message.error(error.message)
  //   }
  //   return Promise.reject(error.response);
  // }

});


export default {
  get<T>(url:string,params?:Object,config?:Object):Promise<T> {
    return new Promise((resolve,reject)=>{
      instance.get(url,{params,...config}).then(res=>{
        resolve(res?.data)
      }).catch(err=>{
        reject(err)
      })
    })
  },
  post<T>(url:string,params?:Object,config?:Object):Promise<T> {
    return new Promise((resolve,reject)=>{
      instance.post(url,params,config).then(res=>{
        resolve(res?.data)
      }).catch(err=>{
        reject(err)
      })
    })
  },

}