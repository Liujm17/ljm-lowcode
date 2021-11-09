import { useState } from "react";
import { menus } from "./menus";
import img from "../../static/img/index";
import "./index.scss";
import PubSub from "pubsub-js";
import { api } from "../../api/api";
import { Button, Modal, Upload } from "antd";
import { UploadOutlined } from "@ant-design/icons";
import axios from "axios";

//默认样式
const defaultStyle = { position: "absolute", width: "100px", color: "black" };

function Cmps() {
  const [list, setList] = useState(null);

  //图片列表
  const [imgListShow, setImgListShow] = useState(false);
  //添加图片弹窗显示与否
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [file,setFile] = useState('')


  const changeImg = (e) => {
    setFile(e.target.files.item(0)); //只能选择一张图片
    // 如果不选择图片
    if (file === null) {
      return;
    }
  };

    //上传功能
    const uploadimg = () => {
      return new Promise((resolve,reject)=>{
         let data = new FormData();
       data.append("image", file);
       axios({
         method: "post",
         timeout: 2000,
         url: "/upload/img",
         data: data,
         headers: {
           "Content-Type": "form-data",
         },
       })
         .then((response) => {
           resolve(response.data)
         })
         .catch((error) => {
           resolve(error)
         })
      })
   };

  //打开添加图片弹窗
  const showModal = () => {
    setIsModalVisible(true);
  };

  //弹窗确认
  const handleOk = () => {
    setIsModalVisible(false);
  };

  //弹窗取消
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  //点击选择图片 给数据库增加数据 从而页面增加表
  const handleClick = (e, item) => {
    if (item.data.type != "img") {
      //不是图片
      //给数据库对应表添加标签
      let params = {
        tagName: item.data.type,
        tagValue: item.data.value,
        style: JSON.stringify(defaultStyle),
      };
      api.addTag(params).then((res) => {
        //修改成功也可以是提交成功
        PubSub.publish("changeSuccess");
      });
    } else {
      //是图片
      setImgListShow(!imgListShow);
    }
  };

  const selectImg = (e) => {
    const { width, height, src } = e.target;
    let value = {
      //把数值转为string并且加上px
      width: JSON.stringify(width).includes("px")
        ? JSON.stringify(width)
        : JSON.stringify(width) + "px",
      height: JSON.stringify(height).includes("px")
        ? JSON.stringify(height)
        : JSON.stringify(height) + "px",
      src,
    };
    //给数据库对应表添加标签
    let params = {
      tagName: "img",
      tagValue: "",
      src: value.src,
      style: JSON.stringify({ width: value.width, height: value.height }),
    };
    api.addTag(params).then((res) => {
      //关闭弹窗
      setImgListShow(false);
      //修改成功也可以是提交成功
      PubSub.publish("changeSuccess");
    });
  };

  return (
    <div id="cmps" className="mainCmps">
      <div className="cmpTop">自定义</div>
      <div className="cmpList">
        {menus.flatMap((item) => (
          <div
            key={item.desc}
            className="cmp"
            draggable={item.data.type !== "img"}
            onClick={(e) => handleClick(e, item)}
          >
            <span className={`${item.data.iconfont} cmpIcon`}></span>
            <span className="cmpText">{item.desc}</span>
          </div>
        ))}
      </div>
      {imgListShow ? (
        <div className="imgList">
          <Button type="primary" onClick={showModal}>
            添加图片
          </Button>
          <Modal
            title="添加图片"
            visible={isModalVisible}
            onOk={handleOk}
            cancelText="取消"
            okText="确认"
            onCancel={handleCancel}
          >
            <input
              type="file"
              name="file"
              accept="image/*"
              onChange={changeImg}
            />
            <button onClick={uploadimg}>上传</button>
          </Modal>
          {img.flatMap((item, index) => {
            return (
              <div className="imgList-box" key={index}>
                <img
                  style={{ width: "100%", height: "100%" }}
                  src={item.value}
                  onClick={(e) => selectImg(e)}
                ></img>
              </div>
            );
          })}
        </div>
      ) : null}
    </div>
  );
}

export default Cmps;
