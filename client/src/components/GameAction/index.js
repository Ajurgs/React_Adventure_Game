import React,{useState} from "react";

import { useGameContext } from "../../utils/GlobalState";


const GameAction = () =>{
    const [state,dispatch] = useGameContext();

    const [action,setAction] = useState('choose');
    

    const {enemies} = state;
    switch(action){
        case 'choose':{
            return(
            <>
            <button id="attack" onClick={()=>setAction('attack')}>Attack</button>
            </>
            )
        }
        case 'attack':{
            return (
                <> 
                {enemies.map((enemy,index) =>(
                    <button key={index}>{enemy.name}</button>
                ))}
                <button onClick={()=>setAction('choose')}>Cancel</button>
                </>
            )
        }
    }

}

export default GameAction;