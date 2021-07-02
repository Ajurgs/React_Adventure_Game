import React, { createContext, useContext } from "react";
import { useGameReducer } from "./reducers";

const GameContext = createContext();
const { Provider } = GameContext;

const GameProvider = ({value = [], ...props})=>{
    const [state,dispatch] = useGameReducer({
        gameRunning:false,
        inDungeon:false,
        betweenRooms:false,
        rewardRoom:false,
        looseScreen:false,
        retreatScreen:false,
        enemies:[
            {_id:"003",name:"Paul",health:1,attack:1,speed:8,ai:true},
        ],
        currentCharacters:[
            {_id:"004",name:"Dave", health:20,attack:2,speed:1,ai:false},
        ],
        turnOrder:[],
        currentRoom :1,
        totalRooms: 1,
        whoseTurn:0,
        coinBalance: 0,
    })
    return <Provider value={[state,dispatch]} {...props}/>;
}

const useGameContext = () => useContext(GameContext);

export { GameProvider, useGameContext };
