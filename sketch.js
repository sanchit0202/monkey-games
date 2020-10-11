var PLAY = 1;
var END = 0;
var gameState = PLAY;
var monkey , monkey_running;
var banana ,bananaImage, obstacle, obstacleImage;
var bananasGroup, obstacleGroup;
var score;
var ground;
var survivalTime

function preload(){
 monkey_running = loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
}

function setup() {
  createCanvas(600,500);
  
  ground = createSprite(250,460,2000,20)
  ground.velocityX = -10
  ground.shapeColor = "pink";

  
  monkey = createSprite(100,400)
  monkey.addAnimation("running",monkey_running)
  monkey.scale = 0.1
  
  obstaclesGroup = createGroup();
  bananasGroup = createGroup();
  
  score = 0;
  survivalTime = 0;
}

function draw() {
 background("orange")
fill("red")
stroke("green")
strokeWeight(3)
textSize(30)
text("score: "+ score,440,50)

text("survivalTime:"+ survivalTime,100,50)
  
 
  
  if(score==100){                                    
  text("YOU WIN",250,250)
}
  if(gameState==PLAY){
  survivalTime = Math.round(frameCount/frameRate())
    
  if(keyDown("space")&&monkey.y >= 415.5){
  monkey.velocityY = -17
     
}
 monkey.velocityY = monkey.velocityY + 0.8
   if (ground.x < 0){
    ground.x = ground.width/2;
}   
   if(monkey.isTouching(bananasGroup)){
   bananasGroup.destroyEach();
   score = score +1
}   
    
  if(monkey.isTouching(obstaclesGroup)){
     gameState=END;
  } 
    spawnObstacles();
    spawnBanana(); 

} else if(gameState==END){
        text("YOU LOSE",100,100)   
     text("GAME OVER",100,140)   
   
   monkey.lifetime = 0;
  ground.lifetime = 0;
  monkey.velocityY = 0   
  ground.VelocityX = 0 
     obstaclesGroup.setVelocityXEach = (0)
   obstaclesGroup.setLifetimeEach(-1);
}  
monkey.collide(ground);
 console.log(monkey.y) 
  drawSprites(); 
}

function spawnObstacles(){
  if(frameCount % 200==0){
  obstacle = createSprite(450,430)
  obstacle.addImage(obstacleImage)
  obstacle.scale = 0.2
  obstacle.velocityX = -(6 + 3* score/10);
  obstacle.lifetime = 70  
  obstaclesGroup.add(obstacle)
  
   obstacle.setCollider("circle",0,0,180) 
  }
}

function spawnBanana(){
  if(frameCount %80==0){
  banana = createSprite(600,300)
  banana.y = Math.round(random(150,300))
  banana.velocityX = -(6 + 2* score/6); 
  banana.addImage(bananaImage)
  banana.scale = 0.1
  banana.lifetime = 90  
  banana.rotationSpeed = 4;
  bananasGroup.add(banana)
  }
}
