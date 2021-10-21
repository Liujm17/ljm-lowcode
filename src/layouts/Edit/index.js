import React from "react";
import "./index.scss";
import PubSub from "pubsub-js";
import { Form, Input, Button, Checkbox } from "antd";

/** 操作步骤
 *  点击组件，触发changeStyle事件进行PubSub传值，
 *  在edit页面的componentDidMount中接收，接收的时候先进行重赋值
 *  改变input时触发改变changeVal事件，进行Publish传值
 *  在具体渲染组件内接收存储，下次点击组件的时候传新的值
 *  tips:每次componentDidMount中pubsub接收的时候进行页面重渲染事件getFormList
 */




export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textStyle: "",
      buttonStyle: "",
      imgStyle:'',
      title: "",
      page: null,
    };
  }
  // 创建一个ref
  formRef = React.createRef();
 
  componentDidMount() { 
    PubSub.unsubscribe("textStyle");
    PubSub.subscribe("textStyle", (name, val) => {
      this.setState({page: Object.entries(val.style)},()=>{
      if (!this.state.textStyle) {
        this.setState(
          { textStyle: Object.entries(val.style), title: val.value},
          () => this.getFormList()
        );
      } else {
        this.setState({ title: val.value }, () => this.getFormList());
      }
    })
    });
    PubSub.unsubscribe("buttonStyle");
    PubSub.subscribe("buttonStyle", (name, val) => {
      this.setState({page: Object.entries(val.style)},()=>{
        if (!this.state.buttonStyle) {
          this.setState(
            { buttonStyle: Object.entries(val.style), title: val.value },
            () => this.getFormList()
          );
        } else {
          this.setState({ title: val.value }, () => this.getFormList());
        }
      })
     
    });
    PubSub.unsubscribe("imgStyle");
    PubSub.subscribe("imgStyle", (name, val) => {
      this.setState({page: Object.entries(val.style)},()=>{
        if (!this.state.imgStyle) {
          this.setState(
            { imgStyle: Object.entries(val.style), title: val.value },
            () => this.getFormList()
          );
        } else {
          this.setState({ title: val.value }, () => this.getFormList());
        }
      })
     
    });
  }
  changeVal(e, index) {
    if (this.state.title == "文本") {
      let list = this.state.textStyle;
      list[index][1] = e.target.value;
      this.setState({ textStyle: list }, () =>
        PubSub.publish("textChange", this.state.textStyle)
      );
    } else if (this.state.title == "按钮") {
      let list = this.state.buttonStyle;
      list[index][1] = e.target.value;
      this.setState({ buttonStyle: list }, () =>
        PubSub.publish("buttonChange", this.state.buttonStyle)
      );
    }else if(this.state.title == '图片'){
      let list = this.state.imgStyle;
      list[index][1] = e.target.value;
      this.setState({ imgStyle: list }, () =>
        PubSub.publish("imgChange", this.state.imgStyle)
      );
    }
  }
  getFormList() {
    let res = null;
    if (this.state.title == "文本") {
      this.formRef.current.resetFields();
      res = this.state.textStyle;
    } else if (this.state.title == "按钮") {
      //重置form表单值
      this.formRef.current.resetFields();
      res = this.state.buttonStyle;
    }else if (this.state.title == "图片") {
      //重置form表单值
      this.formRef.current.resetFields();
      res = this.state.imgStyle;
    }
    this.setState({ page: res });
    return res;
  }
  render() {
    return (
      <div id="editCmp" className="mainEdit">
        <div className="title">{this.state.title}属性</div>
        <div className="content">
          <Form
            ref={this.formRef}
            name="basic"
            labelCol={{
              span: 8,
            }}
            wrapperCol={{
              span: 16,
            }}
            initialValues={{
              remember: true,
            }}
            autoComplete="off"
          >
            {this.state.page
              ? this.state.page.flatMap((item, index) => {
                  return (
                    <Form.Item
                      label={item[0]}
                      key={index}
                      name={item[0]}
                      initialValue={item[1]}
                    >
                      <Input onBlur={(e) => this.changeVal(e, index)} />
                    </Form.Item>
                  );
                })
              : null}
          </Form>
        </div>
      </div>
    );
  }
}
