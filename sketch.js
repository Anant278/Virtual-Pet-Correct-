//Defining the variables
var database;
var dog, dog_img, happyDog;
var feed, addFood;
var foodS, foodStock;

function preload(){
  //Preloading images
  dog_img = loadImage("images/dogImg.png");
  happyDog = loadImage("images/dogImg1.png");
}

function setup(){
  createCanvas(800, 500);

  //Defining databse
  database = firebase.database();

  foodStock = database.ref("Food");
    foodStock.on("value", readStock);

  //Dog
  dog = createSprite(680, 250, 20, 20);
  dog.addImage(dog_img);
  dog.scale = 0.3;

  //Food
  foodObj = new Food();
}

function draw(){
  background("lightgreen");

  //Button to feed the dog
  feed = createButton("Feed the dog");
  feed.position(630, 70);
  feed.mousePressed(feedDog);

  //Button to add food
  addFood = createButton("Add food");
  addFood.position(730, 70);
  addFood.mousePressed(addFoods);

  //Food Display
  foodObj.display();

  drawSprites();
}

function readStock(data){
  foodS = data.val();
}

function writeStock(x){
  if(x <= 0){
    x = 0;
  }
  else{
    x = x - 1;
  }

  database.ref('/').update({
    Food: x
  })
}

function feedDog(){
  dog.addImage(happyDog);

  foodObj.updateFoodStock(foodObj.getFoodStock() - 1);
  database.ref('/').update({
    Food: foodObj.getFoodStock(),
  })
}

function addFoods(){
  foodS++;
  dog.addImage(dog_img);
  database.ref('/').update({
    Food: foodS
  })
}