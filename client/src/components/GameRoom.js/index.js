import React,{useState,useEffect} from "react";

import { useGameContext } from "../../utils/GlobalState";

const Style={
    minHeight:"400px"
}

const GameRoom = () =>{

    const [state,dispatch]= useGameContext();

    const {currentCharacters,enemies} = state;
    if(state.betweenRooms){
        return(
            <div className="card m-3" style={Style}>
                <h1>Populating Room</h1>
            </div>
        )
    }
    if(state.rewardRoom){
        return(
            <div className="card m-3" style={Style}>
                <h1>You Have Entered The Treasure Room</h1>
                <h2>Claim Your Reward</h2>
                <h3>Your Exploration Has Uncovered {state.totalRooms} Coins </h3>
            </div>
        )
    }
    if(state.looseScreen){
        return(
            <div className="card m-3" style={Style}>
                <h1>The Heroes Are No More</h1>
                <h2>All that remains are bones</h2>
                <h3>Others may Try To seek Riches</h3>
            </div>
        )
    }
    return(
        <div className="card m-3" style={Style}>
            <div className="container">
                <div className="row justify-space-between">
                    <div className="col-3 ">
                    <h5>Heros</h5>
                    {currentCharacters.map((hero,index)=>(
                        <div key={index}className="card">
                            <div className="card-header">
                                <h5>
                                    {hero.name}
                                </h5>
                            </div>
                            <div className="card-body">
                                <h6>Health: {hero.health}</h6>
                            </div>
                        </div>
                    ))}
                    </div>
                    <div className="col-3">
                    <h5>Enemies</h5>
                    {enemies.map((enemy,index)=>(
                        <div key={index}className="card">
                            <div className="card-header">
                                <h5>
                                    {enemy.name}
                                </h5>
                            </div>
                            <div className="card-body">
                                <h6>Health: {enemy.health}</h6>
                            </div>
                        </div>
                    ))}
                    </div>
                </div>
            </div>
        </div>
    )
}

export default GameRoom;