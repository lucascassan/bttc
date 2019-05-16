
//
// document.addEventListener('DOMContentLoaded', function () {
//     alert('Todo conteúdo do arquivo foi carregado pelo navegador');
// });


var imgChar = new Image();
var imgEnem = new Image();
var imgHeart = new Image();
imgHeart.src = "src/misc/Heart.png";
var imgEmptyHeart = new Image();
imgEmptyHeart.src = "src/misc/EmptyHeart.png";
var imgBox = new Image();
imgBox.src = "src/misc/box.png";


var jumpSound = new Audio('src/music/jump.wav');
var deathSound = new Audio('src/music/death.mp3');
jumpSound.volume = 0.5;

deathSound.volume = 0.5;
var music, enemSound;
var canvas, ctx, ctxSc, HEIGHT, WIDTH, frames =0, maxJump = 2, dead = 0, aa = 1, auxEnem, score, enems, intangible =0,
stateNow = 1, charNow,
ground = {
  y: 0,
  a: 10,
  c: "#555",
  draw: function() {
    this.y = (HEIGHT-this.a);
  }
},
block = {
  x:50,
  y:0,
  a:60,
  l:40,
  c: "#000",
  gravity: 1.5,
  speed: 0,
  forceJump:15,
  cJump:0,
  update:function(){
    this.speed += this.gravity;
    this.y += this.speed;
    if (this.y > ground.y - this.a && stateNow != 0 ){
      this.y = ground.y - this.a;
      this.cJump = 0;
      this.speed = 0;
    }
  },
  draw:function(){
    ctx.drawImage(imgChar, this.x, this.y);
  },
  jump:function(){
    if (this.cJump < maxJump && dead == 0){
      jumpSound.play();
      this.speed =-this.forceJump;
      this.cJump++;
    }
  }

},
obst = {
  _obs: [],
  timeInsert: 100,
  insert: function(Al, Aa, Aimg, Asound, Aspeed){
    this._obs.push({
      x: WIDTH,
      l: Al,
      a: Aa,
      img: Aimg,
      speed:Aspeed
    });
    this.timeInsert = 40 + Math.floor(200 * Math.random()) ;
    enemSound = new Audio(Asound);
    enemSound.play();
  },
  draw: function(){
    for (var i = 0, tam = this._obs.length; i<tam; i++) {
      var obs = this._obs[i];
      imgEnem.src = obs.img;
      ctx.drawImage(imgEnem, obs.x, ground.y - obs.a);
    }
  },
  update: function(){

    if (this.timeInsert ==0){
      auxEnem = Math.floor(enems.length * Math.random()) ;
      obst.insert(enems[auxEnem][0], enems[auxEnem][1], enems[auxEnem][2], enems[auxEnem][3], enems[auxEnem][4]);
    }
    else{
      this.timeInsert--;
    }

    for (var i = 0, tam = this._obs.length; i<tam; i++) {
      var obs = this._obs[i];
      obs.x -= obs.speed;


      if (block.x < obs.x+obs.l  && block.x+block.l >= obs.x  && block.y+block.a >= ground.y-obs.a && intangible == 0){
        health.set(-1);
      }  else if (obs.x <= -obs.l ){
        this._obs.splice(i,1);
        tam--;
        i--;
      }
    }
  }
},

score = {
  _value : 0,
  update : function(){
    if (stateNow == 1)
    this._value = Math.floor(frames/10);
  },
  draw : function(){
    ctxSc.textAlign = "center";
    ctxSc.font      = "27px 'Press Start 2P'";
    ctxSc.fillStyle = "white";
    ctxSc.strokeStyle = 'black';
    ctxSc.drawImage( imgBox, WIDTH/2-82, 20);
    ctxSc.fillText(this._value, WIDTH/2 , 60);
  }
},

health = {
  life : 3,
  draw : function(){
    for (var i = 0; i < 3; i++) {

      if (this.life >= i+1){
        ctxSc.drawImage(imgHeart, 5 + (32*i), 30 );
      }
      else{
        ctxSc.drawImage(imgEmptyHeart, 5+ (32*i), 30 );
      }
    }
  },
  update: function(){
    if (intangible > 0)
    intangible--;
  },
  set : function(value){
    this.life = this.life + value;

    if (this.life == 0){
      gameOver()
    }else{
      intangible = 50;
    }
  }








};

function main(){
  loadFonts();
  var elem = document.getElementById("gb");
  var elemSc = document.getElementById("score");

  HEIGHT = elem.offsetHeight;
  WIDTH = elem.offsetWidth;
  H_SCORE = 60;

  canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext("2d");
  elem.appendChild(canvas);

  
  canvasSc = document.createElement("canvas");
  canvasSc.width = WIDTH;
  canvasSc.height = H_SCORE;
  ctxSc = canvasSc.getContext("2d");
  elemSc.appendChild(canvasSc);


  document.addEventListener("mousedown", click);
  document.addEventListener("spacebar", click);
  document.body.onkeyup = function(e){ if(e.keyCode == 32){ block.jump();}}
  loadcharSprite();
  popEnems();
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
  imgChar.src = 'src/char/'+charNow+stateNow+'.png';
}
function update(){
  frames++;
  block.update();
  obst.update();
  score.update();
  health.update();
}
function draw(){
  ctx.clearRect(0, 0, WIDTH,HEIGHT);
  obst.draw();
  ground.draw();
  block.draw();
  score.draw();
  health.draw();
}
function play(character){
  charNow = character;
  document.getElementById("gb").innerHTML = "";
  music = new Audio('src/music/'+character+'.mp3');
  music.play();
  main();
  randomText();
}
function popEnems()
{
  enems = new Array(
    [50,30, 'src/enem/00.png', 'src/enem/00.wav', 5],
    [38,25, 'src/enem/01.png', 'src/enem/01.wav', 3],
  );
}
function gameOver(){
  if (stateNow == 1){
    stateNow = 0;
    loadcharSprite();
    block.y = block.y-10;
    deathSound.play();
    music.pause();
  }
}

function loadFonts(){
  WebFont.load({
    google: {
      families: ['Press Start 2P']
    }
  });
}
