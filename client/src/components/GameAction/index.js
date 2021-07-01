import React,{useState,useEffect} from "react";
import { TAKE_TURN } from "../../utils/actions";

import { useGameContext } from "../../utils/GlobalState";


const GameAction = () =>{
    const [state,dispatch] = useGameContext();

    const [action,setAction] = useState('choose');
    

    const {enemies,turnOrder,whoseTurn,currentCharacters} = state;
    useEffect(()=>{
        console.log("in Use Effect")
        if(turnOrder[whoseTurn].ai){
            const timer = setTimeout(() => {
                console.log(`${turnOrder[whoseTurn].name} has taken their turn`)
                let target = Math.floor(Math.random()*state.currentCharacters.length)
                console.log(target);
                dispatch({type:TAKE_TURN});
            },1000)
            return () => clearTimeout(timer);
        }
    },[state.whoseTurn])
    if(turnOrder[whoseTurn].ai){
        // take the ai's turn
        console.log("ai turn");
        
        return(
            <div>
                <h4>Please Wait while AI Makes its move</h4>
            </div>
        )
    }
    else{
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


}

export default GameAction;