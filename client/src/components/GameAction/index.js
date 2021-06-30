import React,{useState} from "react";

import { useGameContext } from "../../utils/GlobalState";


const GameAction = () =>{
    const [state,dispatch] = useGameContext();

    const [action,setAction] = useState('choose');
    


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
                {state.enemies.map((enemy,index) =>(
                    <button>{enemy.name}</button>
                ))}
                <button onClick={()=>setAction('choose')}>Cancel</button>
                </>
            )
        }
    }

}

export default GameAction;