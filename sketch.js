var you,youImg,ground,bullet,bgImg;
var aliens,alienImg;
var text2,reset;
var gameState = "play"
var b = [],bImg,BImg;
var score;

function preload(){
  youImg = loadAnimation("images/you1.png","images/you2.png","images/you3.png","images/you4.png","images/you5.png");
  bgImg = loadImage("images/background.png");
  BImg =loadImage("images/alBullet.png");
  bImg = loadImage("images/youBullet.png");
  alienImg = loadAnimation("images/al1-1.png","images/al1-2.png","images/al1-3.png");
 
}

function setup(){
  createCanvas(displayWidth,displayHeight);
  text2 = createSprite(displayWidth/2,displayHeight/2-50);
  reset = createSprite(displayWidth/2,displayHeight/2,10,10);
  you = createSprite(displayWidth/2-450,displayHeight/2+220,20,20);
  you.scale = 2;
  you.addAnimation("running",youImg);
  ground= createSprite(displayWidth/2,displayHeight/2+300,displayWidth,10);
  ground.visible = false
  UFO = createGroup()
  BULLET = createGroup()
  B = createGroup()
  score=0
}

function Aliens(){
  if(frameCount%100 === 0){
  aliens = createSprite(displayWidth+25,displayHeight/2+180,10,10);
  aliens.addAnimation("chasing",alienImg);
  aliens.scale = 0.2;
  aliens.velocityX=-3;
  for(var i=0;i<=5;i++){
   b[i] = createSprite(aliens.x,aliens.y-60,5,5);
  b[i].velocityX=-5
  B.add(b[i]);
  b[i].addImage(BImg)
  b[i].scale = 0.1
  }
  var any = Math.round(random(1,4))


  UFO.add(aliens)
  }
}

function bullets(){
  bullet = createSprite(you.x+35,you.y-20,5,5);
  bullet.velocityX=3
  BULLET.add(bullet);
  bullet.addImage(bImg);
  bullet.scale = 0.2
}



function draw(){
  background(bgImg);

if(gameState==="play"){
  Aliens();
  text2.visible=false;
  reset.visible=false;
  
  if(keyWentDown("enter")){
    bullets()
  }
  if(keyWentDown("space")&&you.y>=displayHeight/2+100){
    you.velocityY=-15
  }
  you.velocityY=you.velocityY+0.5
   
  for(var i=0;i<UFO.length;i++){
      if(BULLET.isTouching(UFO[i])){
        score=score+1;
        UFO[i].destroy();
        BULLET[i].destroy();

    }

  }
  if(B.isTouching(you)){
    gameState ="end"
  }
} 
 else if(gameState==="end"){
   you.destroy();
   aliens.destroy();
   bullet.destroy();
   b.destroy();
   text2.visible = true;
   reset.visible = true;
   
  }
  you.collide(ground);
  drawSprites();
  fill("green")
  text("SCORE:"+score,displayWidth-100,100)

}