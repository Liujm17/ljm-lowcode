import { useEffect, useRef, useState, useContext } from "react";
import React from "react";
import { CanvasContext } from "../../Context";
import "./index.scss";
import Header from "../Header";
import Draggable from "../Draggable/index";
import { formatStyle } from "../../utils";
import PubSub from "pubsub-js";
import { api } from "../../api/api";


function Content() {
  //标签列表
  const [tagList,setTagList] = useState([])
  //属性列表
  const [styleList,setStyleList] = useState([])
  useEffect(() => {
    getData()
    PubSub.subscribe("changeSuccess", (name) => {
      getData()
    });
  }, []);
  const getData = () => {
    let params = {
      tagName: "",
      pageSize: 999,
      pageNum: 1,
    };
    api.getTagsInfo(params).then((res) => {
      let list=res.data.data.list.flatMap((item)=>{
        return{
          ...item,
          style:item.style?JSON.parse(item.style):{}
        }
      })
      setTagList(list)
    });
    //获取样式详情
    api.getStyleDetail().then((res)=>{
      let obj=res.data.data
      setStyleList(obj)
      //将数据库的已有样式列表发送到右侧已有属性表
      PubSub.publish("styleList", obj)
    })
  };
  const showList=(val,index)=>{
    PubSub.publish('changeStyleList',val)
  }
  return (
    <div id="content" className="mainContent">
      <Header />
      <div
        className="canvas"
        id="canvas"
        // 点击画布非组件区域的时候，取消选中的组件
      >
        {/* {page.flatMap((item, index) => {
          return item.onlyKey ? (
            <Draggable index={index} key={index} data={item}></Draggable>
          ) : null;
        })} */}
        {
          tagList.length>0?tagList.flatMap((item,index)=>{
            return item.tagName=='img'?(<item.tagName key={index} src={item.src} style={item.style} onClick={()=>showList(item,index)} />):(<item.tagName key={index} style={item.style} onClick={()=>showList(item,index)}>{item.tagValue}</item.tagName>)
          }):null
        }
      </div>
    </div>
  );
}

export default Content;
