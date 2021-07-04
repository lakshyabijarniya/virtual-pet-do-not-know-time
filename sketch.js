//Create variables here
var dog,happyDog;
var database,foodS,foodStock;
var dogImg,happyDog;
var addFood;
var foodObj;
var lastFed;

function preload()
{
	//load images here
  dogImg=loadImage("images/dogImg.png");
  happyDog=loadImage("images/dogImg1.png");
}

function setup() {
  database=firebase.database();
	createCanvas(1000, 400);
  foodObj=new Food();
  foodStock=database.ref('Food');
  foodStock.on('value',readStock);

  dog=createSprite(800,200,10,60);
  dog.addImage(dogImg);
  dog.scale=0.15;

  addFood=createButton("ADD FOOD");
  addFood.position(900,95);
  addFood.mousePressed(addFoods);

  feed=createButton("FEED THE DOG");
  feed.position(700,95);
  feed.mousePressed(feedDog);




 
}


function draw() {  
  background(46,139,87);
  //add styles here
  foodObj.display();

  fedTime=database.ref('FeedTime');
  fedTime.on("value",function(data){
    lastFed=data.val;
  })




 


  fill(255,255,255)

  if(lastFed>=12){
    text("Last Feed: "+ lastFed%12+"PM",350,30)
  }else if(lastFed==0){
    text("Last Feed: 12 AM",350,30)
  }else{
    text("Last Feed: "+ lastFed+"AM",350,30)
  }

  drawSprites();
}

function readStock(data){
foodS=data.val();
foodObj.updateFoodStock(foodS);
}

function feedDog(){
  dog.addImage(happyDog);

  //write code here to update food stock and last fed time
  var food_stock_hal = foodObj.getFoodStock();
  if(food_stock_hal <= 0){
    foodObj.updateFoodStock(food_stock_hal * 0 );
  }else{
    foodObj.updateFoodStock(food_stock_hal -1);
  }

  database.ref('/').update({
    Food:foodObj.getFoodStock(),
      FeedTime:hour()
    
  })

}

function addFoods(){
  foodS=foodS+1;
  database.ref('/').update({
    Food:foodS
  })
}



