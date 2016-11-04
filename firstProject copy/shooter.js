console.log("loeaded");
"use strict";
(function(){
  $(document).ready(function() {
    //global variable
var index1 = 1;
var interval;
var $body = $('body');
var bulletOdj = new Object();
var dimensionFunc = function(){
  if(this.posX < 20){
    this.posX = 20;
    return true;
  }
  else if(this.posX > 980){
    this.posX = 970;
    return true;
  }
  else if(this.posY < 424){
    this.posY = 424;

  }
  else if(this.posY > 526){
    this.posY = 526;

  }
  return false;
}
var player =  {
name: $('.player'),
  posX: 500,
  posY: 490,
  width1: 100,
  height1: 180,
  direction: 'right',
  dimension: dimensionFunc
};

var bowser =  {
name: $('#boss'),
  posX: 800,
  posY: 440,
  width1: 300,
  height1: 260,
  direction: 'left',
};

var obj = function(name, x, y, w, h){
this.name = $(name);
this.posX = x;
this.posY = y;
this.width1 = w;
this.height1 = h;
this.dimension = dimensionFunc;
}

var initialize = function(){
this.name = ''
this.posX = 0;
this.posY = 0;
this.width1 = 0;
this.height1 = 0;
this.dimension = dimensionFunc;
}


var walkAnimation = function(){

  var $walk = $('.player');
  setInterval(function(){
$walk.toggleClass('walk4');
  });
          $(document).keyup(function() {
  clearInterval(interval);
});

};

var zombieGoingLeft = function(direction){
 var count = 1;
  var thing = new obj('<div class="zombie"></div>'
    , Math.floor(Math.random()*(960 - 950)+950)
    , Math.floor(Math.random()*(516 - 418)+418), 100, 200);
  var $container = $('#mainContainer');
if(direction === 'right'){
thing.name.css('transform', 'rotateY(180deg)');
}
  $container.append(thing.name);
  thing.name.css({
  'left': thing.posX,
  'top': thing.posY
});
  var stop = setInterval(function(){
    thing.name.addClass('form'+count);
     count++;
    if(count >4){
thing.name.removeClass('form1');
thing.name.removeClass('form2');
thing.name.removeClass('form3');
thing.name.removeClass('form4');
    clearInterval(stop);

  thing.name.removeAttr('class');
  thing.name.addClass('zombieFinal');

var stop11 = setInterval(function(){
thing.name.toggleClass('final');
thing.posX-=6;
thing.name.css('left', thing.posX);
thing.dimension();

if((thing.posX < player.posX + player.width1 - 60
  && thing.posX + thing.width1 - 60 > player.posX
  && thing.posY < player.posY + player.height1 - 60
  && thing.posY + thing.height1 - 60 > player.posY)){
 clearInterval(stop11);
  var $currentplayer = $('.player');
  $currentplayer.remove();
  $('#mainContainer').html("");
  $('#mainContainer').css('background', "url('images/cellplatform.jpg')");
  thing.name.remove();
  thing = new initialize();
}
else if(bulletCollision(thing)){
  if(thing.name.children('.HIT').length === 3){
  clearInterval(stop11);
 thing.name.remove();
 thing = new initialize();
  bigBoss();
}
}

}, 500);

}//>4

  },500);
}

var zombieGoingRight = function(direction){
 var count = 1;
  var thing = new obj('<div class="zombie"></div>'
    , Math.floor(Math.random()*(960 - 950)+10)
    , Math.floor(Math.random()*(516 - 418)+418), 100, 200);
  var $container = $('#mainContainer');
if(direction === 'right'){
thing.name.css('transform', 'rotateY(180deg)');
}
  $container.append(thing.name);
  thing.name.css({
  'left': thing.posX,
  'top': thing.posY
});
  var stop = setInterval(function(){
    thing.name.addClass('form'+count);
     count++;
    if(count >4){
thing.name.removeClass('form1');
thing.name.removeClass('form2');
thing.name.removeClass('form3');
thing.name.removeClass('form4');
    clearInterval(stop);

  thing.name.removeAttr('class');
  thing.name.addClass('zombieFinal');

var stop1 = setInterval(function(){
thing.name.toggleClass('final');
thing.posX+=6;
thing.name.css('left', thing.posX);
thing.dimension();

if((thing.posX < player.posX + player.width1 - 60
  && thing.posX + thing.width1 - 60 > player.posX
  && thing.posY < player.posY + player.height1 - 60
  && thing.posY + thing.height1 - 60 > player.posY)){
 clearInterval(stop1);
  var $currentplayer = $('.player');
  $currentplayer.remove();
  $('#mainContainer').html("");
  $('#mainContainer').css('background', "url('images/cellplatform.jpg')");
  thing.name.remove();
  thing = new initialize();

}
else if(bulletCollision(thing)){

  if(thing.name.children('.HIT').length === 3){
 clearInterval(stop1);
 thing.name.remove();
 thing = new initialize();
 bigBoss();}
}

}, 500);

}//>4

  },500);
}



var bigBoss = function(){
  setTimeout(function(){
bowser.name.css('opacity', '1');
  },5000)
}



var bulletCollision = function(currentEnemy){
  if(Object.keys(bulletOdj).length > 0){
    console.log("enemies"+bulletOdj);
    for(var i in bulletOdj){
  if((currentEnemy.posX < bulletOdj[i].posX + bulletOdj[i].width1 - 10
  && currentEnemy.posX + currentEnemy.width1 - 10 > bulletOdj[i].posX
  && currentEnemy.posY < bulletOdj[i].posY + bulletOdj[i].height1
  && currentEnemy.posY + currentEnemy.height1> bulletOdj[i].posY)){
    currentEnemy.name.append('<p class="HIT" ></p>');
  bulletOdj[i].name.remove();
bulletOdj[i] = new initialize();
  return true;
}
}
return false;
}



}

var fireBulletRight = function(power){
var currenBullet = new obj('<div class='+power+'></div>', player.posX+player.width1,
  player.posY + 17, 73, 50);
currenBullet.name.removeAttr('id');
if(Object.keys(bulletOdj).length === 0){
bulletOdj[Object.keys(bulletOdj).length] = currenBullet;}
else{
 bulletOdj[Object.keys(bulletOdj).length -(Object.keys(bulletOdj).length - 1)] = currenBullet;

}

var $container = $('#mainContainer');
$container.append(currenBullet.name);
currenBullet.name.css({
  'left': currenBullet.posX,
  'top': currenBullet.posY
});
$(document).keyup(function(event) {
  if(event.which === 90){

  var stop = setInterval(function(){
    currenBullet.posX+=20;
    currenBullet.name.css('left', currenBullet.posX);


    if(currenBullet.dimension()){
      currenBullet.name.remove();
     clearInterval(stop);
    }
  },100);
}
});
}
var fireBulletLeft = function(power){
var currenBullet = new obj('<div class='+power+'></div>', player.posX-73,
  player.posY + 17, 73, 50);
currenBullet.name.attr('id', 'player');
if(Object.keys(bulletOdj).length === 0){
bulletOdj[Object.keys(bulletOdj).length] = currenBullet;}
else{
 bulletOdj[Object.keys(bulletOdj).length -(Object.keys(bulletOdj).length - 1)] = currenBullet;
}

var $container = $('#mainContainer');
$container.append(currenBullet.name);
currenBullet.name.css({
  'left': currenBullet.posX,
  'top': currenBullet.posY
});
$(document).keyup(function(event) {
  if(event.which === 90){

  var stop = setInterval(function(){
    currenBullet.posX-=20;
    currenBullet.name.css('left', currenBullet.posX);



    if(currenBullet.dimension()){
      currenBullet.name.remove();
     clearInterval(stop);
    }
  },100);
}
});
}




var movePlayer = function(){
  $(document).keydown(function(event) {
    if(event.which === 38){
      player.posY-=6;
      player.name.css('top', player.posY+'px');
    }
    if(event.which === 40){
      player.posY+=6;
      player.name.css('top', player.posY+'px');
    }
    if(event.which === 39){
        player.posX+=10;
        player.name.css('left', player.posX+'px');
        player.name.removeAttr('id');
        player.direction = 'right';
        walkAnimation();
    }
    if(event.which === 37){
      player.posX-=10;
      player.name.css('left', player.posX+'px');
       player.name.attr('id', 'player');
       player.direction = 'left';
       walkAnimation();
    }
// if((player.posX < player1.posX + player1.width1
//   && player.posX + player.width1 > player1.posX
//   && player.posY < player1.posY + player1.height1
//   && player.posY + player.height1 > player1.posY)){
//   console.log("touched");
// }
player.dimension();
  });
}



var amount = 0;
var eventAsTheyHappen = function(){
movePlayer();
var stop =  setInterval(function(){
  $('#startGame').fadeOut(1000).fadeIn(1000);
  $(document).keydown(function(event) {
    if(event.which === 32){
  clearInterval(stop);
  $('#startGame').remove();

}
  });
},500)
$(document).keydown(function(event) {
  console.log(event.which);
    if(event.which === 32){
      var stop2 = setInterval(function(){
        if(amount < 1){
  amount++;
zombieGoingLeft('left');
//zombieGoingRight('right');

}
else{ clearInterval(stop2);
  }
      },4000);

}

  if(player.direction === 'right'){

  if(event.which === 90){
  fireBulletRight('bullet');
}
}

 else if(player.direction === 'left'){

  if(event.which === 90){
  fireBulletLeft('bullet');
}

}

});




}

$(document).ready(function() {
  eventAsTheyHappen();
});






  });


})();

