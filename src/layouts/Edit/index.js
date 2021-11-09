import React from "react";
import "./index.scss";
import PubSub from "pubsub-js";
import {
  Form,
  Input,
  Button,
  Modal,
  Popconfirm,
  message,
  InputNumber,
  Select,
  Row,
  Col,
  Tag,
} from "antd";
import DynamicFieldSet from "../../components/useComp/DynamicFieldSet";
import { api } from "../../api/api";

/** 操作步骤
 *  点击组件，触发changeStyle事件进行PubSub传值，
 *  在edit页面的componentDidMount中接收，接收的时候先进行重赋值
 *  改变input时触发改变changeVal事件，进行Publish传值
 *  在具体渲染组件内接收存储，下次点击组件的时候传新的值
 *  tips:每次componentDidMount中pubsub接收的时候进行页面重渲染事件getFormList
 */
const { Option } = Select;

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      textStyle: "",
      buttonStyle: "",
      imgStyle: "",
      title: "已有属性",
      page: null,
      tagPage: null, //标签列表
      isModalVisible: false, //添加字段弹窗
      isModalVisible2:false, //修改xx字段弹窗
      btName: "添加",
      fromContentTagVal: null, //从content页面来的tag所有值
      clickItem:''
    };
  }
  // 创建一个ref
  formRef = React.createRef();
  formItemRef = React.createRef();
  componentDidMount() {
    PubSub.subscribe("styleList", (name, val) => {
      this.setState({ page: val });
    });
    PubSub.subscribe("changeStyleList", (name, val) => {
      this.setState({ fromContentTagVal: val });
      this.setState({ title: "标签属性" });
      this.setState({ btName: "修改" });
      let list = JSON.parse(JSON.stringify(this.state.page));
      Object.keys(val.style).forEach((item, index) => {
        list.forEach((sitem) => {
          if (sitem.name == item) {
            sitem.value = Object.values(val.style)[index];
          }
        });
        // list.push(this.state.page.filter((sitem)=>sitem.name==item)[0])
      });
      this.setState({ tagPage: list }); // //给已有的列表重新赋值
      this.formRef.current.resetFields();
    });
  }
  //获取formitem标签
  getFormitem(item, index) {
    // return <Input ref={this.formItemRef} onBlur={(e) => this.changeVal(e, index)} onClick={()=>this.clickFormitem(item)} />;
    return (
      <Button onClick={() => this.clickFormitem(item, index)}>
        {item.value ? item.value : "暂无,点击更改"}
      </Button>
    );
  }
  //点击标签按钮更改值的事件
  clickFormitem(item, index) {
      this.setState({isModalVisible2:true,clickItem:item})
  }
  //ljm做到此处 🌟🌟🌟 
  /** 此处为分割px和数字或者%和数字
   var test='100px'
console.log(test.includes('px'))  true
var res=test.replace(/[^0-9]+/ig,"")
console.log(res)  100
   */
  //改变formitem的值
  changeFormitem(item){ 
    switch(item.type){
      case 'numberPercent':
        return <InputNumber min={0} defaultValue={item.value} />
    }
  }
  //form表单列表
  getFormList() {
    if (this.state.title == "已有属性") {
      return this.state.page
        ? this.state.page.flatMap((item, index) => {
            return (
              <Form.Item
                label={item.nameStr}
                key={item.id}
                name={item.name}
                initialValue={item.value}
              >
                <Input onBlur={(e) => this.changeVal(e, index)} disabled />
              </Form.Item>
            );
          })
        : null;
    } else if (this.state.title == "标签属性") {
      return this.state.tagPage
        ? this.state.tagPage.flatMap((item, index) => {
            return (
              <Form.Item
                label={item.nameStr}
                key={item.id}
                name={item.name}
                initialValue={item.value}
              >
                {this.getFormitem(item, index)}
                {/* {item.type=='numberPercent'? <InputNumber addonafter={selectAfter} initialvalues={100} />:<Input onBlur={(e) => this.changeVal(e, index)} />} */}
              </Form.Item>
            );
          })
        : null;
    }
  }

  changeVal(e, index) {
    console.log(e);
    //深拷贝标签列表
    let newtagPage = JSON.parse(JSON.stringify(this.state.tagPage));
    //赋值,对应列表的value值
    newtagPage[index].value = e.target.value;
    //动态改变
    this.setState({ tagPage: newtagPage }, () =>
      console.log("动态改变后的tagPage值:", this.state.tagPage)
    );
  }
  //添加样式字段弹窗提交
  handleOk() {
    this.setState({ isModalVisible: false });
  }
  //添加样式字段取消弹窗
  handleCancel() {
    this.setState({ isModalVisible: false });
  }
  //添加样式字段显示弹窗
  showModal() {
    if (this.state.btName == "添加") {
      this.setState({ isModalVisible: true }, () => console.log(this.state));
    } else if (this.state.btName == "修改") {
      return;
    }
  }
  //修改样式确认
  confirm(e) {
    let list = this.state.tagPage.map((item) => {
      return [item.name, item.value];
    });
    // 把属性加到详情表
    let params = {
      ...this.state.fromContentTagVal,
      style: JSON.stringify(Object.fromEntries(list)),
    };
    api.updateTag(params).then((res) => {
      //修改成功
      PubSub.publish("changeSuccess");
      message.success("成功提交");
    });
  }

  //修改样式取消
  cancel(e) {
    console.log(e);
    message.error("取消提交");
  }
  //获取弹窗数据 val:弹窗字段数据
  getFields(val) {
    this.formRef.current.resetFields();
    let params = val.data;
    params.forEach((item) => {
      api.addStyleDetail(item).then((res) => {
        if (res.data.code == 0) {
          this.handleCancel();
        }
      });
    });
  }
  //根据按钮名称修改返回按钮内容和标题
  getBtTittleContent() {
    return this.state.btName == "修改" ? (
      <Popconfirm
        title="你是否确定提交?"
        onConfirm={this.confirm.bind(this)}
        onCancel={this.cancel.bind(this)}
        okText="确认"
        cancelText="取消"
      >
        <Button type="primary" onClick={() => this.showModal()}>
          {this.state.btName}
        </Button>
        <Button
          onClick={() => this.setState({ btName: "添加", title: "已有属性" })}
        >
          返回添加
        </Button>
      </Popconfirm>
    ) : (
      <Button type="primary" onClick={() => this.showModal()}>
        {this.state.btName}
      </Button>
    );
  }
  render() {
    return (
      <div id="editCmp" className="mainEdit">
        <div className="title">{this.state.title}</div>
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
            {this.getFormList()}
          </Form>
        </div>
        <div className="handleContent">
          {/**添加字段弹窗 */}
          <Modal
            title="添加字段"
            okText="提交"
            cancelText="取消"
            visible={this.state.isModalVisible}
            onOk={() => this.handleOk()}
            onCancel={() => this.handleCancel()}
            footer={null}
          >
            <DynamicFieldSet
              getFields={(val) => this.getFields(val)}
              cancel={() => this.handleCancel()}
            ></DynamicFieldSet>
          </Modal>
          {/**修改xx字段弹窗 */}
          <Modal
            title="修改某字段"
            visible={this.state.isModalVisible2}
            onCancel={() => this.setState({isModalVisible2:false})}
          >
            {this.changeFormitem(this.state.clickItem)}
          </Modal>
          {this.getBtTittleContent()}
        </div>
      </div>
    );
  }
}
