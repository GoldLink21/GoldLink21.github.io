var curFloor=0,board,offset={
    x:0,
    y:0
},postInit=false,keys=[];
const dir={
    UP:'up',
    DOWN:'down',
    LEFT:'left',
    RIGHT:'right'
},tiles={
    SIZE:35,
    WALL:'wall',
    PATH:'path',
    LAVA:'lava',
    LOCK:'lock',
    START:'start',
    END:'end'
}
function loadFloor(floor){
    removeKeys();
    if(curFloor!==floor)curFloor=floor;
    switch(floor){
        case 0:board=floorZero();break;
        case 1:board=floorOne();break;
        case 2:board=floorTwo();break;
        case 3:
        case 4:
        case 5:board=floorFive();curFloor=5;break;
        case 6:board=floorSix();break;
        default:board=setFloorAs(tiles.PATH);
    }if(postInit){resetPlayerPosition();updateBoard();}
}

function nextFloor(){loadFloor(++curFloor);}

function floorZero(){
    let temp=setFloorAs(tiles.WALL);
    temp[1][7]=tiles.END;temp[7][1]=tiles.START;
    for(var i=1;i<4;i++)
        temp[6][i]=tiles.PATH;
    for(var i=4;i<6;i++)
        temp[i][3]=tiles.PATH;
    for(var i=3;i<6;i++)
        temp[4][i]=tiles.PATH;
    for(var i=2;i<5;i++)
        temp[i][5]=tiles.PATH;
    for(var i=5;i<8;i++)
        temp[2][i]=tiles.PATH;
    temp[5][1]=tiles.WALL
    temp[5][2]=tiles.LAVA
    temp[5][4]=tiles.LAVA
    temp[3][4]=tiles.LAVA
    temp[3][6]=tiles.LAVA
    return temp;
}
function floorOne(){
    let temp=setFloorAs(tiles.WALL);
    for(let i=1;i<8;i++){
        temp[i][1]=tiles.PATH;
        temp[i][3]=tiles.PATH;
        temp[i][5]=tiles.PATH;
        temp[i][7]=tiles.PATH;
    }
    for(let i=2;i<7;i+=4)
        temp[7][i]=tiles.PATH;
    temp[1][4]=tiles.PATH;
    temp[7][4]=tiles.LAVA;
    temp[1][1]=tiles.START;
    temp[1][7]=tiles.END;
    temp[6][2]=tiles.LAVA
    temp[6][6]=tiles.LAVA
    temp[2][4]=tiles.LAVA
    return temp;
}
function floorTwo(){
    let temp=setFloorAs(tiles.WALL);
    for(var i=2;i<7;i++)
        temp[1][i]=tiles.PATH;
    temp[1][4]=tiles.LAVA;
    for(var i=3;i<6;i++)
        temp[2][i]=tiles.PATH;
    temp[1][1]=tiles.START;
    temp[1][7]=tiles.END;
    for(var i=2;i<8;i++)
        temp[i][4]=tiles.PATH;
    temp[1][6]=tiles.LOCK;
    temp[3][3]=tiles.LAVA;
    temp[3][5]=tiles.LAVA;
    addKey(4,7);
    return temp;
}
function floorFive(){
    temp=border(tiles.PATH,tiles.LAVA);
    temp[6][7]=tiles.LOCK;
    temp[7][6]=tiles.LOCK;
    addKey(7,1);addKey(1,7);
    temp[2][2]=tiles.START;
    temp[7][7]=tiles.END;
    return temp;
}
function floorSix(){
    var temp=setFloorAs(tiles.WALL);
    for(var i=1;i<8;i++){
        temp[i][4]=tiles.PATH;
        temp[4][i]=tiles.PATH;
    }for(var i=5;i<8;i++)
        temp[4][i]=tiles.LOCK;
    temp[4][4]=tiles.START;
    temp[4][8]=tiles.END;
    addKey(4,1);
    addKey(4,7);
    addKey(1,4)
    return temp;
}
function border(floorType,borderType){
    var temp=setFloorAs(floorType);
    for(var i=0;i<9;i++){
        temp[i][0]=borderType;
        temp[0][i]=borderType;
        temp[8][i]=borderType;
        temp[i][8]=borderType;
    }
    return temp;
}
function setFloorAs(type){
    let temp=[];
    for(let i=0;i<9;i++){
        temp[i]=[];
        for(let j=0;j<9;j++)
            temp[i][j]=type; 
    }
    return temp;
}
function updateBoard(){
    for(var i=0;i<board.length;i++)
        for(var j=0;j<board[i].length;j++){
            var curEle=document.getElementById(i+','+j);
            if(!curEle.classList.contains(board[i][j]))
                curEle.className='tile '+board[i][j];
        }
}
function resetPlayerPosition(){
    for(var i=0;i<board.length;i++)
        for(var j=0;j<board[i].length;j++)
            if(board[i][j]===tiles.START){
                player.x=j*tiles.SIZE;
                player.y=i*tiles.SIZE;
                redrawPlayer();return; 
            }
}function boardInit(){
    var boardEle=document.createElement('div');
    boardEle.id='board';
    document.body.appendChild(boardEle);
    for(var i=0;i<board.length;i++){
        var curRow=document.createElement('div');
        curRow.className="row";
        for(var j=0;j<board[i].length;j++){
            var curEle=document.createElement('div');
            curEle.id=i+','+j;
            curEle.className='tile wall';
            curRow.appendChild(curEle);
        }
        boardEle.appendChild(curRow);
    }
    var p = document.createElement('div');
    p.id='player';
    document.body.appendChild(p);
    offset.x=document.getElementById('0,0').offsetLeft;
    offset.y=document.getElementById('0,0').offsetTop;
    postInit=true;
    updateBoard();
    resetPlayerPosition();
}
function isCollide(a,b){return!(((a.y+a.height)<(b.y))||(a.y>(b.y+b.height))||((a.x+a.width)<b.x)||(a.x>(b.x+b.width)));}

