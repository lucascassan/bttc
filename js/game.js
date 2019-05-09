

var imgChar = new Image();
var canvas, ctx, HEIGHT, WIDTH, frames =0, maxJump = 2, speed =10,
stateNow,
state = {
  playing  :0,
  gameOver :1
},


ground = {
  y: 0,
  a: 10,
  c: "#555",
  draw: function() {
    this.y = (HEIGHT-this.a);
    ctx.fillStyle = this.c;
    ctx.fillRect(0, this.y, WIDTH, this.a);
    }
},

block = {
  x:50,
  y:0,
  a:50,
  l:50,
  c: "#000",
  gravity: 1.5,
  speed: 0,
  forceJump:15,
  cJump:0,


  update:function(){
    this.speed += this.gravity;
    this.y += this.speed;
    if (this.y > ground.y - this.a && stateNow != state.gameOver ){
      this.y = ground.y - this.a;
      this.cJump = 0;
      this.speed = 0;
    }
  },
  draw:function(){


    ctx.drawImage(imgChar, this.x, this.y);


  },
  jump:function(){
    if (this.cJump < maxJump){
      this.speed =-this.forceJump;
      this.cJump++;
    }
  }


},

obst = {
  _obs: [],
  timeInsert: 0,

  insert: function(){

    this._obs.push({
      x: WIDTH,
      l: 30 + Math.floor(20 * Math.random()),
      a: 30 + Math.floor(120 * Math.random())
    });

    this.timeInsert = 40 + Math.floor(20 * Math.random()) ;
  },

  draw: function(){
    for (var i = 0, tam = this._obs.length; i<tam; i++) {
      var obs = this._obs[i];
      ctx.fillStyle = '#000';
      ctx.fillRect( obs.x,ground.y - obs.a, obs.l, obs.a);
    }
  },

  update: function(){
    if (this.timeInsert ==0)
    obst.insert();
    else
    this.timeInsert--;


    for (var i = 0, tam = this._obs.length; i<tam; i++) {
      var obs = this._obs[i];
      obs.x -= speed;


      if (block.x < obs.x+obs.l  && block.x+block.l >= obs.x  && block.y+block.a >= ground.y-obs.a){
        stateNow = state.gameOver;
      }  else if (obs.x <= -obs.l ){
        this._obs.splice(i,1);
        tam--;
        i--;
      }
    }
  }


};

function main(){
  var elem = document.getElementById("gb");

  HEIGHT = elem.offsetHeight; //window.innerWeight;
  WIDTH = elem.offsetWidth;//window.innerWeight;


  canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;

  ctx = canvas.getContext("2d");
  elem.appendChild(canvas);
  document.addEventListener("mousedown", click);

  imgChar.src = "00.png"

  stateNow = state.playing;
  run();
}
function click(event){
  block.jump();
}
function run(){
  update();
  draw();
  window.requestAnimationFrame(run);






}
function update(){
  frames++;
  block.update();
  obst.update();

  //  if (stateNow == state.gameOver)
  //  alert("You Lose");

}
function draw(){
  ctx.fillStyle = "#50beff";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  obst.draw();
  ground.draw();

  block.draw();
  //  alert(HEIGHT);
  //  obst.insert();
}


function play()
{
  document.getElementById("gb").innerHTML = "";
  main();
  randomText();
}
