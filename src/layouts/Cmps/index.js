import { useState, useContext } from "react";
import { CanvasContext } from "../../Context";
import {
  isImgComponent,
  isTextComponent,
  isButtonComponent,
  menus,
} from "./menus";
import "./index.scss";
import PubSub from "pubsub-js";

function Cmps() {
  const globalCanvas = useContext(CanvasContext);
  const [list, setList] = useState(null);
  
  const handleClick=(e,item)=>{
    PubSub.publish('send',item)
  }
  

  return (
    <div id="cmps" className="mainCmps">
      <div className="cmpTop">自定义</div>
      <div className="cmpList">
        {menus.flatMap((item) => (
          <div
            key={item.desc}
            className="cmp"
            draggable={item.data.type !== 'img'}
            onClick={(e) => handleClick(e,item)}
          >
            <span className={`${item.data.iconfont} cmpIcon`}></span>
            <span className="cmpText">{item.desc}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Cmps;
