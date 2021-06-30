import React,{useEffect} from 'react';
import { useGameContext } from '../../utils/GlobalState';
import GameAction from '../GameAction';
import { TOGGLE_GAME } from '../../utils/actions';
const GameScreen = () =>{


    const [state,dispatch]= useGameContext();

    const {gameRunning} = state;

    function toggleGame(){
        dispatch({type:TOGGLE_GAME});
    }

    if(state.gameRunning){


        return(
            <div className="card">
                <GameAction/>
                <button onClick={toggleGame}>quit game</button>
            </div>
        )
    }
    else{
        return(
            <div className="card">
                <button onClick={toggleGame}>Play</button>
            </div>
        )
    }

}


export default GameScreen;