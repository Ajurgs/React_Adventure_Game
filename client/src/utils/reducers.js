import { useReducer } from 'react';
import {
    ADD_CHARACTER,
    TOGGLE_GAME,
    TOGGLE_DUNGEON,
} from './actions';


export default function reducer(state,action){
    switch(action.type){
        case TOGGLE_GAME:{
            if(state.gameRunning){
                if(state.inDungeon){
                    return{
                        ...state,
                        gameRunning: false,
                        inDungeon:false,
                    }
                }else{
                    return{
                        ...state,
                        gameRunning:false,
                    }
                }
            }
            else{
                return{
                    ...state,
                    gameRunning: true,
                } 
            }
            break;
        }
        case TOGGLE_DUNGEON:
            return{
                ...state,
                inDungeon: !state.inDungeon
            }
    }
}


export function useGameReducer(initialState){
    return useReducer(reducer,initialState);
}