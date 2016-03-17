var canvas = document.getElementById("gameCanvas");
var ctx = canvas.getContext("2d");

var hero = new Character(20,20);


function renderLoop() {
    hero.update();
    hero.draw();
}
setInterval(renderLoop, 10);

window.addEventListener('keydown',this.handleKeyDown,false);
window.addEventListener('keyup',this.handleKeyUp,false);

var keys=[];
const MOVE_COEF=20;
const SLIDE_COEF=2;

function handleKeyDown(e) {
    keys[e.keyCode] = true;
}

function handleKeyUp(e) {
    keys[e.keyCode] = false;
}

function control() {
    var dx= 0,dy= 0;
    if(keys[37])
        dx = -MOVE_COEF;
    if(keys[38])
        dy = -MOVE_COEF
    if(keys[39])
        dx = MOVE_COEF
    if(keys[40])
        dy = MOVE_COEF;
    hero.move(dx,dy);
}

function Character(x,y) {
    this.x=x;
    this.y=y;
    this.dx=0;
    this.dy=0;
    this.dx_old=0;
    this.dy_old=0;
    this.maxSpeed=100;
    this.image=new Image();
    this.image.src = "character.png";

    this.move = function(dx,dy) {

        this.dx+=(Math.abs(this.dx+dx)<this.maxSpeed)?dx:0;
        this.dy+=(Math.abs(this.dy+dy)<this.maxSpeed)?dy:0;
    }

    this.update = function() {
        this.x+=this.dx;
        this.y+=this.dy;
        this.dx_old=this.dx;
        this.dy_old=this.dy;
        this.dx=this.slowDown(this.dx,this.dx_old);
        this.dy=this.slowDown(this.dy,this.dy_old);
        control();
    }

    this.draw = function() {
        var facex=(this.dx<0)?64:0;
        var facey=(this.dy>=0)?0:64;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        ctx.drawImage(this.image,facex,facey,64,64,this.x/100,this.y/100,64,64)
    }

    this.slowDown = function(s,old_s) {
        if(!s) return s;
        if(s<0 && s>=old_s) {
            s+=SLIDE_COEF;
            return s
        }
        else if(s>0 && s<=old_s) {
            s-=SLIDE_COEF;
            return s
        }
        return s
    }
}