var trex, trex_running, trex_collided;
var ground, invisibleGround, groundImage;


var cloudImage;
var obstacleImg1,obstacleImg2,obstacleImg3,obstacleImg4,obstacleImg5,
    obstacleImg6;

var cloudsGroup, obstaclesGroup;
var score = 0;


function preload(){
  trex_running = loadAnimation("trex1.png","trex3.png","trex4.png");
  trex_collided = loadImage("trex_collided.png");
  
  groundImage = loadImage("ground2.png");
  
 cloudImage = loadImage("cloud.png");
  
  obstacleImg1 = loadImage("obstacle1.png");
  obstacleImg2 = loadImage("obstacle2.png");
  obstacleImg3 = loadImage("obstacle3.png");
  obstacleImg4 = loadImage("obstacle4.png");
  obstacleImg5 = loadImage("obstacle5.png");
  obstacleImg6 = loadImage("obstacle6.png");
  
}

function setup() {

  createCanvas(600,200)
  
  //create a trex sprite
  trex = createSprite(50,160,20,50);
  trex.addAnimation("running", trex_running);
  trex.scale = 0.5;
  
  //create a ground sprite
  ground = createSprite(200,180,400,20);
  ground.addImage("ground",groundImage);
  ground.x = ground.width /2;
  ground.velocityX = -4;
  
  //creating invisible ground
  invisibleGround = createSprite(200,190,400,10);
  invisibleGround.visible = false;
  
  cloudsGroup = createGroup();
  obstaclesGroup = createGroup();
  
 
}

function draw() {
  //set background color
  background(0);
  
  score = score+Math.round(getFrameRate()/60);
  text("Score:"+ score,500,50);
  
  // jump when the space key is pressed
  if(keyDown("space")&& trex.y >= 100) {
    trex.velocityY = -10;
  }
  
  trex.velocityY = trex.velocityY + 0.8
  
  if (ground.x < 0){
    ground.x = ground.width/2;
  }
  
  //stop trex from falling down
  trex.collide(invisibleGround);

  spawnClouds();
  
  spawnObstacles();
  
  drawSprites();
  
}

function spawnObstacles()
{
   if(frameCount%60 ===0){
     
     var obstacle = createSprite(600,165,10,40);
     obstacle.velocityX = -4;
     obstacle.scale = 0.5;
     
     var rand = Math.round(random(1,6));
     console.log(rand);
     switch(rand){
       case 1:obstacle.addImage(obstacleImg1);
              break;
       case 2:obstacle.addImage(obstacleImg2);
              break;
       case 3:obstacle.addImage(obstacleImg3);
              break;
       case 4:obstacle.addImage(obstacleImg4);
              break;
       case 5:obstacle.addImage(obstacleImg5);
              break;
       case 6:obstacle.addImage(obstacleImg6);
              break;
         
     }
     
     obstacle.lifetime = 300;  
     obstaclesGroup.add(obstacle);
     
   }
  
  
}
function spawnClouds(){
  
  if(frameCount%60 ===0){
    var cloud = createSprite(600,60,40,10);
    cloud.addImage(cloudImage);
    cloud.y =Math.round(random(40,100))
    //console.log(cloud.y);
    cloud.velocityX = -3;
    cloud.scale = 0.5;
    cloud.lifetime = 200;
    
   //console.log("cloudDepth"+cloud.depth)
   //console.log("TrexDepth"+trex.depth)
    
    cloud.depth = trex.depth;
    trex.depth = trex.depth+1;
    
    cloudsGroup.add(cloud);
  }
  
}


