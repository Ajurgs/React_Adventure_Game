import React,{createContext,useContext} from 'react';
import { useGameReducer } from './reducers';

const GameContext = createContext();
const {Provider} = GameContext;

const GameProvider = ({value = [], ...props})=>{
    const [state,dispatch] = useGameReducer({
        gameRunning:false,
        enemies:[],
        currentCharacters:[],
    })
    return <Provider value={[state,dispatch]} {...props}/>;
}
const useGameContext = () => useContext(GameContext);

export {GameProvider,useGameContext};