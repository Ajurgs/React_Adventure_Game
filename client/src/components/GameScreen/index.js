import React,{useEffect} from 'react';
import { useGameContext } from '../../utils/GlobalState';
import GameAction from '../GameAction';
import GameRoom from '../GameRoom.js';
import { TOGGLE_GAME } from '../../utils/actions';

const styles = {
    heroSelect:{
        width:"100%"
    }
}


const GameScreen = () =>{


    const [state,dispatch]= useGameContext();

    function toggleGame(){
        dispatch({type:TOGGLE_GAME});
    }

    if(state.gameRunning){

        if(state.inDungeon){

            return(
                <div className="card">
                    <GameRoom/>
                    <GameAction/>
                    <button onClick={toggleGame}>quit game</button>
                </div>
            )
        }
        else{
            // select team and dungeon
            return(
                <div className="card">
                    
                    <form className="container">
                        <h1>Chose Your Team</h1>
                        <div className="row">
                            <div className="col-4">
                                <select className="form-select form-select-lg" style={styles.heroSelect}>
                                    <option> Chose a Hero</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="form-select form-select-lg" style={styles.heroSelect}>
                                    <option> Chose a Hero</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="form-select form-select-lg" style={styles.heroSelect}>
                                    <option> Chose a Hero</option>
                                </select>
                            </div>
                        </div>
                    </form>

                    <button onClick={toggleGame}>quit game</button>
                </div>
            )
        }
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