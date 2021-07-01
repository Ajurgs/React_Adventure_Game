

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