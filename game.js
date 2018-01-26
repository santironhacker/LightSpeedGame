'use strict'

function Game (siteMain) {
  var self = this;
  
  // Create DOM elements: canvas 
  self.siteMain = siteMain;
  self.canvasElement = document.createElement('canvas');
  self.canvasElement.width = 600;
  self.canvasElement.height = 400;
  siteMain.appendChild(self.canvasElement);
  self.ctx = self.canvasElement.getContext('2d');

  // Audio
  self.gameMusic = document.createElement('audio');
  self.gameMusic.setAttribute('src', './sounds/StarWarsAsteroidField.mp3');
  self.gameMusic.setAttribute('autoplay', 'true');
  siteMain.appendChild(self.gameMusic);

  //self.audioElement = document.createElement('audio');
  //self.audioElement.innerHTML('<source src="./sounds/StarWarsMainTheme.mp3" type="audio.mp3"/>')
  
  
  // self.snd = new Audio("./sounds/StarWarsMainTheme.mp3");
  // self.snd.play();

  // Set image background
  self.backImg = new Image();
  self.backImg.src = './images/SpaceBacksimple.jpg';

  // self.lastAsteroidCreatedAt = null;

  // Game settings
  self.onEnd = null;
  self.finished = false;
  self.speed = 2; 
  self.level = 1;
  // self.score = 0;

  window.setInterval(function () {
      self.speed += 1.5;
      self.level += 1;
  }, 10000);

  // CREATE PLAYER & ASTEROIDS
  self.player = new Player(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height);
  self.asteroids = [];
  self.launchAsteroids = true; 
  intervalAsteroidsManager(self.launchAsteroids);
  self.intervalIDasteroids;

  // intervalIDasteroids = window.setInterval(function () {
  //     self.asteroids.push(new Asteroid(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height));    
  // }, 1000);

  function intervalAsteroidsManager(launchAsteroids) {
    if(launchAsteroids)
      self.intervalIDasteroids = setInterval(function () {
        self.asteroids.push(new Asteroid(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height));    
      }, 1000);
    else {
      clearInterval(self.intervalIDasteroids);
    }
  }

  // FRAME
  window.requestAnimationFrame(doFrame);

  function doFrame() {
    // self.score++;
    self.ctx.clearRect(0, 0, self.canvasElement.width, self.canvasElement.height);
    self.ctx.drawImage(self.backImg, 0, 0, 600, 400);

    // is is time to add another asteroid?
    // var now = Date.now();
    // if (!self.lastAsteroidCreatedAt || now - self.lastAsteroidCreatedAt > 1000) {
    //   asteroids.pus(.....)
    //   self.lastAsteroidCreatedAt = Date.now();
    // }
    
    self.player.update();
    self.asteroids.forEach(function(element) {
      element.update();
    });
    
    self.player.draw();
    self.asteroids.forEach(function(element) {
      element.draw();
    });

    self.ctx.font = '20px Arial, sans-serif';
    self.ctx.fillStyle = 'yellow';
    self.ctx.fillText('LEVEL: ' + self.level,  10, 25, 140);

    // Detect collision (respective to the player)
    self.asteroids.forEach(function(element) {

      var collisionUpPlayer = self.player.stats.y;
      var collisionDownAsteroid = element.stats.y + element.stats.height;

      var collisionDownPlayer = self.player.stats.y + self.player.stats.height;
      var collisionUpAsteroid = element.stats.y;

      var collisionLeftPlayer = self.player.stats.x;
      var collisionRightAsteroid = element.stats.x + element.stats.width;

      var collisionRighPlayer = self.player.stats.x + self.player.stats.width;
      var collisionLeftAsteroid = element.stats.x;

      var collisionCondition1 = ( ((collisionRighPlayer > collisionLeftAsteroid)&&(collisionLeftPlayer < collisionLeftAsteroid))  &&   (((collisionUpPlayer < collisionDownAsteroid)&&(collisionDownPlayer > collisionDownAsteroid)) || ((collisionDownPlayer > collisionUpAsteroid)&&(collisionUpPlayer < collisionUpAsteroid))) );
      var collisionCondition2 = ( ((collisionLeftPlayer < collisionRightAsteroid)&&(collisionRighPlayer > collisionRightAsteroid)) &&  (((collisionUpPlayer < collisionDownAsteroid)&&(collisionUpPlayer > collisionUpAsteroid)) || ((collisionDownPlayer > collisionUpAsteroid)&&(collisionDownPlayer < collisionDownAsteroid))) );

      if (collisionCondition1 || collisionCondition2) {
          self.player.isDead = true;
      }
    });
    
    checkIsOut();
    checkIfDead();

    if (!self.finished) {
        window.requestAnimationFrame(doFrame);
    }
  }


  // PLAYER KEY COMMANDS
  self.handleKeyDown = function (event) {
    var key = event.key.toLowerCase();
    console.log(key);
    self.player.update(key);
  } 

  document.addEventListener('keydown', self.handleKeyDown);

  // Check if player has collided & restart level
  function checkIfDead() {
    if(self.level === 10) {
      self.finished = true;
      self.onEnd();
    }
    if(self.player.isDead === true) {
      self.finished = true;
      self.onEnd();
      // self.launchAsteroids = false; 
      // intervalAsteroidsManager(self.launchAsteroids);
      
      // self.intervalIDasteroids;
      // self.launchAsteroids = true; 
      // intervalAsteroidsManager(self.launchAsteroids);

      // self.ctx.clearRect(0, 0, self.canvasElement.width, self.canvasElement.height);
      // window.clearInterval(self.intervalIDasteroids);
      // self.intervalIDasteroids;
      // window.setTimeout(intervalIDasteroids, 0);
      // clearRect(self.player.stats.x, self.player.stats.y, self.player.stats.width, self.player.stats.height);
      // self.player.draw()
    }
  }

  // Erase asteroids that reach left border from the array of asteroids
  function checkIsOut() {
    for (var i=0; i < self.asteroids.length; i++) {
      if(self.asteroids[i].isOut === true) {
        self.asteroids.splice(i, 1);
      }
    }
  }
}


// LAUNCH YOU WIN
Game.prototype.onGameOver = function (callback) {
  var self = this;
  self.onEnd = callback;
};


// ERASE GAME COPY & LISTENERS (callback from index)
Game.prototype.destroy = function () {
  var self = this;
  document.removeEventListener('keydown', self.handleKeyDown);
  self.gameMusic.remove();
  self.canvasElement.remove();
}

