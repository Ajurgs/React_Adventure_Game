import { useReducer } from "react";
import {
  ADD_CHARACTER,
  TOGGLE_GAME,
  TOGGLE_DUNGEON,
  ADD_COIN,
  SUBTRACT_COIN,
  SET_COIN,
} from "./actions";

export default function reducer(state, action) {
  switch (action.type) {
    case TOGGLE_GAME: {
      if (state.gameRunning) {
        if (state.inDungeon) {
          return {
            ...state,
            gameRunning: false,
            inDungeon: false,
          };
        } else {
          return {
            ...state,
            gameRunning: false,
          };
        }
      } else {
        return {
          ...state,
          gameRunning: true,
        };
      }
    }
    case TOGGLE_DUNGEON:
      return {
        ...state,
        inDungeon: !state.inDungeon,
      };
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
