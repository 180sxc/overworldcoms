let htmlLoaded = false;
window.addEventListener('load', function() {
  htmlLoaded = true;
  startUp();
  resizeCanvas();
  console.log("html loaded")
})
function startUp () {
  var canvas = document.getElementById("canvas")
  const ctx = canvas.getContext('2d');
  spawnParticles ()
  animate ();
}
window.addEventListener('resize', resizeCanvas);
function resizeCanvas () {
  console.log("resized")
  let screenWidth = window.innerWidth;
  let screenHeight = window.innerHeight;
  let canvas = document.getElementById("canvas");
  canvas.style.height = screenHeight + "px";
  canvas.style.width = screenWidth + "px";
}


class Particles {
  constructor (x, y, ctx, dir) {
    this.x = x;
    this.y = y;
    this.size = 5;
    this.ctx = ctx;
    this.dir = dir;
    this.mode = "out"
  }
  spawn () {
    this.ctx.fillStyle = "rgba(255,255,255,0.8)";
    this.ctx.beginPath();
    this.ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    this.ctx.fill();
  }
  update () {
    function ra(arr) {
      const randomIndex = Math.floor(Math.random() * arr.length);
      return arr[randomIndex];
    }
    let s1 = ra([1,2,3,4,5]), s2 = ra([1,2,3,4,5]), s3 = ra([1,2,3,4,5]), s4 = ra([1,2,3,4,5]);
    this.x += this.dir[0] == '+' ? s1 : -s2;
    this.y += this.dir[1] == '+' ? s3 : -s4;
    if(this.mode == "bounce"){
      if (this.x < 0 || this.x > this.ctx.canvas.width) {
        this.dir[0] = this.dir[0] === '+' ? '-' : '+';
      }
      if (this.y < 0 || this.y > this.ctx.canvas.height) {
        this.dir[1] = this.dir[1] === '+' ? '-' : '+';
      }
    } else {
    }
  }
}
var particleCount = 500;
var particles = [];

function spawnParticles () {
  var canvas = document.getElementById("canvas");
  const ctx = canvas.getContext('2d');
  for(let i = 0; i < particleCount; i++){
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height;
    const dir = [(Math.random() < 0.5?"+":"-"), (Math.random() < 0.5?"+":"-")]
    particles.push(new Particles(x, y, ctx, dir));
  }
}

function animate () {
  var canvas = document.getElementById("canvas")
  const ctx = canvas.getContext('2d');
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(particle => {
    particle.update();
    particle.spawn();
  });
  requestAnimationFrame(animate);
}
