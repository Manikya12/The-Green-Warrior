var player, SWIM
var fish, fishGroup, fish1,fish2,fish3,fish4
var waste,wasteGroup, waste1,waste2,waste3,waste4
var gpower, gpowerGroup, gpowerImg
var elixir=10
var captainP=10
var gameState= 1 
var background1

function setup() {
  createCanvas(800,500);
  player=createSprite(40,460,40,40)
  player.addAnimation("swimming",SWIM)
  player.scale=0.25

  wasteGroup= createGroup()
  fishGroup=createGroup()
  gpowerGroup=createGroup()
}

function preload(){
  background1=loadImage("underwater.jpg")
  fish1=loadImage("fish1.png")
  fish2=loadImage("fish2.png")
  fish3=loadImage("fish3.png")
  fish4=loadImage("turtle.png")
 
  waste1=loadImage("can.png")
  waste2=loadImage("plastic.png")
  waste3=loadImage("slipper.png")
  waste4=loadImage("bag.png")
 
  SWIM=loadAnimation("1.png",
                     "2.png",
                     "3.png",
                     "4.png",
                     "5.png")


}



function draw() {
  background(background1);

  fill("black")  
  textSize(15)
  text("Earth Elixir:"+elixir,10,30)
  text("CaptainP:"+captainP,10, 50)
  
 if (gameState===1){
  player.y=mouseY
  player.x=mouseX

  if (keyDown("space")){
     createGpower()
     gpower.y=player.y
     gpower.x=player.x
  }

  if(gpowerGroup.isTouching(wasteGroup)){
     gpowerGroup.destroyEach()
     wasteGroup.destroyEach()
     elixir=elixir+1 
  }

  if(wasteGroup.isTouching(fishGroup)){
     wasteGroup.destroyEach()
     fishGroup.destroyEach()
     captainP=captainP+1 
     elixir=elixir-1 
  }

  createWaste()
  createFish()
  drawSprites()
 }
  
  if(gameState===2){
     wasteGroup.destroyEach() 
     fishGroup.destroyEach()
     gpowerGroup.destroyEach()
  }

  if(elixir>=50){
    textSize(60)
    fill("yellow")
    text("YOU WIN",300,250)
    gameState=2 
  }

   if(captainP>=50){
     textSize(60)
     fill("red")
     text("GAME OVER",250,250)
     gameState=2 
   }

}

function createWaste() {
  if (frameCount % 100 === 0) {
    waste = createSprite(600,10, 40, 40);
    waste.velocityY = +8
    waste.lifetime = 600;
    wasteGroup.add(waste);
    waste.x= Math.round(random(100,400,700))
    waste.scale=0.1
     
    var rand1 = Math.round(random(1, 4));
    switch (rand1) {
      case 1:
        waste.addImage(waste1);
        break;
      case 2:
        waste.addImage(waste2);
        break;
      case 3:
        waste.addImage(waste3);
      case 4:
        waste.addImage(waste4);
        break
      default:
        break;
    }

  }
}

function createFish() {
  if (frameCount % 50 === 0) {
    fish = createSprite(600, 165, 40, 40);
    fish.velocityX = -8
    fish.y = Math.round(random(200, 400, 300))
    fish.lifetime = 600;
    fishGroup.add(fish);
    fish.scale=0.15

    var rand2 = Math.round(random(1, 4));
    switch (rand2) {
      case 1:
        fish.addImage(fish1);
        break;
      case 2:
        fish.addImage(fish2);
        break;
      case 3:
        fish.addImage(fish3);
        break
      case 4: 
        fish.addImage(fish4)
      default:
        break;
    }

  }
}

function createGpower() {

  gpower = createSprite(360, 100, 5, 10);
  gpower.velocityY = -8;
  gpowerGroup.add(gpower);
  gpower.lifetime = 100;
  gpower.shapeColor="skyblue"
  gpower.depth=player.depth
  player.depth=player.depth+1

  return gpower;
}
