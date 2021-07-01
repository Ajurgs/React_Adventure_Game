import React,{createContext,useContext} from 'react';
import { useGameReducer } from './reducers';

const GameContext = createContext();
const {Provider} = GameContext;

const GameProvider = ({value = [], ...props})=>{
    const [state,dispatch] = useGameReducer({
        gameRunning:false,
        inDungeon:false,
        enemies:[
            {_id:"001",name:"Imp",health:10,attack:3,speed:4,ai:true},
            {_id:"002",name:"Ork",health:15,attack:5,speed:3,ai:true},
            {_id:"003",name:"Paul",health:1,attack:1,speed:8,ai:true},
        ],
        currentCharacters:[
            {_id:"004",name:"Dave", health:20,attack:2,speed:1,ai:false},
            {_id:"005",name:"Jill", health:25,attack:3,speed:4,ai:false},
            {_id:"006",name:"Carl", health:10,attack:8,speed:5,ai:false},
        ],
        turnOrder:[],
        currentRoom :1,
        totalRooms: 1,
        whoseTurn:0,
    })
    return <Provider value={[state,dispatch]} {...props}/>;
}
const useGameContext = () => useContext(GameContext);

export {GameProvider,useGameContext};