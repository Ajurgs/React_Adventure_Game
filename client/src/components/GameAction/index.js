import React,{useState,useEffect} from "react";
import { TAKE_TURN,NEXT_ROOM } from "../../utils/actions";

import { useGameContext } from "../../utils/GlobalState";
import { QUERY_ENEMIES } from "../../utils/queries";
import { useLazyQuery } from "@apollo/client";
import { makeAttack, chooseThreeEnemies} from "../../utils/helper";

const GameAction = () =>{
    const [state,dispatch] = useGameContext();

    const [action,setAction] = useState('choose');
    
    const [getEnemies,{loading,data}] = useLazyQuery(QUERY_ENEMIES);

    const {enemies,turnOrder,whoseTurn,currentCharacters} = state;
    useEffect(()=>{
        console.log("in Use Effect")
        if(turnOrder[whoseTurn].ai){
            const timer = setTimeout(() => {
                console.log(`${turnOrder[whoseTurn].name} has taken their turn`)
                let target = Math.floor(Math.random()*state.currentCharacters.length)
                console.log(target);
                makeAttack(turnOrder[whoseTurn].attack,currentCharacters[target],dispatch)
                dispatch({type:TAKE_TURN});
            },1000)
            return () => clearTimeout(timer);
        }
    },[state.whoseTurn])

    useEffect(() => {
        if(currentCharacters.length === 0){
            // you lose
            console.log("YOU LOSE!!!!");
        }
        if(enemies.length === 0){
            // clear the room
            // ask if you want to continue
            setAction("nextRoom");
        }
        
    }, [state.enemies.length,state.currentCharacters.length])
    
    function setLoading() {
        console.log("load enemies")
        getEnemies();
        setAction("loading");
    }
    function handelAttack(index){
        console.log(`attacking ${state.enemies[index].name} at index ${index} `)
        makeAttack(turnOrder[whoseTurn].attack,enemies[index],dispatch)
        dispatch({type:TAKE_TURN});
    }

    if(turnOrder[whoseTurn].ai){
        // take the ai's turn
        console.log("ai turn");
        
        return(
            <div>
                <h4>Please Wait while AI Makes its move</h4>
            </div>
        )
    }
    else{
        switch(action){
            case 'choose':{
                return(
                <>
                <button id="attack" onClick={()=>setAction('attack')}>Attack</button>
                <button id="skill" onClick={()=>setAction('skill')}>Skill</button>
                </>
                )
            }
            case 'attack':{
                return (
                    <> 
                    {enemies.map((enemy,index) =>(
                        <button key={index} onClick={()=>handelAttack(index)}>{enemy.name}</button>
                    ))}
                    <button onClick={()=>setAction('choose')}>Cancel</button>
                    </>
                )
            }
            case 'skill':{
                return(
                    <>
                    <button onClick={()=>setAction('choose')}>Cancel</button>
                    </>
                )
            }
            case 'nextRoom':{
                
                return(
                    <>
                        {/* go to next room */}
                        <button onClick={()=>setLoading()}>Proceed to Next Room</button>
                        {/* {go to the end game screen} */}
                        <button>Leave Dungeon</button>
                    </>
                )
            }
            case 'loading':{
                
                if(loading){
                    return(
                        <>
                        <h4>You Proceed Down the Dark Halls</h4>
                        </>
                    )
                }
                else{
                    if(data && data.enemies){
                        console.log(data);
                        //chooseThreeEnemies(enemyList,dispatch);
                        return(
                            <>
                            <h4>You Stand In Front of an Mysterious Door</h4>
                            <button onClick={()=>setAction("choose")}>Open The Door</button>
                            </>
                        )
                    }
                    return(
                        <>
                        <h4>You Proceed Down the Dark Halls</h4>
                        </>
                    )
                }
            }
        }
    }


}

export default GameAction;