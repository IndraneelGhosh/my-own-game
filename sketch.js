var angel,bow,arrow;
var p1,p2,p3,bgImg,ladder,score=0,life=3;


function preload(){
bgImg=loadImage("images/bg.jpg");
 p1=loadAnimation("images/person1.png","images/person1_img_2.png","images/person1_img_3.png");
 p2=loadAnimation(
   "images/person_2_img1.png",
 "images/person_2_img2.png",
 "images/person_2_img_3.png",
 "images/person_2_img_4.png",
 "images/person2_img5.png",
 "images/person_2_img_6.png");
 p3=loadAnimation("images/p5_1.png","images/p5_2.png","images/p5_3.png");

 heart1Img = loadImage("images/heart_1.png");
  heart2Img = loadImage("images/heart_2.png"); 
  heart3Img = loadImage("images/heart_3.png");
  angel=loadAnimation("images/a2.png","images/a3.png","images/flying_angel.png");
arrow=loadImage("images/arrow.png");
a1=loadImage("images/a1.png");
winSound=loadSound("assets/win.mp3")
loseSound=loadSound("assets/lose.mp3")

}

function setup() {
createCanvas(windowWidth,windowHeight);

  //adding the background image
  bg = createSprite(displayWidth/2-20,320)
  bg.addImage(bgImg);
  bg.scale = 3.0;
  bg.velocityX=1.0;

  heart1 = createSprite(displayWidth-150,40,20,20)
   heart1.visible = false
    heart1.addImage("heart1",heart1Img)
    heart1.scale = 0.4

    heart2 = createSprite(displayWidth-100,40,20,20)
     heart2.visible = false 
     heart2.addImage("heart2",heart2Img)
      heart2.scale = 0.4
      
      heart3 = createSprite(displayWidth-150,40,20,20) 
      heart3.addImage("heart3",heart3Img)
       heart3.scale = 0.4
  
  peopleGroup1=new Group();
  arrowGroup=new Group();
  
  

//creating the angel sprite
angels = createSprite(displayWidth-100, displayHeight-300, 50, 50);
 angels.addAnimation("angelflying",angel)
  // angel.scale = 0.3
   angel.debug =false
   //angel.setCollider("rectangle",0,0,100,100)


}


function draw() {
  background("pink"); 
 

  if(bg.x>displayWidth/2+200){
    bg.x=displayWidth/2
  }




  //moving the angel up and down and making the game mobile compatible using touches
if(keyDown("UP_ARROW")||touches.length>0){
  angels.y = angels.y-30
}
if(keyDown("DOWN_ARROW")||touches.length>0){
 angels.y = angels.y+30
}


//release bullets and change the image of shooter to shooting position when space is pressed
if(keyDown("space")){
  arrower=createSprite(angels.x,angels.y)
  arrower.velocityX=-6;  
  arrower.scale=0.2;
  //arrower.bounceOff(peopleGroup1,peopleHit1)
   arrower.addImage("arrows",arrow);
   arrowGroup.add(arrower);

 
}
if(peopleGroup1.isTouching(arrowGroup))
{ for(var i=0;i<peopleGroup1.length;i++)
  { if(peopleGroup1[i].isTouching(arrowGroup))
    {peopleGroup1[i].velocityX=6
      arrower.addImage("arrows",a1);
      winSound.play();
       arrowGroup.destroyEach()
      
       score = score+2 } } } 
       //reduce life and destroy zombie when player touches it
        if(peopleGroup1.isTouching(angels)){ ; 
          for(var i=0;i<peopleGroup1.length;i++)
          { if(peopleGroup1[i].isTouching(angels))
            { peopleGroup1[i].destroy();
               life=life-1 
              loseSound.play();
              } } }


//angel goes back to original standing image once we stop pressing the space bar




spawnPeople1();


/*
if(peopleGroup1.isTouching(arrow)){
  peopleGroup1.shapeColor="yellow"
}
*/




drawSprites();
textSize(24);
fill("black")
text("USE SPACE TO RELEASE ARROW",50,100)
}
function spawnPeople1(){
  if(frameCount %110  === 0){
    people1 = createSprite(0,random(60,displayHeight-100),10,10);
   var randoms=Math.round(random(1,3))
   switch(randoms){
     case 1:
      people1.addAnimation("people1",p1); 
      break;
      case 2:
      people1.addAnimation("people2",p2);
      break ;
      case 3:
        people1.addAnimation("people3",p3);
        people1.scale=0.6;
        break;

        default:
          break;


   }
   //
   people1.shapeColor="red";
    people1.velocityX = 3;
   // people.scale = 2;
    people1.lifetime = 420;
    peopleGroup1.add(people1);
  }
}
/*function spawnPeople2(){
  if(frameCount %160  === 0){
    people2 = createSprite(0,random(70,displayHeight-100),10,10);
    //people2.shapeColor="green";
   
    people2.velocityX = 3;
     people2.scale = 0.8;
    people2.lifetime = 420;
    peopleGroup2.add(people2);
  }
}
function spawnPeople3(){
  if(frameCount %210  === 0){
    people3 = createSprite(0,random(90,displayHeight-100),10,10);
    //people3.shapeColor="blue";
    
    people3.velocityX = 3;
    people3.scale = 0.5;
    people3.lifetime = 420;
    peopleGroup3.add(people3);
  }
}

*/




