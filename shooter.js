console.log("loeaded");
"use strict";
(function(){
  $(document).ready(function() {
    //global variable
var index1 = 1;
var active = false;
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
  posX: 750,
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
//this.burned = fireCollision;
}

var initialize = function(){
this.name = '';
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
thing.posX-=10;
thing.name.css('left', thing.posX);
thing.dimension();

if((thing.posX < player.posX + player.width1 - 20
  && thing.posX + thing.width1 - 20 > player.posX
  && thing.posY < player.posY + player.height1
  && thing.posY + thing.height1 > player.posY)){
 clearInterval(stop11);
  var $currentplayer = $('.player');
  $currentplayer.remove();
  $('#mainContainer').html("");
  $('#mainContainer').css('background', "url('images/gameover.jpg')");
  $('#mainContainer').css('background-repeat', "no-repeat");
  $('#mainContainer').css('background-size', "cover");
  $('#try').css('opacity', '1');
  thing.name.remove();
  thing = new initialize();
}
else if(bulletCollision(thing, -10)){
  if(thing.name.children('.HIT').length === 3){
  clearInterval(stop11);
 thing.name.remove();
 thing = new initialize();
 if($('.zombieFinal').length === 0){
   setTimeout(bigBoss, 3000);
 }
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
thing.posX+=10;
thing.name.css('left', thing.posX);
thing.dimension();

if((thing.posX < player.posX + player.width1 - 20
  && thing.posX + thing.width1 - 20 > player.posX
  && thing.posY < player.posY + player.height1
  && thing.posY + thing.height1  > player.posY)){
 clearInterval(stop1);
  var $currentplayer = $('.player');
  $currentplayer.remove();
  $('#mainContainer').html("");
  $('#mainContainer').css('background', "url('images/gameover.jpg')");
    $('#mainContainer').css('background-repeat', "no-repeat");
  $('#mainContainer').css('background-size', "cover");
  $('#try').css('opacity', '1');
  thing.name.remove();
  thing = new initialize();

}
else if(bulletCollision(thing, -10)){

  if(thing.name.children('.HIT').length === 3){
 clearInterval(stop1);
 thing.name.remove();
 thing = new initialize();
   if($('.zombieFinal').length === 0){
   setTimeout(bigBoss, 3000);
 }
  }
}

}, 500);

}//>4

  },500);
}

var threwFlame = function(fires){
  setTimeout(function(){
  var stop4 = setInterval(function(){
    if(bowser.name === ''){clearInterval(stop4);}
    if(bowser.name !== ''){
      fires.name.css('opacity', 1);

    fires.name.css({
      'left': fires.posX-=10,
      'top': fires.posY++
    });
  }
    if(fires.dimension()){
      clearInterval(stop4);
      fires.name.remove();
      fires = new initialize();
      bigBoss();
    }
    else if(fireCollision(fires)){
      if(player.name.children('.burn').length === 2){
        clearInterval(stop4);
  player.name.remove();
  player = new initialize();
      fires.name.remove();
      fires = new initialize();
       $('#mainContainer').html("");
  $('#mainContainer').css('background', "url('images/gameover.jpg')");
    $('#mainContainer').css('background-repeat', "no-repeat");
  $('#mainContainer').css('background-size', "cover");
  $('#try').css('opacity', '1');
}else{
      clearInterval(stop4);
      fires.name.remove();
      fires = new initialize();
      bigBoss();}
    }

    },100);
},3000);
}

var fireCollision = function(fireThrown){
if((fireThrown.posX < player.posX + player.width1 - 10
  && fireThrown.posX + fireThrown.width1 - 10 > player.posX
  && fireThrown.posY < player.posY + player.height1
  && fireThrown.posY + fireThrown.height1 > player.posY)){
  player.name.append('<div class="burn" ></div>');

  return true;
}
return false;
}

var bigBoss = function(){
active = true;
bowser.name.css('opacity', '1');
//bulletCollision(bowser);
//var stop4 = setInterval(function(){
   if(bowser.name !== ''){
    var fire = new obj('<div id="fire" ></div>'
      ,bowser.posX +60, bowser.posY +30, 100, 120);
    var $container = $('#mainContainer');

    $container.append(fire.name);
    threwFlame(fire);}

    // fire.name.css('opacity', 1);
    // fire.name.css({
    //   'left': fire.posX+=10,
    //   'top': fire.posY++
    // });
//},5000);
}



