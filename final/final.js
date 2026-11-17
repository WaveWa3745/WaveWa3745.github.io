const colorList = ['blue', 'red', 'yellow', 'rgb(200,56,200)']
const boids = []
const boids2 = []
//turn this back to 120!!!
const NumBoids = 120
let timer = 15

//start game screen
function startGame(){
  background('black');
  
}

//loose game screeb
function endGameFail(){
  if (timer <= 0 && numItems > 0){
    background('rgb(234,83,83)');
   
    return;
  }
}

//win game screen
function endGameWin(){
  if (numItems <= 0){
    background('rgb(91,187,91)');
    
    return;
  }
}

//Setting up the main boids
function setup() {
  createCanvas(windowWidth, windowHeight);
  //turn back to 60
  frameRate(60);
  noStroke();
  
 //golbally calling item boids
  createItems();
  
  ellipseMode(CENTER);
  
  //Loop for colorful boids
  for(let i = 0; i < NumBoids; i++){
    const initialX = random(0, width); 
    const initialY = random(0, height);
    const radius = (140);
    const color = random(colorList);
    boids.push(new Boid(initialX, initialY, radius, color))
  }
}


//gobal draw
function draw() {
  
  background('black');
  
  //calling the timer
  timeLeft();
  
  //ending game if loss
  if (timer <= 0 && numItems > 0) {
    endGameFail();
    return;
  } 
  
  //ending game if win
  if (numItems <=0){
    endGameWin();
    return;
  }
  
  //item boids
  for (let i = 0; i < boids2.length; i++){
      boids2[i].draw();
      boids2[i].move();
    }

  //covering boids 
  for(let i = 0; i < boids.length; i++){
    boids[i].draw();
    boids[i].move();
    boids[i].notice();
  }
    
  //timer
  rect (10, 10, 85, 60);
  textSize (16);
  text ('Time Left', 19, 25)
    //time left
    textSize(30);
    text(timer, 35, 57);
  
  //score board
  textSize(16);
  rect (10, 80, 85, 60);
  text ("Items Left", 17, 95);
    //number of times left
    textSize(30);
    text (numItems, 45, 127);
}

function timeLeft(){
  //timer 
  if (frameCount % 60 === 0 && timer > 0){
    timer --;
  }
}

//Item boids
let numItems = 10

function createItems(){  
  //boid2 loop
  for (let i = 0; i < numItems; i++){
    const startX = random(0, width);
    const startY = random(0, height);
    const radius2 = 50;
    const itemColor = 'white';
    boids2.push(new Boid2(startX, startY, radius2, itemColor));
    } 
  }
  
  //new boids for items
  class Boid2 {
    constructor (startX, startY, radius2, itemColor){
      this.startX = startX;
      this.startY = startY;
      this.radius2 = radius2;
      this.itemColor = itemColor;
      
      this.dstartX = 1 * random(-1, 1);
      this.dstartY = 1 * random(-1, 1);
    }
    
    //drawing the items
    draw () {
      push();
      fill(this.itemColor);
      

      circle (this.startX, this.startY,   this.radius2);
      
      fill (this.itemColor);
      
      if (this.startX - this.radius2 <= 0){
      circle(this.startX + width, this.startY, this.radius2);
        }
    
      if(this.startX + this.radius2 >=width){
      circle(this.startX - width, this.startY, this.radius2);
        }
    
      if(this.startY - this.radius2 <=0){
      circle(this.startX, this.startY + height, this.radius2);
         }
    
      if(this.startY + this.radius2 >=height){
      circle(this.startX, this.startY - height, this.radius2);
        }
      pop();
    }
   
    
    //getting items to move
    move(){
    this.startX += this.dstartX;
    this.startY +=this.dstartY;
    
    while (this.startX < 0){
      this.startX += width;
    }
    while (this.startX >= width){
      this.startX -= width;
    }
    while (this.startY < 0){
      this.startY += height;
    }
    while (this.startY >= height){
      this.startY -=height;
    }
  }
}

//getting the items to respond 
function mousePressed(){
  for (let i = 0; i < boids2.length; i++){
    let b = boids2[i];
    let d = dist(mouseX, mouseY, b.startX, b.startY);
    
    if (d < b.radius2 / 2){
      b.itemColor = 'black';
      numItems -= 1
      console.log(numItems)
      break;
    }
  }
}

//making covering boids
class Boid {
  constructor (x, y, rad, colorList){
    this.x = x;
    this.y = y;
    this.rad = rad;
    this.colorList = colorList;
    this.noticeMouse = 100;
    
    this.dx = 1 * random(-1, 1);
    this.dy = 1 * random(-1, 1);
  }
  
  //drawing covering boids
  draw() {
    push();
    fill(this.colorList);
  
    circle(this.x, this.y, this.rad);
    
    fill(this.colorList);
    
    if (this.x - this.rad <= 0){
      circle(this.x + width, this.y, this.rad);
    }
    
    if(this.x + this.rad >=width){
      circle(this.x - width, this.y, this.rad);
    }
    
    if(this.y - this.rad <=0){
      circle(this.x, this.y + height, this.rad);
    }
    
    if(this.y + this.rad >=height){
      circle(this.x, this.y - height, this.rad);
    }
    pop();
  }
  
  //getting them to move
  move(){
    this.x += this.dx;
    this.y +=this.dy;
    
    while (this.x < 0){
      this.x += width;
    }
    while (this.x >= width){
      this.x -= width;
    }
    while (this.y < 0){
      this.y += height;
    }
    while (this.y >= height){
      this.y -=height;
    }
  }
  
  //Getting them to move around the mouse
  notice(mouse){
    const dx = mouseX - this.x;
    const dy = mouseY - this.y;
    const dist = Math.hypot(dx, dy);
    
    if (dist < this.noticeMouse){
      
      const change = createVector(this.x - mouseX, this.y - mouseY);
      change.setMag (0.5);
      
      if (dist < this.noticeMouse && dist > 0){
        let change = createVector(this.x - mouseX, this.y - mouseY);
        if (change.mag() === 0){
          change = p5.Vector.random2d();
        }
      }
      change.setMag(0.5);
      this.dx += change.x;
      this.dy += change.y;
      this.enforceSpeedLimit();
    }
  }
  
  enforceSpeedLimit(){
    const dir = createVector(this.dx, this.dy). limit(2.5);
    this.dx = dir.x;
    this.dy = dir.y;
  }
}