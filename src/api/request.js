//aixos配置，请求拦截器
import axios from 'axios'
import {  message } from "antd";

//process.env.NODE_ENV =development  为开发环境
//process.env.NODE_ENV =production  为生产环境
const http = axios.create({
  //开发环境不用写baseurl,已经配了跨域，生产要写
    baseURL : process.env.NODE_ENV =='development'?'':'http://localhost:8010',
    timeout: 3000
})

//请求拦截
http.interceptors.request.use(config => {
    // if(jsonUrl.includes(config.url)){
    //   config.headers["content-type"] = "application/json;charset=UTF-8";
    // }else{
    //   config.headers["content-type"] = "application/x-www-form-urlencoded";
    // }
    config.headers["content-type"] = "application/x-www-form-urlencoded";
    config.headers['Authorization']='1111'

    //设置默认参数
    // var defaults = {
    //   systemCode:'06',
    //   userId:3
    // }
    // config.params = {
    //   ...defaults,
    //   ...config.params
    // }
  return config
}, err => {
  alert(err)
  // console.log("err",err);
  return Promise.reject(err)
})

//响应拦截处理
http.interceptors.response.use(response => {
  //如果返回401,则清除token,跳转登录
  if (response.data.code === 401) {
    // sessionStorage.removeItem('Authorization');
    // sessionStorage.removeItem('userInfo');
    console.log('401')
    return;
  }
  if(response.data.code==-1){
    message.info(response.data.message);
  }else if(response.data.code ==0){
    return response
  }
}, error => {
  if (error && error.response) {
    if (error.response.status === 403) {
      alert('用户登陆信息失效')
    } else if (error.response.status === 404) {
      alert('找不到目录')
    } else if(error.response.status === 401){
        alert('用户登陆信息失效')
    }else{
      alert(error)
    }
  }
  return Promise.reject(error)
})

export default http