var bulletCollision = function(currentEnemy, off){
  if(Object.keys(bulletOdj).length > 0){
    console.log("enemies"+bulletOdj);
    for(var i in bulletOdj){
  if((currentEnemy.posX < bulletOdj[i].posX + bulletOdj[i].width1 + off
  && currentEnemy.posX + currentEnemy.width1 + off > bulletOdj[i].posX
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

bulletOdj[Object.keys(bulletOdj).length] = currenBullet;

var $container = $('#mainContainer');
$container.append(currenBullet.name);
currenBullet.name.css({
  'left': currenBullet.posX,
  'top': currenBullet.posY
});
$(document).keyup(function(event) {
  if(event.which === 90){
$('#zKey').css('border', '0px');
$('#zKey').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0)');
  var stop = setInterval(function(){
    currenBullet.posX+=20;
    currenBullet.name.css('left', currenBullet.posX);
    if(active === true){
 if(bulletCollision(bowser, -150)){
      if(bowser.name.children('.HIT').length === 8){
        bowser.name.remove();
        bowser = new initialize();
        $('#mainContainer').html("");
  $('#mainContainer').css('background', "url('images/win.png')");
    $('#mainContainer').css('background-repeat', "no-repeat");
  $('#mainContainer').css('background-size', "cover");
    $('#try').css('opacity', '1');
      }
    }
}

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

bulletOdj[Object.keys(bulletOdj).length] = currenBullet;


var $container = $('#mainContainer');
$container.append(currenBullet.name);
currenBullet.name.css({
  'left': currenBullet.posX,
  'top': currenBullet.posY
});
$(document).keyup(function(event) {
  if(event.which === 90){
$('#zKey').css('border', '0px');
$('#zKey').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0)');
  var stop = setInterval(function(){
    currenBullet.posX-=20;
    currenBullet.name.css('left', currenBullet.posX);
// debugger;
    if(active === true){
 if(bulletCollision(bowser, -150)){
      if(bowser.name.children('.HIT').length === 8){
        bowser.name.remove();
        bowser = new initialize();
      }
    }
}


    if(currenBullet.dimension()){
      currenBullet.name.remove();
      // currenBullet = new initialize();
     clearInterval(stop);
    }
  },100);
}
});
}




var movePlayer = function(){
  $(document).keydown(function(event) {
    if(event.which === 38){
       $('#upKey').css('border', '3px solid white');
    $('#upKey').css('box-shadow', '1px 2px 80px 30px black');
      console.log(event.which);
      player.posY-=6;
      player.name.css('top', player.posY+'px');
    }
    if(event.which === 40){
       $('#downKey').css('border', '3px solid white');
    $('#downKey').css('box-shadow', '1px 2px 80px 30px black');
      player.posY+=6;
      player.name.css('top', player.posY+'px');
    }
    if(event.which === 39){
       $('#rightKey').css('border', '3px solid white');
    $('#rightKey').css('box-shadow', '1px 2px 80px 30px black');
        player.posX+=10;
        player.name.css('left', player.posX+'px');
        player.name.removeAttr('id');
        player.direction = 'right';
        walkAnimation();
    }
    if(event.which === 37){
       $('#leftKey').css('border', '3px solid white');
    $('#leftKey').css('box-shadow', '1px 2px 80px 30px black');
      player.posX-=10;
      player.name.css('left', player.posX+'px');
       player.name.attr('id', 'player');
       player.direction = 'left';
       walkAnimation();
    }
    if(active === true){
if((player.posX < bowser.posX + bowser.width1 - 140
  && player.posX + player.width1 - 140 > bowser.posX
  && player.posY < bowser.posY + bowser.height1
  && player.posY + player.height1 > bowser.posY)){
  player.name.remove();
  player = new initialize();
}}

$(document).keyup(function(event) {
  if(event.which === 38){
      $('#upKey').css('border', '0px');
      $('#upKey').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0)');
    }
    if(event.which === 40){
      $('#downKey').css('border', '0px');
      $('#downKey').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0)');
    }
    if(event.which === 39){
        $('#rightKey').css('border', '0px');
        $('#rightKey').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0)');
    }
    if(event.which === 37){
       $('#leftKey').css('border', '0px');
       $('#leftKey').css('box-shadow', '0px 0px 0px 0px rgba(0,0,0,0)');
    }
});

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

$('#gameStory').click(function(event) {
  $('#game').css('opacity', '1');
  $('#user').css('opacity', '0');
});

$('#userStory').click(function(event) {
  $('#user').css('opacity', '1');
  $('#game').css('opacity', '0');
});

$(document).keydown(function(event) {
  console.log(event.which);
    if(event.which === 32){
      $('#gameStory').css('opacity', '0');
      $('#userStory').css('opacity', '0');
      $('#game').css('opacity', '0');
      $('#user').css('opacity', '0');

      $('#zKey').css('opacity', '1');
      $('#upKey').css('opacity', '1');
      $('#rightKey').css('opacity', '1');
      $('#leftKey').css('opacity', '1');
      $('#downKey').css('opacity', '1');

      var stop2 = setInterval(function(){
        if(amount < 6){
  amount++;
zombieGoingLeft('left');
zombieGoingRight('right');

}
else{ clearInterval(stop2);
  }
      },4000);

}

  if(player.direction === 'right'){

  if(event.which === 90){
    $('#zKey').css('border', '3px solid white');
    $('#zKey').css('box-shadow', '1px 2px 80px 30px black');
  fireBulletRight('bullet');
}
}

 else if(player.direction === 'left'){

  if(event.which === 90){
    $('#zKey').css('border', '3px solid white');
    $('#zKey').css('box-shadow', '1px 2px 80px 30px black');
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

