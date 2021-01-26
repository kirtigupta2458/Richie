gameState="play"

function preload(){
  thorAnimation = loadAnimation("thor3.png","thor4.png","thor5.png")
  bgImage=loadImage("bg.jpg");
  coinImage = loadImage("coin.png")
  titanImage=loadImage('titan.png')
  thorfly=loadImage("thor6.png");
}


function setup() {
  createCanvas(windowWidth,windowHeight);

  bg=createSprite(windowWidth/2,windowHeight/2,10,10)
  bg.addImage(bgImage)
  bg.scale=3.9
  

   
  thor=createSprite(150, windowHeight-300, 50, 50);
  thor.addAnimation("running",thorAnimation)
  thor.scale=0.5;

  ground=createSprite(windowWidth/2,windowHeight-250,windowWidth,10)
  ground.visible=false

  coinsGroup=new Group()
  titanGroup=new Group()
  
  score=0

}

function draw() {
  background("green"); 

if(gameState==="play"){
 
  bg.velocityX=-(3+score/10)
  
  if(bg.x<110){
    bg.x=windowWidth/2;
    
  }

  if(keyDown('space') ){
     thor.velocityY=-20 
  }
  
  thor.velocityY=thor.velocityY+0.8

  if(coinsGroup.isTouching(thor)){
    score=score+1
    coinsGroup[0].destroy();
  }
  if(keyDown('right')){
    thor.x=thor.x+5
  }
  if(keyDown('left')){
    thor.x=thor.x-5
  }

  spawnTitan();
  spawnCoins();

  if(titanGroup.isTouching(thor)){
    gameState='end'
  }

}

else if(gameState==="end"){
  bg.velocityX=0
  titanGroup.setVelocityXEach(0)
  coinsGroup.setVelocityXEach(0)
  titanGroup.setLifetimeEach(-1)
  coinsGroup.setLifetimeEach(-1)

  thor.addImage(thorfly)
}


  thor.collide(ground)
  drawSprites();


  textSize(30)
  fill('yellow')
  text('Score= '+score,windowWidth-200,50)
   
}
 
function spawnCoins(){
  if(frameCount%60===0){
    coin=createSprite(windowWidth,(Math.round(random(200,600))),10,10)
    coin.velocityX=-(4+score/10)
    coin.addImage(coinImage)
    coin.scale=0.1
    coinsGroup.add(coin)
    coin.lifetime=500

  }
}
function spawnTitan(){
  if(frameCount%250===0){
    titan=createSprite(windowWidth,(Math.round(random(500,800))),10,10)
    titan.velocityX=-(4+score/10)
    titan.addImage(titanImage)
    titan.scale=0.5
    thor.depth=titan.depth
    thor.depth+=1
    titanGroup.add(titan)
    titan.lifetime=500
  }
}







