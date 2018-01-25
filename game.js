'use strict'

function Game (siteMain) {
    var self = this;
    
    // Create DOM elements: canvas 
    self.siteMain = siteMain;
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.setAttribute
    self.canvasElement.width = 600;
    self.canvasElement.height = 400;
    siteMain.appendChild(self.canvasElement);
    self.ctx = self.canvasElement.getContext('2d');

    // Game settings
    self.onEnd;
    self.finished = false;
    self.speed = 2; 
    
    // self.score = 0;
    // self.level = 0;

    

    // CREATE PLAYER & ASTEROIDS
    self.player = new Player(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height);
    self.asteroids = [];
    window.setInterval(function () {
        self.asteroids.push(new Asteroid(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height));    
    }, 500);
    
    // FRAME
    function doFrame() {    
        
        // self.score++;
        self.ctx.clearRect(0, 0, self.canvasElement.width, self.canvasElement.height);
        self.player.update();
        self.asteroids.forEach(function(element) {
            element.update();
        });
        
        self.player.draw();
        self.asteroids.forEach(function(element) {
            element.draw();

        // Detect collision (respective to the player)
        self.asteroids.forEach(function(element) {

        // var playerNEx = self.player.stats.x + self.player.stats.width; 
        // var playerNEy = self.player.stats.y;
        
        // var playerSEx = self.player.stats.x + self.player.stats.width;
        // var playerSEy = self.player.stats.y + self.player.stats.width;
        
        // var playerSWx = self.player.stats.x;
        // var playerSWy = self.player.stats.y + self.player.stats.height; 

        // var playerNWx = self.player.stats.x;
        // var playerNWy = self.player.stats.y;


        // var asteroidNEx = element.stats.x + element.stats.width;
        // var asteroidNEy = element.stats.y;

        // var asteroidSEx = element.stats.x + element.stats.width;
        // var asteroidSEy = element.stats.y + element.stats.height;

        // var asteroidSWx = element.stats.x;
        // var asteroidSWy = element.stats.y + element.stats.height;

        // var asteroidNWx = element.stats.x;
        // var asteroidNWy = element.stats.y;

        var collisionUpPlayer = self.player.stats.y;
        var collisionDownAsteroid = element.stats.y + element.stats.height;

        var collisionDownPlayer = self.player.stats.y + self.player.stats.height;
        var collisionUpAsteroid = element.stats.y;

        var collisionLeftPlayer = self.player.stats.x;
        var collisionRightAsteroid = element.stats.x + element.stats.width;

        var collisionRighPlayer = self.player.stats.x + self.player.stats.width;
        var collisionLeftAsteroid = element.stats.x;

        // var collisionRight = collisionRighPlayer > collisionLeftAsteroid;
        // var collisionUp = collisionUpPlayer > collisionDownAsteroid;

        // var collisionDown = collisionDownPlayer > collisionUpAsteroid;
        // var collisionLeft = collisionLeftPlayer > collisionRightAsteroid;


        var collisionCondition1 = ( ((collisionRighPlayer > collisionLeftAsteroid)&&(collisionLeftPlayer < collisionLeftAsteroid))  &&   (((collisionUpPlayer < collisionDownAsteroid)&&(collisionDownPlayer > collisionDownAsteroid)) || ((collisionDownPlayer > collisionUpAsteroid)&&(collisionUpPlayer < collisionUpAsteroid))) );
        // var collisionCondition2 = ( (collisionRighPlayer > collisionLeftAsteroid) && (collisionLeftPlayer < collisionRightAsteroid) || (collisionUpPlayer < collisionDownAsteroid) )

        if (collisionCondition1) {
            debugger;
            // self.player.isDead = true;
        }
        });

        

        
        
        checkIfDead();
        checkIsOut();
        
        });
        // self.ctx.font = '20px Arial, sans-serif';
        // self.ctx.fillStyle = 'black';
        // self.ctx.fillText('SCORE:' + self.score,  10, 50);   

        

        if (!self.finished) {
            window.requestAnimationFrame(doFrame);
        }
    }
    window.requestAnimationFrame(doFrame);

    // PLAYER KEY COMMANDS
    self.handleKeyDown = function (event) {
        var key = event.key.toLowerCase();
        console.log(key);
        self.player.update(key);
    } 

    document.addEventListener('keydown', self.handleKeyDown);

    // Check if player has collided & restart level
    function checkIfDead() {
        if(self.player.isDead === true) {
            self.finished = true;
            self.onEnd();
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
    self.canvasElement.remove();
    
}

