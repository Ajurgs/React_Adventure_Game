import { useReducer } from "react";
import {
    TOGGLE_GAME,
    TOGGLE_DUNGEON,
    SET_HEROES,
    SET_TOTAL_ROOMS,
    SET_TURN_ORDER,
    TAKE_TURN,
    REMOVE_HERO,
    REMOVE_ENEMY,
    REMOVE_FROM_TURN,
    NEXT_ROOM,
    TOGGLE_BETWEEN_ROOM,
    SET_ENEMIES,
    SET_COIN,
    ADD_COIN,
    SUBTRACT_COIN,
    TOGGLE_REWARD,
    RESET_GAME,
    TOGGLE_LOSE,
    TOGGLE_RETREAT,
    SET_LAST_MESSAGE,
    SET_TURN,
    SET_USER_ID
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
        case TOGGLE_REWARD:{
            return{
                ...state,
                rewardRoom : !state.rewardRoom,
            }
        }
        case TOGGLE_LOSE:{
            return{
                ...state,
                looseScreen: !state.looseScreen,
            }
        }
        case TOGGLE_RETREAT:{
            return{
                ...state,
                retreatScreen: !state.retreatScreen,
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
        case SET_TURN_ORDER:{
            return{
                ...state,
                turnOrder: getTurnOrder(state.currentCharacters,state.enemies),
            }
        }
        case SET_LAST_MESSAGE:{
            return{
                ...state,
                lastMessage: action.payload,
            }
        }
        case SET_TURN:{
            return{
                ...state,
                whoseTurn: action.payload,
            }
        }
        case SET_USER_ID:{
            return{
                ...state,
                userID : action.payload
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
                currentRoom: state.currentRoom +1,
            }
        }
        case RESET_GAME:{
            return{
                ...state,
                gameRunning:false,
                inDungeon:false,
                betweenRooms:false,
                rewardRoom:false,
                looseScreen:false,
                retreatScreen:false,
                turnOrder:[],
                currentRoom:1,
                totalRooms:1,
                whoseTurn:0,
            }
        }
    }
}

export function useGameReducer(initialState) {
  return useReducer(reducer, initialState);
}
