import { useReducer } from 'react';
import {
    ADD_CHARACTER,
    TOGGLE_GAME,
} from './actions';


export default function reducer(state,action){
    switch(action.type){
        case TOGGLE_GAME:
            return{
                ...state,
                gameRunning: !state.gameRunning
            }
    }
}


export function useGameReducer(initialState){
    return useReducer(reducer,initialState);
}