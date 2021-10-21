import {useState,useEffect} from 'react';
import PubSub from "pubsub-js";

function ButtonComponent(props){
    const [style,setStyle]=useState(props.style)
    const [pubData,setPubData]=useState(props)
    function changeStyle(){
        PubSub.publish('buttonStyle',pubData)
    }
    useEffect(() => {
        PubSub.unsubscribe("buttonChange");
        PubSub.subscribe("buttonChange", (name, val) => {
            let newData={...pubData,style:Object.fromEntries(val)}
            setPubData(newData)
            setStyle(Object.fromEntries(val))
           });
    }, []);
    return(
       <button key={props.key} style={style} onClick={()=>changeStyle()}>测试按钮</button>
   )
}

export default ButtonComponent