var player={
    x:0,
    y:0,
    animCount:0,
    animMax:3,
    dir:dir.UP,
    speed:7,
    keys:0,
    width:16,
    height:16,
    alt:false,
    canMove:{
        up:false,
        down:false,
        left:false,
        right:false
    },
    move(){
        var dx=0,dy=0;
        if(player.canMove.up) 
            dy-=1;
        if(player.canMove.down) 
            dy+=1;
        if(player.canMove.left) 
            dx-=1;
        if(player.canMove.right) 
            dx+=1;
        resetMovement();
        if(dx!==0||dy!==0)
            player.animCount++;
        if(player.animCount>player.animMax){
            player.animCount=0;
            player.alt=!player.alt;
        }
        player.x+=dx*player.speed;
        player.y+=dy*player.speed;
        if(!checkCollisions(player.x,player.y)){
            player.x-=dx*player.speed;
            player.y-=dy*player.speed;
        }
        checkKeyCollide();
        redrawPlayer();
    }
};
function resetMovement(){player.canMove.up=false;player.canMove.down=false;player.canMove.left=false;player.canMove.right=false;}

function roundedPoints(){
    var x=player.x,y=player.y,size=player.width,tS=tiles.SIZE;
    var points=[[Math.floor(x/tS),Math.floor(y/tS)],[Math.floor((x+size)/tS),Math.floor(y/tS)],
        [Math.floor((x+size)/tS),Math.floor((y+size)/tS)],[Math.floor(x/tS),Math.floor((y+size)/tS)]
    ];
    return points;
}
function checkKeyCollide(){
    var i=0;
    while(i<keys.length){
        if(isCollide(player,keys[i])){
            var keyEle=document.getElementById('k'+Math.floor(keys[i].x/tiles.SIZE)+','+Math.floor(keys[i].y/tiles.SIZE));
            document.body.removeChild(keyEle);
            player.keys++;
            keys.splice(i,1);
            return true;
        }
        else i++
    }return false;
}
function addKey(x,y){
    var thisKey={
        width:10,
        height:10,
        x:x*tiles.SIZE+tiles.SIZE/3,
        y:y*tiles.SIZE+tiles.SIZE/3
    }
    keys.push(thisKey);
    var keyEle=document.createElement('div');
    keyEle.className='key';
    keyEle.id='k'+x+','+y;
    document.body.appendChild(keyEle);
    keyEle.style.top=((thisKey.y)+offset.y)+'px';
    keyEle.style.left=((thisKey.x)+offset.x)+'px';
}
function removeKeys(){
    Array.from(document.getElementsByClassName('key')).forEach(element=>{
        document.body.removeChild(element);
    });
    player.keys=0;
}
function checkTile(y,x){
    if(x<0||y<0||x>8||y>8)
        return false;
    if(board[x][y]===tiles.PATH||board[x][y]===tiles.START)
        return true;
    if(board[x][y]===tiles.END)
        nextFloor();
    if(board[x][y]===tiles.LOCK){
        if(player.keys>0){
            player.keys--;
            board[x][y]=tiles.PATH;
            updateBoard();
            return true;
        }
    }if(board[x][y]===tiles.LAVA)
        resetPlayerPosition();
}
function checkCollisions(){
    var pPoints=roundedPoints();
    for(var i=0;i<pPoints.length;i++){
        var x=pPoints[i][0];
        var y=pPoints[i][1];
        if(!checkTile(x,y)) 
            return false;
    }
    return true;
}
document.addEventListener('keydown',(event)=>{
    player.canMove.up=false;
    player.canMove.down=false;
    player.canMove.left=false;
    player.canMove.right=false;
    switch(event.key){
        case'ArrowUp':
            player.dir=dir.UP;
            player.canMove.up=true;
            break;
        case'ArrowDown':
            player.dir=dir.DOWN;
            player.canMove.down=true;
            break;
        case'ArrowRight':
            player.dir=dir.RIGHT;
            player.canMove.right=true;
            break;
        case'ArrowLeft':
            player.dir=dir.LEFT;
            player.canMove.left=true;
            break;
    }
});
function playerBackImg(n){document.getElementById('player').style.backgroundPositionX=player.width*n+'px';}
function playerImg(n1,n2){if(player.alt)playerBackImg(n2);else playerBackImg(n1)}

function redrawPlayer(){
    switch(player.dir){
        case dir.UP:playerImg(3,4);break;
        case dir.DOWN:playerImg(5,6);break;
        case dir.LEFT:playerImg(0,7);break;
        case dir.RIGHT:playerImg(2,9);break;
    }
    var p = document.getElementById('player');
    p.style.top = player.y+offset.y+'px';
    p.style.left = player.x+offset.x+'px';
}
loadFloor(0);
boardInit();
var playerMove=setInterval(player.move,60);