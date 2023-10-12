var path,carro;
var pathImg;

var oppPink1Img,oppPink2Img;
var oppYellow1Img,oppYellow2Img;
var oppRed1Img,oppRed2Img;
var gameOverImg;

var ciclista1, ciclista2,ciclista3; 

var END =0;
var PLAY =1;
var gameState = PLAY;

var distance=0;
var gameOver, restart;

function preload(){
  pathImg = loadImage("Road.png");
  mainRacerImg1 = loadImage("mainPlayer1.png");
  
  oppPink1Img = loadAnimation("opponent1.png","opponent2.png");
  oppPink2Img = loadAnimation("opponent3.png");
  
  oppYellow1Img = loadAnimation("opponent4.png","opponent5.png");
  oppYellow2Img = loadAnimation("opponent6.png");
  
  oppRed1Img = loadAnimation("opponent7.png","opponent8.png");
  oppRed2Img = loadAnimation("opponent9.png");
  
  
  gameOverImg = loadImage("gameOver.png");
}

function setup(){
  
createCanvas(1200,300);

path=createSprite(100,150);
path.addImage(pathImg);
path.velocityX = -5;


carro  = createSprite(70,150);
carro.addImage(mainRacerImg1);
carro.scale=0.65;
  

carro.setCollider("rectangle",0,0,40,40,50);

  
gameOver = createSprite(650,150);
gameOver.addImage(gameOverImg);
gameOver.scale = 0.8;
gameOver.visible = false;  
  
ciclista1 = new Group();
ciclista2 = new Group();
ciclista3 = new Group();
  
}

function draw() {
  background(0);
  
  drawSprites();
  textSize(20);
  fill(255);
  text("pontos: "+ distance,900,30);
  
  if(gameState===PLAY){
    
   distance = distance + Math.round(getFrameRate()/50);
   path.velocityX = -(6 + 4*distance/150);
  
   carro.y = World.mouseY;
  
   edges= createEdgeSprites();
   carro.collide(edges);
  
  
  if(path.x < 0 ){
    path.x = width/2;
  }
  
  var select_oppPlayer = Math.round(random(1,3));
  
  if (World.frameCount % 150 == 0) {
    if (select_oppPlayer == 1) {
      pinkCyclists();
    } else if (select_oppPlayer == 2) {
      yellowCyclists();
    } else {
      redCyclists();
    }
  }
  
   if(ciclista1.isTouching(carro)){
     gameState = END;
     player1.velocityY = 0;
     player1.addAnimation("opponentPlayer1",oppPink2Img);
    }
    
    if(ciclista2.isTouching(carro)){
      gameState = END;
      player2.velocityY = 0;
      player2.addAnimation("opponentPlayer2",oppYellow2Img);
    }
    
    if(ciclista3.isTouching(carro)){
      gameState = END;
      player3.velocityY = 0;
      player3.addAnimation("opponentPlayer3",oppRed2Img);
    }
    
}else if (gameState === END) {
    gameOver.visible = true;
  
    textSize(20);
    fill(255);
    text("Pressione f5 para cima para recomeçar!", 500,200);
  
    path.velocityX = 0;
    carro.velocityY = 0;
    carro.addAnimation("SahilRunning",mainRacerImg2);
  
    ciclista1.setVelocityXEach(0);
    ciclista1.setLifetimeEach(-1);
  
    ciclista2.setVelocityXEach(0);
    ciclista2.setLifetimeEach(-1);
  
    ciclista3.setVelocityXEach(0);
    ciclista3.setLifetimeEach(-1);
    
    

     
     
}
}

function pinkCyclists(){
        player1 =createSprite(1100,Math.round(random(50, 250)));
        player1.scale =0.06;
        player1.velocityX = -(6 + 2*distance/150);
        player1.addAnimation("opponentPlayer1",oppPink1Img);
        player1.setLifetime=170;
        ciclista1.add(player1);
}

function yellowCyclists(){
        player2 =createSprite(1100,Math.round(random(50, 250)));
        player2.scale =0.06;
        player2.velocityX = -(6 + 2*distance/150);
        player2.addAnimation("opponentPlayer2",oppYellow1Img);
        player2.setLifetime=170;
        ciclista2.add(player2);
}

function redCyclists(){
        player3 =createSprite(1100,Math.round(random(50, 250)));
        player3.scale =0.06;
        player3.velocityX = -(6 + 2*distance/150);
        player3.addAnimation("opponentPlayer3",oppRed1Img);
        player3.setLifetime=170;
        ciclista3.add(player3);
}



function reset(){
  gameState = PLAY;
  gameOver.visible = false;
  
  ciclista1.destroyEach();
  ciclista2.destroyEach();
  ciclista3.destroyEach();
  
  distance = 0;
 }


