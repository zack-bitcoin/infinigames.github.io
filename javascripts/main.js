var c=document.getElementById("myCanvas");
var ctx=c.getContext("2d");
var cursor=document.getElementById('cursor')
var tiles={
    'yellow':document.getElementById('yellow'),
    'blue':document.getElementById('blue'),
    'red':document.getElementById('red'),
    'black':document.getElementById('black'),
    'green':document.getElementById('green')
}
var character={
    'left':document.getElementById('left'),
    'right':document.getElementById('right'),
    'up':document.getElementById('up'),
    'down':document.getElementById('down'),
}
var block_types={
    0:'yellow',
    1:'blue',
    2:'red',
    3:'black',
    4:'green'
}
var Keys = {
32:false,
37:false,
38:false,
39:false,
40:false,
88:false,
90:false
}
//function clone(o){JSON.parse(JSON.stringify(o));}
var Keys_responded = {
32:false,
37:false,
38:false,
39:false,
40:false,
88:false,
90:false
}
function handle_key(num, response){
    //so each time you press the button only gets handled once.
    if(Keys[num]){
	if(!(Keys_responded[num])){
	    Keys_responded[num]=true;
	    response();
	}
    }else{
	Keys_responded[num]=false;
    }
}
var size=20;
function zoom_in(DB){
    handle_key(90, function(){
	if(DB['size']<150){
	    DB['size']=Math.floor(DB['size']*1.1);
	}
    });
}
function zoom_out(DB){
    handle_key(88, function(){
	if(DB['size']>20){
	    DB['size']=Math.floor(DB['size']*0.9);
	}
    });
}
function spacebar(board){
    handle_key(32, function(){
    });
}
function right_arrow(board){
    handle_key(39, function(){
	board.direction="right";
	if (board.p[0]<size){
	    board.p[0]+=1;
	}
    });
}
function up_arrow(board){
    handle_key(38, function(){
	board.direction="up";
	if(board.p[1]>0){
	    board.p[1]-=1;
	}
    });
}
function left_arrow(board){
    handle_key(37, function(){
	board.direction="left";
	if(board.p[0]>0){
	    board.p[0]-=1;
	}
    });
}
function down_arrow(board){
    handle_key(40, function(){
	board.direction="down";
	if(board.p[1]<size){
	    board.p[1]+=1;
	}
    });
}
var movement=[spacebar, right_arrow, up_arrow, left_arrow, down_arrow]

document.addEventListener('keyup', function(event) {Keys[event.keyCode]=false;}, false)
document.addEventListener('keydown', function(event) {
//console.log('pressed key: ' +event.keyCode);
Keys[event.keyCode]=true;}, false)

DB={p:[0,0],
    img:tiles['red'],
    direction:"right",
    size:100}

function draw(ctx, o){
    //console.log('o: ' +o)
    s=DB['size']
    return ctx.drawImage(o.img, s*o.p[0], s*o.p[1], s, s);}
function draw_background(ctx, DB){
    x_push=0;
    y_push=0;
    border=Math.floor((600-DB['size'])/(2*DB['size']));
    if(DB.p[0]-border<0){x_push=border-DB.p[0];}
    if(DB.p[1]-border<0){y_push=border-DB.p[1];}
    if(DB.p[0]+border>size){x_push=size-border-DB.p[0];}
    if(DB.p[1]+border>size){y_push=size-border-DB.p[1];}
    for(i=0;i<border*2+1;i++){
	for(j=0;j<border*2+1;j++){
	    x=DB.p[0]-border+i+x_push;
	    y=DB.p[1]-border+j+y_push;
	    if(x>=0 && y>=0 && x<=20 && y<=20){
		if(x%4==0 || y%4==0){
		    draw(ctx, {p:[i, j], img:tiles['blue']});
		}else{
		    draw(ctx, {p:[i, j], img:tiles['green']});
		}
	    }
	    if(x==DB.p[0] && y==DB.p[1]){
		foo=character[DB.direction];
		console.log(foo)
		draw(ctx, {p:[i, j], img:foo});
	    }
	}
    }
}
function doit(DB){
    setInterval(function(){
	ctx.clearRect(0,0,c.width,c.height);
	draw_background(ctx, DB);
	movement.map(function(f){f(DB);});
	zoom_in(DB);
	zoom_out(DB);
    },1000/15);
}
doit(DB);



