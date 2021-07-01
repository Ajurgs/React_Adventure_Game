import { useReducer } from "react";
import {
    ADD_CHARACTER,
    TOGGLE_GAME,
    TOGGLE_DUNGEON,
    SET_HEROES,
    SET_TOTAL_ROOMS,
    SET_TURN_ORDER,
    MAKE_ROOM,
    TAKE_TURN,
    ADD_COIN,
    SUBTRACT_COIN,
    SET_COIN,
    REMOVE_HERO,
    REMOVE_ENEMY,
    REMOVE_FROM_TURN,
    NEXT_ROOM,
    TOGGLE_BETWEEN_ROOM,
    SET_ENEMIES,
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
        case TOGGLE_BETWEEN_ROOM:{
            return{
                ...state,
                betweenRooms: !state.betweenRooms
            }
        }
        case SET_TOTAL_ROOMS:
            return{
                ...state,
                totalRooms: Number(action.payload)
            }
        case SET_HEROES:
            return{
                ...state,
                currentCharacters: action.payload,
            }
        case SET_ENEMIES:{
            return{
                ...state,
                enemies: action.payload,
            }
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
        case REMOVE_HERO:{
            return{
                ...state,
                currentCharacters: [...state.currentCharacters].filter((hero)=> hero._id !== action.payload)
            }
        } 
        case REMOVE_ENEMY:{
            return{
                ...state,
                enemies: [...state.enemies].filter((enemy)=> enemy._id !== action.payload)
            }
        }
        case REMOVE_FROM_TURN:{
            return{
                ...state,
                turnOrder: [...state.turnOrder].filter((char)=> char._id !== action.payload)
            }
        }
        case NEXT_ROOM:{
            return{
                ...state,
                currentRoom: state.currentRoom++,
            }
        }
        }
}

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
}
