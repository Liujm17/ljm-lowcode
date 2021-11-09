import { Form, Input, Button, Space, Select } from "antd";
import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";

const { Option } = Select;

const optionList=[{name:'数字和百分比',value:'numberPercent'},{name:'字符串',value:'string'},{name:'距离',value:'distance'},{name:'颜色',value:'color'},{name:'数组',value:'number'},,{name:'定位',value:'position'}]

const DynamicFieldSet = (props) => {
  const onFinish = (values) => {
    props.getFields(values);
  };
const onChange=(value) =>{
    console.log(`selected ${value}`);
  }
  
  return (
    <Form name="添加字段" onFinish={onFinish} autoComplete="off">
      <Form.List name="data">
        {(fields, { add, remove }) => (
          <>
            {fields.map(({ key, name, fieldKey, ...restField }) => (
              <Space
                key={key}
                style={{ display: "flex", marginBottom: 8 }}
                align="baseline"
              >
                <Form.Item
                  {...restField}
                  name={[name, "nameStr"]}
                  fieldKey={[fieldKey, "nameStr"]}
                  rules={[{ required: true, message: "缺失字段描述" }]}
                >
                  <Input placeholder="字段描述" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "name"]}
                  fieldKey={[fieldKey, "name"]}
                  rules={[{ required: true, message: "缺失字段值" }]}
                >
                  <Input placeholder="字段值" />
                </Form.Item>
                <Form.Item
                  {...restField}
                  name={[name, "type"]}
                  fieldKey={[fieldKey, "type"]}
                >
                  <Select
                    showSearch
                    style={{ width: 200 }}
                    placeholder="选择类型"
                    optionFilterProp="children"
                    onChange={onChange}
                    filterOption={(input, option) =>
                      option.children
                        .toLowerCase()
                        .indexOf(input.toLowerCase()) >= 0
                    }
                  >
                    {optionList.flatMap((item,index)=><Option value={item.value} key={index}>{item.name}</Option>)}
                  </Select>
                </Form.Item>
                <MinusCircleOutlined onClick={() => remove(name)} />
              </Space>
            ))}
            <Form.Item>
              <Button
                type="dashed"
                onClick={() => add()}
                block
                icon={<PlusOutlined />}
              >
                添加字段
              </Button>
            </Form.Item>
          </>
        )}
      </Form.List>
      <div
        style={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
        }}
      >
        <Form.Item>
          <Button onClick={() => props.cancel()}>取消</Button>
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            提交
          </Button>
        </Form.Item>
      </div>
    </Form>
    // <Form name="dynamic_form_item" {...formItemLayoutWithOutLabel} onFinish={onFinish}>
    //   <Form.List
    //     name="names"
    //     rules={[
    //       {
    //         validator: async (_, names) => {
    //           if (!names || names.length < 1) {
    //             return Promise.reject(new Error('至少1个字段'));
    //           }
    //         },
    //       },
    //     ]}
    //   >
    //     {(fields, { add, remove }, { errors }) => (
    //       <>
    //         {fields.map((field, index) => (
    //           <Form.Item
    //             {...(index === 0 ? formItemLayout : formItemLayoutWithOutLabel)}
    //             label={index === 0 ? '字段名' : ''}
    //             required={false}
    //             key={field.key}
    //           >
    //             <Form.Item
    //               {...field}
    //               validateTrigger={['onChange', 'onBlur']}
    //               rules={[
    //                 {
    //                   required: true,
    //                   whitespace: true,
    //                   message: "字段名不能为空",
    //                 },
    //               ]}
    //               noStyle
    //             >
    //               <Input placeholder="请输入字段名" style={{ width: '60%' }} />
    //             </Form.Item>
    //             {fields.length > 1 ? (
    //               <MinusCircleOutlined
    //                 className="dynamic-delete-button"
    //                 onClick={() => remove(field.name)}
    //               />
    //             ) : null}
    //           </Form.Item>
    //         ))}
    //         <Form.Item>
    //           <Button
    //             type="dashed"
    //             onClick={() => add()}
    //             style={{ width: '60%' }}
    //             icon={<PlusOutlined />}
    //           >
    //             添加字段
    //           </Button>
    //           <Button
    //             type="dashed"
    //             onClick={() => {
    //               add('The head item', 0);
    //             }}
    //             style={{ width: '60%', marginTop: '20px' }}
    //             icon={<PlusOutlined />}
    //           >
    //             在顶部添加字段
    //           </Button>
    //           <Form.ErrorList errors={errors} />
    //         </Form.Item>
    //       </>
    //     )}
    //   </Form.List>
    //    <div style={{display:'flex',justifyContent:'space-around',alignItems:'center'}}>
    //    <Form.Item>
    //     <Button onClick={()=>props.cancel('aaa')}>
    //       取消
    //     </Button>
    //   </Form.Item>
    //   <Form.Item>
    //     <Button type="primary" htmlType="submit">
    //       提交
    //     </Button>
    //   </Form.Item>
    //    </div>
    // </Form>
  );
};

export default DynamicFieldSet;
