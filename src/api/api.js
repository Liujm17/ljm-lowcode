import http from './request';
import qs from "qs";


const api={
  //获取所有的标签
    getTagsInfo(params){
         return http.get('/content/getTagsInfo',{params})
    },
    //修改某一标签样式
    updateTag(params){
         return http.post('/content/updateTag',qs.stringify(params))
    },
    //获取字段信息
    getStyleInfo(params){
      return http.get('/content/getStyleInfo',{params})
    },
    //添加字段
    addTag(params){
        return http.post('/content/addTag',qs.stringify(params))
    },
    //查询sql表有无某字段
    queryWords(params){
      return http.get('/content/queryWords',{params})
    },
    //查询样式的详情表
    getStyleDetail(){
      return http.get('/content/getStyleDetail')
    },
    //样式的详情表添加字段
    addStyleDetail(params){
      return http.post('/content/addStyleDetail',qs.stringify(params))
    }
}

export {api}