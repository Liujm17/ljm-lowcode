import {useState,useEffect} from 'react';
import PubSub from "pubsub-js";


function ImgComponent(props){
    const [style,setStyle]=useState(props.style)
    const [pubData,setPubData]=useState(props)
    function changeStyle(){
        PubSub.publish('imgStyle',pubData)
    }
    useEffect(() => {
        PubSub.unsubscribe("imgChange");
        PubSub.subscribe("imgChange", (name, val) => {
            let newData={...pubData,style:Object.fromEntries(val)}
            setPubData(newData)
            setStyle(Object.fromEntries(val))
           });
    }, []);
    return(
        <div key={props.key} style={style} onClick={()=>changeStyle()}>测试图片</div>
    )
 }
 
 export default ImgComponent