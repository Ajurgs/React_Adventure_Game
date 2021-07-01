import React,{createContext,useContext} from 'react';
import { useGameReducer } from './reducers';

const GameContext = createContext();
const {Provider} = GameContext;

const GameProvider = ({value = [], ...props})=>{
    const [state,dispatch] = useGameReducer({
        gameRunning:false,
        inDungeon:false,
        enemies:[
            {name:"Imp",health:10,attack:3},
            {name:"Ork",health:15,attack:5},
            {name:"Paul",health:1,attack:1},
        ],
        currentCharacters:[
            {name:"Dave", health:20,attack:2},
            {name:"Jill", health:25,attack:3},
            {name:"Carl", health:10,attack:8},
        ],
    })
    return <Provider value={[state,dispatch]} {...props}/>;
}
const useGameContext = () => useContext(GameContext);

export {GameProvider,useGameContext};