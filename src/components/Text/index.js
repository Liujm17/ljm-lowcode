import {useState,useEffect} from 'react';
import PubSub from "pubsub-js";

//暂不拖拽
// function TextComponent(props){
//     const [style,setStyle]=useState(props.style)
//     const [pubData,setPubData]=useState(props)
//     const [top,setTop]=useState(0)
//     const [left,setLeft]=useState(0)
//     //改变样式
//     function changeStyle(){
//         PubSub.publish('textStyle',pubData)
//     }
//     function handleDragStart(e){
//         console.log('start')
//         setTop(e.clientY)
//         setLeft(e.clientX)
//     }
//     function handleDragEnd(e){
//        const moveTop=e.clientY-top
//         const moveLeft=e.clientX-left
//         //深拷贝 不影响原值
//         let newStyle=JSON.parse(JSON.stringify(style))
//         newStyle.left=moveLeft+'px'
//         newStyle.top=moveTop+'px'
//         setStyle(()=>{
//             return newStyle
//         })
    
//     }
//     //拖动时持续性触发
//     function ondrag(e){
//         // e.preventDefault();
//         // e.stopPropagation();
//         // console.log('初始高左:',top,left)
//         // console.log('拖动高左:',e.clientY,e.clientX)
//         // const moveTop=e.clientY-top
//         // const moveLeft=e.clientX-left
//         // //深拷贝 不影响原值
//         // let newStyle=JSON.parse(JSON.stringify(style))
//         // newStyle.left=moveLeft+'px'
//         // newStyle.top=moveTop+'px'
//         // if(e.clientY!=0&&e.clientX!=0){
//         //     setStyle(newStyle)
//         // }
//     }
//     // function ondrop(e){
//     //     e.preventDefault();
//     //     console.log(e)
//     // }
//     useEffect(() => {
//         PubSub.subscribe("textChange", (name, val) => {
//             let newData={...pubData,style:Object.fromEntries(val)}
//             setPubData(newData)
//             setStyle(Object.fromEntries(val))
//            });
//     }, []);
//     return(
//         <div draggable onDrag={(e)=>ondrag(e)}  onDragStart={(e)=>handleDragStart(e)} onDragEnd={(e)=>handleDragEnd(e)} key={props.key} style={style} onClick={()=>changeStyle()}>测试文本</div>
//     )
//  }
const Test='div'

function TextComponent(props){
    const [style,setStyle]=useState(props.style)
    const [pubData,setPubData]=useState(props)
    //改变样式
    function changeStyle(){
        PubSub.publish('textStyle',pubData)
    }
    useEffect(() => {
        PubSub.subscribe("textChange", (name, val) => {
            let newData={...pubData,style:Object.fromEntries(val)}
            setPubData(newData)
            setStyle(Object.fromEntries(val))
           });
    }, []);
    return(
        <Test style={style} onClick={()=>changeStyle()}>测试文本</Test>
    )
 }
 
 export default TextComponent