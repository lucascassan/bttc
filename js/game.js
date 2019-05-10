var imgChar = new Image();
var jumpSound = new Audio('src/music/jump.wav');
jumpSound.volume = 0.5;
var deathSound = new Audio('src/music/death.wav');
deathSound.volume = 0.5;
var music;


var canvas, ctx, HEIGHT, WIDTH, frames =0, maxJump = 2, speed =5, dead = 0,
stateNow,state = {  playing  :0,  gameOver :1 },
charNow, chars = {  cassan : '00',  yoshi : '01'},

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

    loadcharSprite();
  },
  draw:function(){
    ctx.clearRect(0, 0, WIDTH,HEIGHT);
    ctx.drawImage(imgChar, this.x, this.y);

  },
  jump:function(){
    if (this.cJump < maxJump && dead == 0){
      this.speed =-this.forceJump;
      this.cJump++;
      jumpSound.play();
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
  loadcharSprite();
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
function loadcharSprite(){
  if (stateNow != state.gameOver){
    imgChar.src = 'src/char/'+charNow+'/idle.png';
  }
  else{
    imgChar.src = 'src/char/'+charNow+'/dead.png';

    if (dead==0){
      block.y = block.y-10;
      dead = 1;
      block.gravity=0.1;
      deathSound.play();
      music.pause();
    }
  }
}
function update(){
  frames++;
  block.update();
  obst.update();
}
function draw(){
  ctx.fillStyle = "transparent";
  ctx.fillRect(0,0,WIDTH,HEIGHT);
  obst.draw();
  ground.draw();
  block.draw();
}


function play(character)
{
  charNow = character;
  document.getElementById("gb").innerHTML = "";

 music = new Audio('src/music/'+character+'.mp3');
 music.volume = 1;
 music.play();



  main();
  randomText();
}
