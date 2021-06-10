const Engine = Matter.Engine;
const World= Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var engine, world;
var box1, pig1,pig3;
var backgroundImg,platform,border1,border2,border3;
var bird, slingshot;

var gameState = "onSling";
var bg = "sprites/bg1.png";
var score = 0;

function preload() {
    getBackgroundImg();
}

function setup(){
    var canvas = createCanvas(1200,500);
    engine = Engine.create();
    world = engine.world;


    ground = new Ground(600,height,1200,20);
    platform = new Ground(150, 405, 300, 170);
    border1 = new Ground(500,-50,1200,5)
    border2 = new Ground(1200,200,5,400)
    border3 = new Ground(0,200,5,400)

    box1 = new Box(700,420,70,70);
    box2 = new Box(920,420,70,70);
    pig1 = new Pig(810, 450);
    log1 = new Log(810,360,300, PI/2);

    box3 = new Box(700,340,70,70);
    box4 = new Box(920,340,70,70);
    pig3 = new Pig(810, 320);

    log3 =  new Log(810,280,300, PI/2);

    box5 = new Box(810,260,70,70);
    log4 = new Log(760,220,150, PI/7);
    log5 = new Log(870,220,150, -PI/7);

    bird = new Bird(200,150);

    //log6 = new Log(230,180,80, PI/2);
    slingshot = new SlingShot(bird.body,{x:200, y:150});
}

function draw(){
    if(backgroundImg)
        background(backgroundImg);
    
        noStroke();
        textSize(35)
        fill("white")
        text("Score  " + score, width-300, 50)
    
    Engine.update(engine);
    //strokeWeight(4);
    box1.display();
    box2.display();
    ground.display();
    pig1.display();
    pig1.score();
    log1.display();

    box3.display();
    box4.display();
    pig3.display();
    pig3.score();
    log3.display();

    box5.display();
    log4.display();
    log5.display();

    bird.display();
    platform.display();
    border1.display();
    border2.display();
    border3.display();
    //log6.display();
    slingshot.display();    
}

function mouseDragged(){
     if (gameState!=="launched"){
        Matter.Body.setPosition(bird.body, {x: mouseX , y: mouseY});
     }
}


function mouseReleased(){
    slingshot.fly();
    gameState = "launched";
}

function keyPressed(){
    if(keyCode === 32 && bird.body.speed < 2    ){
       slingshot.attach(bird.body);
       bird.trajectory = [];
       Matter.Body.setPosition(bird.body,{x:200, y:50});
       gameState = "onSling";
        }
}

async function getBackgroundImg(){
    var response = await fetch("http://worldtimeapi.org/api/timezone/Asia/Kolkata");
    var responseJSON = await response.json();

    var datetime = responseJSON.datetime;
    var hour = datetime.slice(11,13);
    
    if(hour>=06 && hour<=19){
        bg = "sprites/bg1.png";
    }
    else{
        bg = "sprites/bg2.jpg";
    }

    backgroundImg = loadImage(bg);
    console.log(backgroundImg);
}