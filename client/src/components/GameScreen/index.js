import React,{useEffect} from 'react';
import { useGameContext } from '../../utils/GlobalState';
import GameAction from '../GameAction';
import GameRoom from '../GameRoom.js';
import { TOGGLE_GAME,TOGGLE_DUNGEON } from '../../utils/actions';

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
    function toggleDungeon(){
        dispatch({type:TOGGLE_DUNGEON})
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
                        <h1>Choose Your Team</h1>
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
                        <h1 className="mt-4">Select a Dungeon to Enter</h1>
                        <div className="row">
                            <div className="col-2">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio1" value={5}/>
                            <label className="form-check-label" htmlFor="inlineRadio1">5 Room</label>
                            </div>
                            <div className="col-2">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio2" value={10}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">10 Room</label>
                            </div>
                            <div className="col-2">
                            <input className="form-check-input" type="radio" name="inlineRadioOptions" id="inlineRadio3" value={20}/>
                            <label className="form-check-label" htmlFor="inlineRadio3">20 Room </label>
                            </div>
                        </div>

                        <button onClick={toggleDungeon}>Enter Dungeon</button>
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