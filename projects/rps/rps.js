function calculate(p){
    var o=(Math.floor((Math.random()*3)));
    document.getElementById("opponent").style.backgroundImage=convert(o);
    var calc=p-o;
    if(calc===2)calc=-1;
    if(calc===-2)calc=1;
    check(calc);
}
function result(t,color){
    var result=document.getElementById("results");
    result.style.color=color;
    result.textContent=t;
}
function check(calc){
    switch(calc){
        case -1:result("You have lost",'red');break;
        case 0:result("It was a tie",'grey');break;
        case 1:result("You have won",'green');break;
    }
}
function convert(rnd){
    switch(rnd){
        case 0:return"url(rocks.png)";
        case 1:return"url(paper.png)";
        case 2:return"url(scissors.png)";
    }
} 