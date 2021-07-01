import { useReducer } from "react";
import {
    ADD_CHARACTER,
    TOGGLE_GAME,
    TOGGLE_DUNGEON,
    SET_HEROS,
    SET_TOTAL_ROOMS,
    SET_TURN_ORDER,
    MAKE_ROOM,
    TAKE_TURN,
    ADD_COIN,
    SUBTRACT_COIN,
    SET_COIN
} from './actions';

import { getTurnOrder ,nextTurn} from './helper';

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
        case SET_TOTAL_ROOMS:
            return{
                ...state,
                totalRooms: Number(action.payload)
            }
        case SET_HEROS:
            return{
                ...state,
                currentCharacters: action.payload,
            }
        case MAKE_ROOM:{
            return{
                ...state
            }
        }
        case SET_TURN_ORDER:{
            return{
                ...state,
                turnOrder: getTurnOrder(state.currentCharacters,state.enemies),
            }
        }
        case TAKE_TURN:{
            return{
                ...state,
                whoseTurn: nextTurn(state.whoseTurn,state.turnOrder)
            }
        }
        case ADD_COIN:
            return {
              ...state,
              coinBalance: state.coinBalance + action.payload,
            };
        case SUBTRACT_COIN:
            return {
              ...state,
              coinBalance: state.coinBalance - action.payload,
            };
        case SET_COIN:
            return {
              ...state,
              coinBalance: action.payload,
            };
    } 
}

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
}
