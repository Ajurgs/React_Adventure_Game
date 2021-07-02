import React,{useEffect,useState} from 'react';
import { useGameContext } from '../../utils/GlobalState';


const Style= {
    battleLog:{
        resize:"none",
        width:"95%"
    }
}


const GameLog = ()=>{
    const [state, dispatch] = useGameContext();
    const logRef = React.useRef(null)
    useEffect(()=>{
        logRef.current.value += `${state.lastMessage} \n`;
        logRef.current.scrollTop = logRef.current.scrollHeight;
    },[state.lastMessage])
    return (
        <>
        <div>
            <textarea id="battleLog" style={Style.battleLog} ref={logRef} ></textarea>
        </div>
        </>
    )
}
export default GameLog;