import React,{useState} from "react";

import {reducer} from '../../utils/reducers';

const GameAction = () =>{

    const [action,setAction] = useState();
    
    switch(action){
        case 'attack':{
            return (
                <>
                </>
            )
        }
    }



    return(
        <>
            <button id="attack">Attack</button>
        </>
    )
}

export default GameAction;