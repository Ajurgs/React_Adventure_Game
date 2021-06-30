import React,{useState} from "react";

import {reducer} from '../../utils/reducers';

const GameAction = () =>{

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
                <button onClick={()=>setAction('choose')}>Cancel</button>
                </>
            )
        }
    }

}

export default GameAction;