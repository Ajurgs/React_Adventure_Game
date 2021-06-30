import React,{useState} from "react";

const Style={
    minHeight:"500px"
}

const GameRoom = () =>{


    return(
        <div className="card m-3" style={Style}>
            <div className="container">
                <div className="row justify-space-between">
                    <div className="col-3">Heros</div>
                    <div className="col-3">Enemies</div>
                </div>
            </div>
        </div>
    )
}

export default GameRoom;