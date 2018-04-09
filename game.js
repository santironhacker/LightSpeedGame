'use strict'

function Game (siteMain, level) {
  var self = this;
  
  // Create DOM elements: canvas and quit game
  self.siteMain = siteMain;
  self.canvasElement = document.createElement('canvas');
  self.canvasElement.width = 600;
  self.canvasElement.height = 400;
  siteMain.appendChild(self.canvasElement);
  self.ctx = self.canvasElement.getContext('2d');

  // Set image background
  self.backImg = new Image();
  self.backImg.src = './images/spaceBackSimple.jpg';

  // Set game music
  self.gameMusic = document.createElement('audio');
  self.gameMusic.setAttribute('src', './sounds/StarWarsAsteroidField.mp3');
  self.gameMusic.setAttribute('autoplay', 'true');
  siteMain.appendChild(self.gameMusic);

  // self.lastAsteroidCreatedAt = null;

  // Game settings
  self.onEnd = null;
  self.finished = false;
  self.level = level;
  self.speed = self.level + 1; 
  self.runTime = true;
  intervalLevelManager(self.runTime);

  function intervalLevelManager(runTime) {
    if(runTime) {
      self.levelIDmanager = setInterval(function () {
          self.speed += 1.5;
          self.level += 1;
      }, 6000);
    }
    else {
      clearInterval(self.levelIDmanager);
    }
  }


  // CREATE PLAYER & ASTEROIDS & CAZAS
  self.player = new Player(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height);

  self.asteroids = [];
  self.launchAsteroids = true; 
  
  self.cazas = [];
  self.launchCazas = true; 
  
  // intervalIDasteroids = window.setInterval(function () {
    //     self.asteroids.push(new Asteroid(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height));    
    // }, 1000);
    
    self.intervalAsteroidsManager = function(launchAsteroids) {
      if(launchAsteroids)
      self.intervalIDasteroids = setInterval(function () {
        self.asteroids.push(new Asteroid(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height));    
      }, 1000);
      else {
        clearInterval(self.intervalIDasteroids);
      }
    }
    self.intervalAsteroidsManager(self.launchAsteroids);

    self.intervalCazasManager = function (launchCazas) {
      if(launchCazas)
      self.intervalIDcazas = setInterval(function () {
        self.cazas.push(new Caza(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height));    
      }, 2200);
      else {
        clearInterval(self.intervalIDcazas);
      }
    }
    self.intervalCazasManager(self.launchCazas);

  // PLAYER KEY COMMANDS & FIRE
  self.fires = [];
  self.handleKeyDown = function (event) {
    var key = event.key.toLowerCase();
    if(key === 'q') {
      self.finished = true;
      self.onGameQuit();
    }
    self.player.update(key);
    if(key === ' ') {
      self.fire = self.fires.push(new Fire(self.ctx, self.player.stats.x, self.player.stats.y, self.player.stats.width, self.player.stats.height, self.canvasElement.width));
    }
  } 

  document.addEventListener('keydown', self.handleKeyDown);


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
    self.fires.forEach(function(element) {
      element.update();
    });
    self.cazas.forEach(function(element) {
      element.update();
    });
    
    self.player.draw();
    if(self.fires) {
      self.fires.forEach(function(element){
        element.draw();
      });
    }
    self.asteroids.forEach(function(element) {
      element.draw();
    });
    self.cazas.forEach(function(element){
      element.draw();
    });

    self.ctx.font = '20px Arial, sans-serif';
    self.ctx.fillStyle = 'yellow';
    self.ctx.fillText('LEVEL: ' + self.level,  10, 25, 140);

    // Collision function
    function collision (upObjectA, downObjectA, rightObjectA, leftObjectA, upObjectB, downObjectB, rightObjectB, leftObjectB) {
      var collisionCondition1 = ( ((rightObjectA > leftObjectB)&&(leftObjectA < leftObjectB)) && (((upObjectA < downObjectB)&&(downObjectA > downObjectB)) || ((downObjectA > upObjectB)&&(upObjectA < upObjectB))) );
      var collisionCondition2 = ( ((leftObjectA < rightObjectB)&&(rightObjectA > rightObjectB)) && (((upObjectA < downObjectB)&&(downObjectA > downObjectB)) || ((downObjectA > upObjectB)&&(upObjectA < upObjectB))) );

      if(collisionCondition1 || collisionCondition2) {
        return true;
      }
    }
    
    // Detect player collision
    self.asteroids.forEach(function(element) {
      if(collision(self.player.stats.y, self.player.stats.y + self.player.stats.height, self.player.stats.x + self.player.stats.width, self.player.stats.x, element.stats.y, element.stats.y + element.stats.height, element.stats.x + element.stats.width, element.stats.x)) {
        self.player.isDead = true;
      };
    });

    self.cazas.forEach(function(element) {
      if(collision(self.player.stats.y, self.player.stats.y + self.player.stats.height, self.player.stats.x + self.player.stats.width, self.player.stats.x, element.stats.y, element.stats.y + element.stats.height, element.stats.x + element.stats.width, element.stats.x)) {
        self.player.isDead = true;
      };
    });

    // Detect cazas collision
    // self.cazas.forEach(function(caza) {
    //   self.fires.forEach(function(fire) {
    //     if(collision(fire.stats.y, fire.stats.y + fire.stats.height, fire.stats.x + fire.stats.width, fire.stats.x, caza.stats.y, caza.stats.y + caza.stats.height, caza.stats.x + caza.stats.width, caza.stats.x)) {
    //       self.cazas.splice(self.cazas.indexOf(caza),1);
    //       // caza.resistance -= fire.attack; 
    //       // if(caza.resistance <= 0) {
    //       //   console.log(self.cazas);
          // }
    //     }
    //   });
    // });

    // self.asteroids.forEach(function(element) {

    //   var collisionUpPlayer = self.player.stats.y;
    //   var collisionDownAsteroid = element.stats.y + element.stats.height;

    //   var collisionDownPlayer = self.player.stats.y + self.player.stats.height;
    //   var collisionUpAsteroid = element.stats.y;

    //   var collisionLeftPlayer = self.player.stats.x;
    //   var collisionRightAsteroid = element.stats.x + element.stats.width;

    //   var collisionRighPlayer = self.player.stats.x + self.player.stats.width;
    //   var collisionLeftAsteroid = element.stats.x;

    //   var collisionCondition1 = ( ((collisionRighPlayer > collisionLeftAsteroid)&&(collisionLeftPlayer < collisionLeftAsteroid))  &&   (((collisionUpPlayer < collisionDownAsteroid)&&(collisionDownPlayer > collisionDownAsteroid)) || ((collisionDownPlayer > collisionUpAsteroid)&&(collisionUpPlayer < collisionUpAsteroid))) );
    //   var collisionCondition2 = ( ((collisionLeftPlayer < collisionRightAsteroid)&&(collisionRighPlayer > collisionRightAsteroid)) &&  (((collisionUpPlayer < collisionDownAsteroid)&&(collisionUpPlayer > collisionUpAsteroid)) || ((collisionDownPlayer > collisionUpAsteroid)&&(collisionDownPlayer < collisionDownAsteroid))) );

      
    //   if (collisionCondition1 || collisionCondition2) {
    //     self.player.isDead = true;
    //   }
    // });


    checkIsAsteroidOut();
    checkIsCazaOut();
    checkIsFireOut();
    checkIfDead();

    if (!self.finished) {
        window.requestAnimationFrame(doFrame);
    }
  }



  // Check if player has collided & restart level
  function checkIfDead() {
    if(self.level === 10) {
      self.finished = true;

      self.purpleFire = new Image();
      self.purpleFire.src = './images/purple-fire.png';
      self.purpleFire.pos = {
        x: self.player.stats.x - 30,
        y: self.player.stats.y + (self.player.stats.height/2) - (12/2),
        width: 30,
        height: 12
      }
      self.speeder = 30;

      self.promise = finalAnimation()
      // .then( => {console.log("It worked!")})
      // .then(function() {
        // })
        
      function finalAnimation() {
        document.removeEventListener('keydown', self.handleKeyDown);
        self.finalAnimation = setInterval(function() {
          self.ctx.clearRect(0, 0, self.canvasElement.width, self.canvasElement.height);
          self.ctx.drawImage(self.backImg, 0, 0, 600, 400);
          self.player.draw();
          self.ctx.drawImage(self.purpleFire, self.purpleFire.pos.x, self.purpleFire.pos.y, self.purpleFire.pos.width, self.purpleFire.pos.height);
          self.purpleFire.pos.x += self.speeder;
          self.player.stats.x += self.speeder;
          if(self.purpleFire.pos.x > self.canvasElement.width) {
            clearInterval(self.finalAnimation);
            self.onEnd();
          }
        }, 80);
      }
    }
    
    if(self.player.isDead === true) {
      self.finished = true;
      onRestart();

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

  // Erase asteroids, fire and cazas that reach canvas border
  function checkIsAsteroidOut() {
    for (var i=0; i < self.asteroids.length; i++) {
      if(self.asteroids[i].isAsteroidOut === true) {
        self.asteroids.splice(i, 1);
      }
    }
  }

  function checkIsFireOut() {
    for (var i = 0; i < self.fires.length; i++) {
      if(self.fires[i].isFireOut === true) {
        self.fires.splice(i, 1);
      }
    }
  }

  function checkIsCazaOut() {
    for (var i = 0; i < self.cazas.length; i++) {
      if(self.cazas[i].isCazaOut === true) {
        self.cazas.splice(i, 1);
      }
    }
  }

  // function checkIsFireOut() {
  //   for (var i=0; i < self.asteroids.length; i++) {
  //     if(self.asteroids[i].isAsteroidOut === true) {
  //       self.asteroids.splice(i, 1);
  //     }
  //   }
  // }


  function onRestart() {
    // Draw explosion
    self.explosion1 = new Image();
    self.explosion1.src = './images/explosion1.png';
    self.sizer = 1;
    self.explosion1.pos = {
      x: self.player.stats.x - 10,
      y: self.player.stats.y - 10,
      width: self.player.stats.width + 20,
      height: self.player.stats.height + 20
    }
    setInterval(function() {
      self.ctx.drawImage(self.explosion1, self.explosion1.pos.x - (self.sizer/2), self.explosion1.pos.y - (self.sizer/2), self.explosion1.pos.width + self.sizer, self.explosion1.pos.height + self.sizer);
      self.sizer++;
    }, 100);

    // Clear level timer
    self.runTime = false;
    intervalLevelManager(self.runTime);
    // Clear asteroids interval
    self.launchAsteroids = false; 
    self.intervalAsteroidsManager(self.launchAsteroids);
    // Clear asteroids interval
    self.launchCazas = false; 
    self.intervalCazasManager(self.launchCazas);

    window.setTimeout(function() {
      // Reset asteroids
      self.asteroids = [];
      self.launchAsteroids = true; 
      self.intervalAsteroidsManager(self.launchAsteroids);
      // Reset cazas
      self.cazas = [];
      self.launchCazas = true; 
      self.intervalCazasManager(self.launchCazas);
      // Reset player
      self.player.stats.x = 50;
      self.player.stats.y = 200;
      // Reset fire
      self.fires = [];
      // Reset game settings
      self.player.isDead = false;
      self.finished = false;
      // Launch level timer again
      self.runTime = true;
      intervalLevelManager(self.runTime);
      doFrame();
    }, 2000);
  }


}


// GAME QUIT
Game.prototype.onGameQuit = function (callback) {
  var self = this;
  self.onGameQuit = callback;
}

// LAUNCH YOU WIN
Game.prototype.onGameSuccess = function (callback) {
  var self = this;
  self.onEnd = callback;
}

// ERASE GAME COPY & LISTENERS (callback from index)
Game.prototype.destroy = function () {
  var self = this;
  self.launchAsteroids = false;
  self.intervalAsteroidsManager(self.launchAsteroids);
  self.launchCazas = false;
  self.intervalCazasManager(self.launchCazas);
  self.canvasElement.remove();
  document.removeEventListener('keydown', self.handleKeyDown);
  self.gameMusic.remove();
}

