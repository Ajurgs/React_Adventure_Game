import React, { useState, useEffect } from "react";
import {
  TAKE_TURN,
  NEXT_ROOM,
  SET_ENEMIES,
  TOGGLE_LOSE,
  RESET_GAME,
  SET_LAST_MESSAGE,
  SET_TURN_ORDER,
  SET_TURN,
} from "../../utils/actions";

import { useGameContext } from "../../utils/GlobalState";
import { QUERY_ENEMIES } from "../../utils/queries";
import { UPDATE_COIN_BALANCE } from "../../utils/mutations";
import { useLazyQuery } from "@apollo/client";
import { useMutation } from "@apollo/client";
import { makeAttack, chooseThreeEnemies } from "../../utils/helper";

const GameAction = () => {
  const [state, dispatch] = useGameContext();

  const [action, setAction] = useState("choose");

  const [getEnemies, { loading, data }] = useLazyQuery(QUERY_ENEMIES);
  const [updateCoinBalance,{error,data:coinData}] = useMutation(UPDATE_COIN_BALANCE);
  const { enemies, turnOrder, whoseTurn, currentCharacters,looseScreen } = state;

  useEffect(() => {
    console.log("in Use Effect");
    aiAction();
  }, [whoseTurn]);

  useEffect(()=>{
    console.log("room change");
    //dispatch({type:TAKE_TURN});
    dispatch({type:SET_TURN,payload:0});
    if(state.currentRoom!==1){
      aiAction();
    }
  },[state.currentRoom])

  useEffect(() => {
    if (currentCharacters.length === 0) {
      // you lose
      console.log("YOU LOSE!!!!");
      dispatch({ type: TOGGLE_LOSE });
    }
    if (enemies.length === 0) {
      // clear the room
      // ask if you want to continue
      setAction("nextRoom");
    }
  }, [state.enemies.length, state.currentCharacters.length]);
  function aiAction(){
    if (turnOrder[whoseTurn].ai && !looseScreen) {
      const timer = setTimeout(() => {
        console.log(`${turnOrder[whoseTurn].name} has taken their turn`);
        dispatch({
          type: SET_LAST_MESSAGE,
          payload: `${turnOrder[whoseTurn].name} ${turnOrder[whoseTurn]._id} has taken their turn`,
        });
        let target = Math.floor(Math.random() * state.currentCharacters.length);
        console.log(target);
        makeAttack(
          turnOrder[whoseTurn].attack,
          currentCharacters[target],
          dispatch
        );
        dispatch({ type: TAKE_TURN });
      }, 1000);
      return () => clearTimeout(timer);
    }
  }
  async function exitDungeon() {
    try{
      console.log(state.coinBalance+state.totalRooms)
      const {data} = await updateCoinBalance({
        variables:{
          profileId : state.userID,
          coins: state.coinBalance + state.totalRooms,
        }
      })
      console.log(data);
    }
    catch (err){
      console.error(err)
    }
    dispatch({ type: RESET_GAME });
  }
    if (state.looseScreen) {
    return (
      <>
        <button
          className="btn btn-sm-end"
          onClick={() => dispatch({ type: RESET_GAME })}
        >
          Main Menu
        </button>
      </>
    );
  }
  if (state.rewardRoom) {
    return (
      <>
        <button className="btn btn-sm-end" onClick={() => exitDungeon()}>
          Exit Dungeon
        </button>
      </>
    );
  }
  if(turnOrder<0){
    dispatch({type:TAKE_TURN});
    return(
      <div>
        <h4>Go To next turn</h4>
      </div>
    )
  }
  console.log(turnOrder,whoseTurn)
  if (turnOrder[whoseTurn].ai) {
    // take the ai's turn
    console.log("ai turn");

    return (
      <div>
        <h4>Please Wait while AI Makes its move</h4>
      </div>
    );
  }

  function setLoading() {
    console.log("load enemies");
    getEnemies();
    setAction("loading");
  }
  function handelAttack(index) {
    console.log(`attacking ${state.enemies[index].name} at index ${index} `);
    makeAttack(turnOrder[whoseTurn].attack, enemies[index], dispatch);
    setAction("choose");
    dispatch({ type: TAKE_TURN });
  }
  function openDoor(enemies) {
    const newEnemies = chooseThreeEnemies(enemies);
    dispatch({ type: SET_ENEMIES, payload: newEnemies });
    dispatch({type:SET_TURN_ORDER});
    dispatch({ type: NEXT_ROOM });
    setAction("choose");
  }
  if (turnOrder[whoseTurn].ai) {
    // take the ai's turn
    console.log("ai turn");

    return (
      <div>
        <h4>Please Wait while AI Makes its move</h4>
      </div>
    );
  } else {
    switch (action) {
      case "choose": {
        return (
          <>
            <button
              className="btn btn-sm-attack"
              id="attack"
              onClick={() => setAction("attack")}
            >
              Attack
            </button>
            <button
              className="btn btn-sm-skill"
              id="skill"
              onClick={() => setAction("skill")}
            >
              Skill
            </button>
          </>
        );
      }
      case "attack": {
        return (
          <>
            {enemies.map((enemy, index) => (
              <button
                className="btn btn-sm-enemy"
                key={index}
                onClick={() => handelAttack(index)}
              >
                {enemy.name}
              </button>
            ))}
            <button
              className="btn btn-sm-cancel"
              onClick={() => setAction("choose")}
            >
              Cancel
            </button>
          </>
        );
      }
      case "skill": {
        return (
          <>
            <button
              className="btn btn-sm-cancel-one"
              onClick={() => setAction("choose")}
            >
              Cancel
            </button>
          </>
        );
      }
      case "nextRoom": {
        return (
          <>
            {/* go to next room */}
            <button className="btn btn-sm-proceed" onClick={() => setLoading()}>
              Proceed to Next Room
            </button>
            {/* {go to the end game screen} */}
            <button className="btn btn-sm-leave">Leave Dungeon</button>
          </>
        );
      }
      case "loading": {
        if (loading) {
          return (
            <>
              <h4>You Proceed Down the Dark Halls</h4>
            </>
          );
        } else {
          if (data && data.enemies) {
            return (
              <>
                <h4>You Stand In Front of an Mysterious Door</h4>
                <button
                  className="btn btn-sm-open"
                  onClick={() => openDoor(data.enemies)}
                >
                  Open The Door
                </button>
              </>
            );
          }
          return (
            <>
              <h4>You Proceed Down the Dark Halls</h4>
            </>
          );
        }
      }
    }
  }
};

export default GameAction;
