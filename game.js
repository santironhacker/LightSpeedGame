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

    // Game settings
    self.onEnd;
    self.finished = false;
    // self.score = 0;
    // self.level = 0;
    // self.speed = 2; 
    

    // CREATE PLAYER & ASTEROIDS
    self.player = new Player(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height);
    // self.asteroid = new Asteroid(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height);
    
    
    // FRAME
    function doFrame() {    
        // Logic
        // self.score++;
        
        // drawing
        self.ctx.clearRect(0, 0, self.canvasElement.width, self.canvasElement.height);
        checkIfDead();
        self.player.update();
        self.player.draw();
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

    function checkIfDead() {
        if(self.player.isDead === true) {
            self.finished = true;
            self.onEnd();

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

