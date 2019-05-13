
//
// document.addEventListener('DOMContentLoaded', function () {
//     alert('Todo conteúdo do arquivo foi carregado pelo navegador');
// });

var imgChar = new Image();
var imgEnem = new Image();
var jumpSound = new Audio('src/music/jump.wav');
jumpSound.volume = 0.5;
var deathSound = new Audio('src/music/death.mp3');
deathSound.volume = 0.5;
var music;
var enems;
var enemSound;
var canvas, ctx, HEIGHT, WIDTH, frames =0, maxJump = 2, dead = 0, aa = 1, auxEnem, score,
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


      if (block.x < obs.x+obs.l  && block.x+block.l >= obs.x  && block.y+block.a >= ground.y-obs.a){
        gameOver();
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
    ctx.font = "40px" + " "+ "Press Start 2P";

    ctx.fillStyle = "white";

    ctx.textAlign = "right";
    ctx.fillText(this._value, WIDTH, 40);
  }
};


function main(){
  loadFont();
  var elem = document.getElementById("gb");
  HEIGHT = elem.offsetHeight;
  WIDTH = elem.offsetWidth;
  canvas = document.createElement("canvas");
  canvas.width = WIDTH;
  canvas.height = HEIGHT;
  ctx = canvas.getContext("2d");
  elem.appendChild(canvas);
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
}
function draw(){
  ctx.clearRect(0, 0, WIDTH,HEIGHT);
  obst.draw();
  ground.draw();
  block.draw();
  score.draw();
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

function loadFont()
{
  WebFontConfig = {
    custom: { families: ['Press Start 2P'],
              urls: [ 'css/fonts.css']},
    active: function() {
      /* code to execute once all font families are loaded */
      console.log(" I sure hope my font is loaded now. ");
    }
  };
  (function() {
    var wf = document.createElement('script');
    wf.src = ('https:' == document.location.protocol ? 'https' : 'http') +
        '://ajax.googleapis.com/ajax/libs/webfont/1/webfont.js';
    wf.type = 'text/javascript';
    wf.async = 'true';
    var s = document.getElementsByTagName('script')[0];
    s.parentNode.insertBefore(wf, s);
  })();
}
