var dog,sadDog,happyDog;
var foodS,foodStock;
var addFood;
var foodObj;
var database;
var feed,lastFed,response,rJSON,dt,hour;

//create feed and lastFed variable here


function preload(){
sadDog=loadImage("Dog.png");
happyDog=loadImage("happy dog.png");
}

function setup() {
  database=firebase.database();
  createCanvas(1000,400);

  foodObj = new Food();

  foodStock=database.ref('Food');
  foodStock.on("value",readStock);
  
  dog=createSprite(800,200,150,150);
  dog.addImage(sadDog);
  dog.scale=0.15;

  //create feed the dog button here

  addFood=createButton("Add Food");
  addFood.position(800,95);
  addFood.mousePressed(addFoods);

  feed=createButton("Feed the Dog");
  feed.position(700,95);
  feed.mousePressed(feedDog)

}

function draw() {
  background(46,139,87);
  foodObj.display();

  //write code to read fedtime value from the database

 
  //write code to display text lastFed time here
  drawSprites();


  textSize(15);
  fill (225);
  text ("Last Fed - " + hour() +"00  Hours",300,30);

}

//function to read food Stock
function readStock(data){
  foodS=data.val();
  foodObj.updateFoodStock(foodS);
}


function feedDog(){
  dog.addImage(happyDog);
  dog.addImage(happyDog);
  foodS=foodS-1;
  database.ref('/').update({
    Food:foodS
  })
  //write code here to update food stock and last fed time
 // lastFed=lastFed;
  //database.ref('/').update({
  //  feedTime:lastFed
  //})

}

//function to add food in stock
function addFoods(){
  foodS++;
  database.ref('/').update({
    Food:foodS
  })
  
}

