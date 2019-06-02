var imgChar = new Image();
var imgEnem = new Image();
var imgHeart = new Image();
var imgEmptyHeart = new Image(); imgEmptyHeart.src = "src/misc/EmptyHeart.png";
var jumpSound = new Audio('src/music/jump.wav');
var deathSound = new Audio('src/music/death.mp3');
var hitSound = new Audio('src/music/hit.wav');
jumpSound.volume = 0.5;
deathSound.volume = 0.5;
var music, enemSound, canvas, ctx, ctxSc, HEIGHT, WIDTH,
frames =0, maxJump = 2, auxEnem,
enems, intangible =0, stateNow = 1, charNow,
generalSpeed = 8, maxEnemCh = 4;

ground = {
  y: 0,
  a: 10,
  c: "#555",
  draw: function() {
    this.y = (HEIGHT-this.a);
  }
},
player = {
  x:50,
  y:0,
  a:60,
  l:40,
  gravity: 1.5,
  speed: 0,
  forceJump: 15,
  cJump:0,
  update:function(){
    this.speed += this.gravity;
    this.y += this.speed;
    if (this.y > (ground.y - this.a) && stateNow != 0 ){
      this.y = ground.y - this.a;
      if (this.cJump >0){
        this.cJump = 0;
        this.speed = 0;
      }
    }
  },
  draw:function(){
    ctx.drawImage(imgChar, this.x, this.y);
  },
  jump:function(){
    if (this.cJump < maxJump && stateNow == 1){
      jumpSound.play();
      this.speed =-this.forceJump;
      this.cJump++;
    }
  }

},
obst = {
  _obs: [],
  timeInsert: 100,
  insert: function(Al, Aa, Aimg, Asound){
    this._obs.push({
      x: WIDTH,
      l: Al,
      a: Aa,
      img: Aimg,
    });
    this.timeInsert = 100 + Math.floor(40 * Math.random()) ;
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

    if (this.timeInsert == 0){
      auxEnem = Math.floor(Math.random() * (+maxEnemCh )) ;
      console.warn(auxEnem);
      obst.insert(enems[auxEnem][0], //largura
        enems[auxEnem][1], //altura
        enems[auxEnem][2], //img
        enems[auxEnem][3] //sound
      );
    }
    else{
      this.timeInsert--;
    }

    for (var i = 0, tam = this._obs.length; i<tam; i++) {
      var obs = this._obs[i];
      obs.x -= generalSpeed;

      if (player.x < obs.x+obs.l
        && player.x+player.l >= obs.x
        && player.y+player.a >= ground.y-obs.a
        && intangible == 0) {
          health.set(-1);
        } else if (obs.x <= -obs.l ){
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
      ctxSc.textAlign = "right";
      ctxSc.font      = "18px 'Press Start 2P'";
      ctxSc.fillStyle = "#fff";
      ctxSc.fillText(this._value, WIDTH-30 , 30);
    }
  },
  health = {
    life : 3,
    draw : function(){
      for (var i = 0; i < 3; i++) {

        if (this.life >= i+1){
          ctxSc.drawImage(imgHeart, 30 + (32*i), 5 );
        }
        // else{
        //   ctxSc.drawImage(imgEmptyHeart, 30+ (32*i), 5 );
        // }
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
        hitSound.play();
      }
    }
  };
  function main(){
    loadFonts();
    loadEnems();

    var elem = document.getElementById("gb");
    var elemSc = document.getElementById("IDscore");

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
    loadcharSprite();
    ground.draw();
    run();
  }
  function click(event){
    player.jump();
  }
  function run(){
    update();
    draw();
    window.requestAnimationFrame(run);
  }
  function update(){
    frames++;
    player.update();
    obst.update();
    score.update();
    health.update();
  }
  function draw(){
    ctx.clearRect(0, 0, WIDTH,HEIGHT);
    ctxSc.clearRect(0,0, WIDTH, H_SCORE);
    obst.draw();
    player.draw();
    score.draw();
    health.draw();
    obst.draw();
    // TESTANDO DESENHAR DUAS VEZES PRA TER CTZ
  }
  function play(character){
    charNow = character;
    document.getElementById("gb").innerHTML = "";
    music = new Audio('src/music/'+character+'.mp3');
    imgHeart.src = "src/misc/h"+character+".png";
    music.play();
    main();
    changeCredits();
  }
  function gameOver(){
    if (stateNow == 1){
      stateNow = 0;
      loadcharSprite();
      //player.y = player.y-10;
      deathSound.play();
      music.pause();
    }
  }
  function loadEnems(){
    enems = new Array(
      [36,30, 'src/enem/00.png', 'src/enem/00.wav'],
      [40,27, 'src/enem/01.png', 'src/enem/01.wav'],
      [40,29, 'src/enem/02.png', 'src/enem/02.wav'],
      [40,29, 'src/enem/03.png', 'src/enem/03.mp3'],
      [42,38, 'src/enem/04.png', 'src/enem/04.wav']
    );
  }
  function loadFonts(){
    WebFont.load({
      google: {
        families: ['Press Start 2P']
      }
    });
    console.info("Font Load");
  }
  function loadcharSprite(){
    imgChar.src = 'src/char/'+charNow+stateNow+'.png';
  }
