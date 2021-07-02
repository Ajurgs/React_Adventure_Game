
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



export function chooseThreeEnemies(enemies,dispatch){
    console.log(enemies)
    const firstEnemy = enemies[Math.floor(Math.random()*enemies.length)];
    const secondEnemy = enemies[Math.floor(Math.random()*enemies.length)];
    const thirdEnemy = enemies[Math.floor(Math.random()*enemies.length)];
    const newEnemies = [{...firstEnemy,ai:true},{...secondEnemy,ai:true},{...thirdEnemy,ai:true}];
    console.log(newEnemies);
    return(newEnemies);
}
