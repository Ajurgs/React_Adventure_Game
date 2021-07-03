
import { REMOVE_HERO,REMOVE_ENEMY,REMOVE_FROM_TURN,} from "./actions";


export function getTurnOrder(heros,enemies) {
    let both = heros.concat(enemies);
    both.sort( (a,b) => b.speed-a.speed );
    console.log(both);
    return both;
}

export function nextTurn(current,turnOrder) {
    current +=1;
    if(current >= turnOrder.length){
        current = 0;
    }
    return current;
}



export function makeAttack(damage,target,dispatch){
    if(target){
        console.log(target);
        target.health -= damage
        if(target.health <= 0){
            if(target.ai){
                dispatch({type:REMOVE_ENEMY,payload:target._id});
            }else{
                dispatch({type:REMOVE_HERO,payload:target._id});
            }
            dispatch({type:REMOVE_FROM_TURN,payload:target._id});
            
        }
    }
}



export function chooseThreeEnemies(enemies){
    const firstEnemy = enemies[Math.floor(Math.random()*enemies.length)];
    const secondEnemy = enemies[Math.floor(Math.random()*enemies.length)];
    const thirdEnemy = enemies[Math.floor(Math.random()*enemies.length)];
    const newEnemies = [{...firstEnemy,_id:firstEnemy._id+"-1",ai:true},{...secondEnemy,_id:secondEnemy._id+"-2",ai:true},{...thirdEnemy,_id:thirdEnemy._id+"-3",ai:true}];
    console.log(newEnemies);
    return(newEnemies);
}



export function convertToObjects(characters){
    return characters.map((character,index)=> JSON.parse(character))
}