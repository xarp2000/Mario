var mario, marioCorrendo
var chao, chaoImg
var obstacle, obstacleImg, grupoObstaculos
var estrela, estrelaImg, grupoEstrelas
var pontuacao = 0;
var play = 1;
var end = 0;
var gamestate = play
var colisaoImg;
var gameOver, gameOverImg;
var restart, restartImg;

function preload(){
 marioCorrendo = loadAnimation("mario1.png", "mario2.png", "mario1.png", "mario2.png")
 chaoImg = loadImage("ground2.png")
obstacleImg = loadAnimation("obstacle1.png", "obstacle2.png", "obstacle3.png", "obstacle4.png")
estrelaImg = loadImage ("estrela.png")
colisaoImg = loadAnimation("collided.png")
restartImg = loadImage("restart.png")
gameOverImg = loadImage("gameOver.png")
}
function setup(){
    createCanvas(600, 400);
mario = createSprite(50, 200, 20, 20);
mario.addAnimation("mario_correndo", marioCorrendo);
mario.addAnimation("colisaoImg", colisaoImg);;
mario.scale = 0.5;

chao = createSprite(250, 285, 20, 20);
chao.addAnimation("chao_correndo", chaoImg);
chao.velocityX = -6;
chao.x = width/ 2;

grupoObstaculos = new Group()
grupoEstrelas = new Group()

gameOver = createSprite(300, 150);
gameOver.addImage("game_over", gameOverImg)
gameOver.scale = 0.5;
gameOver.visible = false;

restart = createSprite(300, 180);
restart.addImage("restart", restartImg);
restart.scale = 0.5;
restart.visible = false;
}

function draw(){
background("teal")
drawSprites()
fill("lightblue")
textSize(24)
textFont("Georgia")
text("Pontuação:  " + pontuacao, 400, 100)

if(gamestate === play){   
if(chao.x < 0){
chao.x = width/ 2;
}
if(keyDown("space")&& mario.y>= 180){
mario.velocityY = -13
}
mario.velocityY = mario.velocityY + 0.8
mario.collide(chao)
spawnObstacles()
spawnEstrelas()

  for(var i = 0; i < grupoEstrelas.length; i++){
if(grupoEstrelas.get(i).isTouching(mario)){
    grupoEstrelas.get(i).remove();
    mario.velocityY = mario.velocityY -1;
    pontuacao = pontuacao + 5;
}
}
if(grupoObstaculos.isTouching(mario)){
    gamestate = end
}

}
else if(gamestate === end){
chao.velocityX = 0
mario.velocityY = 0
grupoObstaculos.setVelocityXEach(0)
grupoObstaculos.setLifetimeEach(-1)
grupoEstrelas.setVelocityXEach(0)
grupoEstrelas.setLifetimeEach(-1)
mario.changeAnimation("colisaoImg", colisaoImg)
mario.scale = 0.2
restart.visible = true;
gameOver.visible = true;

if(mousePressedOver(restart)){
   reset()
}
}
}

function spawnObstacles(){
    if(frameCount % 60 === 0){
var obstacle = createSprite(600, 220, 40, 10);
obstacle.addAnimation("obstacle", obstacleImg)
obstacle.velocityX = -6
obstacle.lifetime = 300
grupoObstaculos.add(obstacle)
    }
}
function spawnEstrelas(){
    if(frameCount % 60 === 0){
        var estrela = createSprite(600, 100, 40, 10);
        estrela.addImage("estrela", estrelaImg)
        estrela.scale = 0.3
        estrela.lifetime = 300
        estrela.velocityX = -6
        estrela.y = random(20, 120)
        grupoEstrelas.add(estrela)
}
}

function reset(){
gamestate = play;
chao.velocityX = -6
grupoObstaculos.destroyEach()
grupoEstrelas.destroyEach()
mario.changeAnimation("mario_correndo")
mario.scale = 0.5  
restart.visible = false;
gameOver.visible = false;
pontuacao = 0
}