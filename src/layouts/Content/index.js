import { useEffect, useRef, useState, useContext } from "react";
import React from "react";
import { CanvasContext } from "../../Context";
import "./index.scss";
import Header from "../Header";
import Draggable from "../Draggable/index";
import { formatStyle } from "../../utils";
import PubSub from "pubsub-js";

function Content() {
  const [page, setpage] = useState([]);
  //爷孙通信
  const globalCanvas = useContext(CanvasContext);
  useEffect(() => {
    //unsubscribe可以取消多次调用
    PubSub.unsubscribe("send");
    PubSub.subscribe("send", (name, val) => {
      setpage(() => {
        return [...page, val];
      });
    });
    //爷孙通信
    // console.log(globalCanvas)
  });
  return (
    <div id="content" className="mainContent">
      <Header />
      <div
        className="canvas"
        id="canvas"
        // 点击画布非组件区域的时候，取消选中的组件
      >
        {page.flatMap((item,index)=>{
          return item.onlyKey?(<Draggable index={index} key={index} data={item}></Draggable>):null
        })}
      </div>
    </div>
  );
}


export default Content;
