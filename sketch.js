//class24 - 33: ANGRY BIRDS GAME
//Developer:
//Topics: PhysicsEngine, Inheritence, JSON, API, functions, Arrays, Push()pop()

//Declare variables for game objects and behaviour indicators(FLAGS)

const Engine = Matter.Engine;
const World = Matter.World;
const Bodies = Matter.Bodies;
const Constraint = Matter.Constraint;

var userEngine, userWorld;

var bird;
var catapult;
var pig1, pig2;
var platform, ground;
var log1, log2, log3, log4;
var box1, box2, box3, box4, box5;

var releaseSound, pigSound, birdSound;

var score;
var gameState, timesPlayed;
var backgroundImg, imagePath;

//Create Media library and load to use it during the course of the software
//executed only once at the start of the program
function preload() {
    //function call to set background image based on time
    setBackgroundImg();

    //adding sounds
    //releaseSound = loadSound("sounds/bird_flying.mp3");
    //pigSound = loadSound("sounds/pig_snort.mp3");
    //birdSound = loadSound("sounds/bird_select.mp3");
}

//define the intial environment of the software(before it is used)
//by defining the declared variables with default values
//executed only once at the start of the program
function setup() {
    var canvas = createCanvas(1200, 400);

    userEngine = Engine.create();
    userWorld = userEngine.world;

    //object name = new Classname(constructor call)

    gameState = "onSlingShot";

    ground = new Ground(600, height - 10, 1200, 20);
    console.log("display ground object: "+ ground.body);
    platform = new Ground(150, 305, 300, 170);

    bird = new Bird(200, 30);

    //creation of catapult with constraint. Body of bird will be attached to the constraint.
    catapult = new SlingShot(bird.body, { x: 200, y: 50 });

    //creation of 1st layer using matter.js
    box1 = new Box(840, 300, 70, 70);
    box2 = new Box(1018, 300, 70, 70);
    pig1 = new Pig(932, 300, 60, 60);
    log1 = new Log(980, 270, 300, PI / 2);

    //creation of 2nd layer using matter.js
    box3 = new Box(841, 201, 70, 70);
    box4 = new Box(1018, 200, 70, 70);
    pig2 = new Pig(932, 200, 60, 60);
    log2 = new Log(931, 170, 300, PI / 2);

    //pigSound.play();

    //creation of 3rd layer using matter.js
    box5 = new Box(930, 71, 70, 70);
    log3 = new Log(880, 100, 150, -40);
    log4 = new Log(980, 100, 150, 40);

    // birdSound.play();

    timesPlayed = 0;
    score = 0;


}

//All changes, conditions, manipulations, actions to be executed and checked continously or applied throughout the program are written inside function draw.
//function draw is executed for every frame created since the start of the program.

function draw() {

    if (backgroundImg) {
        background(backgroundImg);
    }
    else {
        background(0);
    }
    //active the simulation
    Engine.update(userEngine);

    //display of ground using matter.js
    ground.display();

    // displaying the platform
    platform.display();

    bird.display();

    //display of catapult with constraint. Body of bird will be attached to the constraint.
    catapult.display();

    //display  of 1st layer using matter.js
    box1.display();
    box2.display();
    pig1.display();
    log1.display();

    //display of 2nd layer using matter.js
    box3.display();
    box4.display();
    pig2.display();
    log2.display();

    //display of 3rd layer using matter.js
    box5.display();
    log3.display();
    log4.display();

    if (gameState == "detached") {
        //trigger score based on visibility of each object of PIG class
        pig1.score();
        pig2.score();

        /* 
        //trigger score based on visibility of each object of LOG class
        log1.score();                      
        log2.score();
        log3.score();
        log4.score();
    
        //trigger score based on visibility of each object of BOX class
        box1.score();
        box2.score();
        box3.score();                        
        box4.score();
        box5.score();
        */
    }

    // display score
    noStroke();
    textSize(35);
    fill("white");
    text("Score : " + score, width - 300, 50);



    //condtion for game won
    if (pig1.visibility <= 0 && pig2.visibility <= 0) {
        gameState = "WIN";
        //display winning message
        noStroke();
        textSize(100);
        fill("white");
        text("YOU WIN", width / 2 - 100, height / 2);
    }

    //conditon for gameover
    if (timesPlayed == 4 && gameState != "WIN") {
        //display game over message
        noStroke();
        textSize(100);
        fill("white");
        text("GAME OVER", width / 2 - 100, height / 2);
    }
}

//function triggered when a mouse is clicked and dragged
function mouseDragged() {
    if (gameState == "onSlingShot" && mouseX < width / 3) {
        //function for bird to move with repsect to mouse
        Matter.Body.setPosition(bird.body, { x: mouseX, y: mouseY });
    }
}

//function triggered when a clicked mouse is released
function mouseReleased() {
    if (timesPlayed < 4) {
        //function call to detach(release) a body (this.sling.bodyA) from constraint
        catapult.detach();
        gameState = "detached";
        //releaseSound.play();
    }
}

//fuction triggered when any button on the keyboard is pressed
function keyPressed() {
    if (keyCode == 32) {
        gameState = "onSlingShot";
        // fuction call to attach a body to the constratined
        catapult.attach(bird.body);
    }
}

//function definition to set background image based on time
async function setBackgroundImg() {
    var response = await fetch("http://worldclockapi.com/api/json/est/now");
    console.log("response: " + response);


    var responseJSON = await response.json();
    console.log("responseJSON: " + responseJSON);

    var datetime = responseJSON.currentDateTime;
    var hour = datetime.slice(11, 13);

    if (hour >= 06 && hour < 18) {
        imagePath = "images/day.png";
    } else {
        imagePath = "images/night1.jpeg";
    }

    backgroundImg = loadImage(imagePath);

}