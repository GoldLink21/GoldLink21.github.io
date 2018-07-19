function rollDie(){return Math.floor((Math.random()*6)+1)}
function rollDice(){return rollDie()+rollDie();}
function roll(rolls){
    var count=[0,0,0,0,0,0,0,0,0,0,0];
    for(let i=0;i<rolls;i++) count[rollDice()-2]++;   
    for(let i=2;i<13;i++) element(i,count[i-2],rolls);
    return count;
}
function element(n,num,rolls){
    if(document.getElementById('b'+n)!==null)document.getElementById('b'+n).style.height=((num/rolls)*300)+'px';
}
document.getElementById('rollButton').onclick = function(){
    var output=document.getElementById('output');
    var rolls=roll(parseInt(document.getElementById('input').value));
    output.textContent='Rolls: ';
    for(let i=0;i<rolls.length;i++)
        i!==rolls.length-1?output.textContent+=(i+2+': '+rolls[i]+', '):output.textContent+=(i+2+': '+rolls[i]);
}