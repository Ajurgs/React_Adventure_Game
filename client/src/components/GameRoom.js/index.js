import React,{useState} from "react";

import { useGameContext } from "../../utils/GlobalState";

const Style={
    minHeight:"400px"
}

const GameRoom = () =>{

    const [state,dispatch]= useGameContext();

    const {currentCharacters,enemies} = state;
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