
import React,{useEffect,useState} from 'react';
import { useGameContext } from '../../utils/GlobalState';
import GameAction from '../GameAction';
import GameRoom from '../GameRoom.js';
import { useLazyQuery } from "@apollo/client";
import {QUERY_ME,QUERY_ENEMIES} from '../../utils/queries';
import {  chooseThreeEnemies } from "../../utils/helper";
import { TOGGLE_GAME,TOGGLE_DUNGEON,SET_HEROES,SET_TOTAL_ROOMS,SET_TURN_ORDER,SET_ENEMIES,TOGGLE_REWARD,RESET_GAME } from '../../utils/actions';

const styles = {
  heroSelect: {
    width: "100%",
  },
};

const GameScreen = () =>{
    const[formState, setFormState] = useState({
        firstHero: "",
        secondHero:"",
        thirdHero:"",
        dungeonSize:0,
    });

    const [state,dispatch]= useGameContext();
    const [getCharacters,{loading,data}] = useLazyQuery(QUERY_ME);
    const [getEnemies,{loading:loadingEnemies,data:enemyData}]= useLazyQuery(QUERY_ENEMIES);

    // Use Effect for when the room changes
    useEffect(()=>{
        console.log("room")
        // go to the reward page if at the final room
        if(state.currentRoom > state.totalRooms){
            console.log("end Game");
            dispatch({type:TOGGLE_REWARD});
        }
    },[state.currentRoom])
    // toggle the gameRunning bool in GlobalState
    function toggleGame(){
        dispatch({type:TOGGLE_GAME});
    }
    // toggle the inDungeon bool in GlobalState
    function toggleDungeon(){
        dispatch({type:TOGGLE_DUNGEON})
    }
    // set the form state on change function
    const handelChange = (event) => {
        const { name, value } = event.target;
        setFormState({
            ...formState,
            [name]: value,
        });
    };
    // start game function
    function startGame(){
        // call toggleGame
        toggleGame();
        // call the lazy query for the players characters
        getCharacters();
        // Call to lazy query for the enemy data
        getEnemies();
    }
    // quit game and rest the global state
    function quitGame(){
        dispatch({type:RESET_GAME});
    }
    // on form submit
    const handelFormSubmit = async (event) => {
        event.preventDefault();
        try {
            // Set the global state to the current instance of the game
            //dispatch({type:SET_HEROES, payload:[formState.firstHero,formState.secondHero,formState.thirdHero]});
            dispatch({ type: SET_TOTAL_ROOMS, payload: formState.dungeonSize });
            const newEnemies = chooseThreeEnemies(enemyData.enemies);
            dispatch({ type: SET_ENEMIES, payload: newEnemies });
            dispatch({ type: SET_TURN_ORDER });
            toggleDungeon();
        } catch (error) {
            console.error(error);
        }
    }

// what to do if the global state gameRunning is true
if (state.gameRunning) {
    // if loading from the getCharacters function 
    if(loading || loadingEnemies){
        return(
            <p>loading...</p>
        )
    }
    // if the inDungeon Global State is true
    if (state.inDungeon) {
        // return the Game room and action bar
      return (
        <div className="card">
          <GameRoom />
          <GameAction />
          <button className="btn btn-sm-end" onClick={quitGame}>
            Quit Game
          </button>
        </div>
      );
    } else {
      // select team and dungeon size
      if(data&& data.me && enemyData && enemyData.enemies){
          const {characters}= data.me;

        //   if(characters.length < 3){
        //       return(
        //           <div className="card">

        //             <h1>You Need More Heroes To Enter</h1>
        //             <h2>You need at least 3 heroes to enter</h2>
        //             <h2>You currently have {characters.length} heros</h2>
        //           </div>
        //       )
        //   }
        //   else{
            return (
            <div className="card">
                <form className="container" onSubmit={handelFormSubmit}>
                    <h1>Choose Your Team</h1>
                    <div className="row">
                    <div className="col-4">
                        <select
                        className="form-select form-select-lg"
                        style={styles.heroSelect}
                        name="firstHero"
                        onChange={handelChange}
                        >
                        <option value=""> Chose a Hero</option>
                        {characters.map((c,index)=>{
                            <option key={index} value={{_id:c._id,name:c.name,health:c.health,attack:c.attack,speed:c.speed,ai:false}}>{c.name}</option>
                        })}
                        </select>
                    </div>
                    <div className="col-4">
                        <select
                        className="form-select form-select-lg"
                        style={styles.heroSelect}
                        name="secondHero"
                        onChange={handelChange}
                        >
                        <option value=""> Chose a Hero</option>
                        {characters.map((c,index)=>{
                            <option key={index} value={{_id:c._id,name:c.name,health:c.health,attack:c.attack,speed:c.speed,ai:false}}>{c.name}</option>
                        })}
                        </select>
                    </div>
                    <div className="col-4">
                        <select
                        className="form-select form-select-lg"
                        style={styles.heroSelect}
                        name="thirdHero"
                        onChange={handelChange}
                        >
                        <option value=""> Chose a Hero</option>
                        {characters.map((c,index)=>{
                            <option key={index} value={{_id:c._id,name:c.name,health:c.health,attack:c.attack,speed:c.speed,ai:false}}>{c.name}</option>
                        })}
                        </select>
                    </div>
                    </div>
                    <h1 className="mt-4">Select a Dungeon to Enter</h1>
                    <div className="row">
                    <div className="col-2">
                        <label className="form-check-label" htmlFor="inlineRadio1">
                        <input
                            className="form-check-input"
                            type="radio"
                            name="dungeonSize"
                            id="small"
                            value={5}
                            onChange={handelChange}
                            />
                        5 Room
                        </label>
                    </div>
                    <div className="col-2">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="dungeonSize"
                        id="medium"
                        value={10}
                        onChange={handelChange}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio2">
                        10 Room
                        </label>
                    </div>
                    <div className="col-2">
                        <input
                        className="form-check-input"
                        type="radio"
                        name="dungeonSize"
                        id="large"
                        value={20}
                        onChange={handelChange}
                        />
                        <label className="form-check-label" htmlFor="inlineRadio3">
                        20 Room{" "}
                        </label>
                    </div>
                    </div>
                    <div className="flex-row justify-center">
                    <button className="btn btn-lg-dungeon" type="submit">
                        Enter Dungeon
                    </button>
                    </div>
                </form>
                <div className="flex-row justify-center">
                    <button className="btn btn-sm-quit" onClick={toggleGame}>
                    Quit Game
                    </button>
                </div>
            </div>
            );
        }
    // }
    // if the data from the queries has not returned yet
    else{
        return(
            <p>loading...</p>
            )
        }
    }
}
// if not gameRunning  
else 
{
    // give option to start the game
    return (
      <div className="flex-row justify-center">
        <div className="card">
          <button className="btn btn-lg-play" onClick={startGame}>
            Play the Game
          </button>
        </div>
      </div>
    );
  }
};

export default GameScreen;
