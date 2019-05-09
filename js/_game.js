


var canvas, ctx, HEIGHT, WIDTH, frames =0, maxJump = 2,

ground = {
  y: 0,
  a: 10,
  c: "#555",
  draw: function() {
    this.y = (HEIGHT-this.a);
    ctx.fillStyle = this.c;
    ctx.fillRect(0, this.y, WIDTH, this.a);

    //ctx.fillRect(0, this.y, WIDTH, this.a);
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
    if (this.y > ground.y - this.a){
      this.y = ground.y - this.a;
      this.cJump = 0;
    }
  },
  draw:function(){
    ctx.fillStyle = this.c;
    ctx.fillRect(this.x,this.y,this.a,this.l);
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


  insert: function(){
    this._obs.push({
      x: 0,
      l: 30 + Math.floor(20 * Math.random()),
      a: 30 + Math.floor(120 * Math.random())
    });
  },

  draw: function(){
    for (var i = 0, tam = this._obs.length; i<tam; i++) {
      var obs = this._obs[i];
      ctx.fillStyle = '#000';
      ctx.fillRect( obs.x,ground.y - obs.a, obs.l, obs.a);
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
  //document.body.appendChild(canvas);
  elem.appendChild(canvas);
  document.addEventListener("mousedown", click);

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
  //  obst.update();
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
