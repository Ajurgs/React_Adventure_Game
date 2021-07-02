import React,{useEffect,useState} from 'react';
import { useGameContext } from '../../utils/GlobalState';
import GameAction from '../GameAction';
import GameRoom from '../GameRoom.js';
import { TOGGLE_GAME,TOGGLE_DUNGEON,SET_HEROES,SET_TOTAL_ROOMS,SET_TURN_ORDER,MAKE_ROOM,TOGGLE_REWARD } from '../../utils/actions';

const styles = {
    heroSelect:{
        width:"100%"
    }
}

const GameScreen = () =>{
    const[formState, setFormState] = useState({
        firstHero: "",
        secondHero:"",
        thirdHero:"",
        dungeonSize:0,
    })
    const [state,dispatch]= useGameContext();
    
    useEffect(()=>{
        console.log("room")
        if(state.currentRoom > state.totalRooms){
            console.log("end Game");
            dispatch({type:TOGGLE_REWARD});
        }
    },[state.currentRoom])
    function toggleGame(){
        dispatch({type:TOGGLE_GAME});
    }
    function toggleDungeon(){
        dispatch({type:TOGGLE_DUNGEON})
    }

    const handelChange = (event)=>{
        const{name,value} = event.target;
        setFormState({
            ...formState,
            [name]:value,
        })
    }
    const handelFormSubmit = async (event) =>{
        event.preventDefault();
        console.log(formState);
        try{
            //dispatch({type:SET_HEROES, payload:[formState.firstHero,formState.secondHero,formState.thirdHero]});
            dispatch({type:SET_TOTAL_ROOMS,payload:formState.dungeonSize});
            dispatch({type:SET_TURN_ORDER})
            //dispatch({type:MAKE_ROOM})
            toggleDungeon();
        }
        catch(error){
            console.error(error);
        }
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
                    
                    <form className="container" onSubmit={handelFormSubmit}>
                        <h1>Choose Your Team</h1>
                        <div className="row">
                            <div className="col-4">
                                <select className="form-select form-select-lg" style={styles.heroSelect} name="firstHero" onChange={handelChange}>
                                    <option value=""> Chose a Hero</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="form-select form-select-lg" style={styles.heroSelect} name="secondHero" onChange={handelChange}>
                                    <option value=""> Chose a Hero</option>
                                </select>
                            </div>
                            <div className="col-4">
                                <select className="form-select form-select-lg" style={styles.heroSelect} name="thirdHero" onChange={handelChange}>
                                    <option value=""> Chose a Hero</option>
                                </select>
                            </div>
                        </div>
                        <h1 className="mt-4">Select a Dungeon to Enter</h1>
                        <div className="row">
                            <div className="col-2">
                            <label className="form-check-label" htmlFor="inlineRadio1">
                            <input className="form-check-input" type="radio" name="dungeonSize" id="small" value={5} onChange={handelChange}/>
                            5 Room</label>
                            </div>
                            <div className="col-2">
                            <input className="form-check-input" type="radio" name="dungeonSize" id="medium" value={10} onChange={handelChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio2">10 Room</label>
                            </div>
                            <div className="col-2">
                            <input className="form-check-input" type="radio" name="dungeonSize" id="large" value={20} onChange={handelChange}/>
                            <label className="form-check-label" htmlFor="inlineRadio3">20 Room </label>
                            </div>
                        </div>
                    <div className ="flex-row justify-center">
                        <button className ="btn btn-lg-dungeon" type="submit">Enter Dungeon</button>
                    </div>
                    </form>
                    <div className ="flex-row justify-center">
                    <button className ="btn btn-sm-play"onClick={toggleGame}>quit game</button>
                </div>
                </div>
            )
        }
    }
    else{
        return( <div className ="flex-row justify-center">
            <div className="card">
                <button classname = "btn btn-lg-play" onClick={toggleGame}>Play the Game</button>
            </div>
            </div>
        )
    }

}


export default GameScreen;