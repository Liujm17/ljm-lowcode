import React from "react";
import ButtonComponent from "../../components/Button/index";
import TextComponent from "../../components/Text/index";
import ImgComponent from "../../components/Img/index";
import { CanvasContext } from "../../Context";

function getComponent(data){
  let res=null
  switch(data.type){
    case 'text':
      res =<TextComponent {...data}></TextComponent>;
      break;
    case 'button':
      res=<ButtonComponent {...data}></ButtonComponent>;
      break;
    case 'img':
      res=<ImgComponent {...data}></ImgComponent>;
      break;
    default:
      res = null
  }
    return res
}


class Draggable extends React.Component {
  static contextType = CanvasContext;
  constructor(props) {
    super(props);
    this.state = {
      page: [],
    };
  }
  componentDidMount(){
    //爷孙通信
    // console.log(this.context)
  }
  render() {
    return (
      <>
       {getComponent(this.props.data.data)}
      </>
    );
  }
}

export default Draggable;
