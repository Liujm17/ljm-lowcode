export const isTextComponent = 0;
export const isButtonComponent = 1;
export const isImgComponent = 2;



export const menus = [
  {
    desc: "文本",
    onlyKey:1,
    page:<div>ljm文本测试</div>,
    data: {
      type: 'div',
      value: "文本",
      iconfont:'iconfont icon-wenben',
      style: {
        top: '1px',
        left: '0px',
        width: '80px',
        height: '30px',
        fontSize: '12px',
        fontWeight: "normal",
        color: "red",
        backgroundColor: "yellow",
        textAlign: "left",
        borderRadius: "0%",
        borderStyle: "none",
        borderWidth: "0",
        borderColor: "#fff",
        position:'absolute'
      },
    },
  },
  {
    desc: "按钮",
    onlyKey:2,
    page:<button>ljm按钮测试</button>,
    data: {
      type: 'button',
      value: "按钮",
      iconfont:'iconfont icon-anniu',
      style: {
        top: '1px',
        left: '0px',
        width: '80px',
        height: '30px',
        fontSize: '12px',
        fontWeight: "normal",
        color: "red",
        backgroundColor: "yellow",
        textAlign: "left",
        borderRadius: "0%",
        borderStyle: "none",
        borderWidth: "0",
        borderColor: "#fff",
        position:'absolute'
      },
    },
  },
  {
    desc: "图片",
    onlyKey:3,
    page:<img></img>,
    data: {
      type: 'img',
      iconfont:'iconfont icon-image',
      value:"图片", // 图片地址
      style: {
        top: '1px',
        left: '0px',
        width: '80px',
        height: '30px',
        fontSize: '12px',
        fontWeight: "normal",
        color: "red",
        backgroundColor: "yellow",
        textAlign: "left",
        borderRadius: "0%",
        borderStyle: "none",
        borderWidth: "0",
        borderColor: "#fff",
        position:'absolute'
      },
    },
  },
];
