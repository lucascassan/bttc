var imgChar = new Image();
var imgEnem = new Image();
var jumpSound = new Audio('src/music/jump.wav');
jumpSound.volume = 0.5;
var deathSound = new Audio('src/music/death.mp3');
deathSound.volume = 0.5;
var music;
var enems;
var enemSound;


var canvas, ctx, HEIGHT, WIDTH, frames =0, maxJump = 2, dead = 0, aa = 1, auxEnem,
stateNow,state = {  playing  :0,  gameOver :1 },
charNow, chars = {  cassan : '00',  yoshi : '01'},



ground = {
  y: 0,
  a: 10,
  c: "#555",
  draw: function() {
    this.y = (HEIGHT-this.a);
    //  ctx.fillStyle = this.c;
    //  ctx.fillRect(0, this.y, WIDTH, this.a);
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
    if (this.y > ground.y - this.a && stateNow != state.gameOver ){
      this.y = ground.y - this.a;
      this.cJump = 0;
      this.speed = 0;
    }

    loadcharSprite();
  },
  draw:function(){

    ctx.drawImage(imgChar, this.x, this.y);
    //ctx.clearRect(0, 0, WIDTH,HEIGHT);
  },
  jump:function(){
    if (this.cJump < maxJump && dead == 0){
      this.speed =-this.forceJump;
      this.cJump++;
    }
  }


},
obst = {
  _obs: [],
  timeInsert: 0,

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
      obst.insert(enems[auxEnem][0],
        enems[auxEnem][1],
        enems[auxEnem][2],
        enems[auxEnem][3],
        enems[auxEnem][4]);
      }
      else
      this.timeInsert--;


      for (var i = 0, tam = this._obs.length; i<tam; i++) {
        var obs = this._obs[i];
        obs.x -= obs.speed;


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
    document.addEventListener("spacebar", click);
    document.body.onkeyup = function(e){
      if(e.keyCode == 32){
        block.jump();
      }
    }
    loadcharSprite();
    stateNow = state.playing;
    addEnems();
    run();
  }
  function click(event){
    jumpSound.play();
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
    ctx.clearRect(0, 0, WIDTH,HEIGHT);
    obst.draw();
    ground.draw();
    block.draw();
  }
  function play(character){
    charNow = character;
    document.getElementById("gb").innerHTML = "";
    music = new Audio('src/music/'+character+'.mp3');
    music.volume = 1;
    music.play();
    main();
    randomText();
  }

  function addEnems()
  {
    enems = new Array(
      [50,30, 'src/enem/00.png', 'src/enem/00.wav', 5],
      [45,25, 'src/enem/01.png', 'src/enem/01.wav', 3],
    );
  }
