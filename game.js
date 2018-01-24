'use strict'

function Game (siteMain) {
    var self = this;

    self.onEnd;
    
    // Create DOM elements: canvas 
    self.siteMain = siteMain;
    self.canvasElement = document.createElement('canvas');
    self.canvasElement.width = 600;
    self.canvasElement.height = 400;
    siteMain.appendChild(self.canvasElement);
    self.ctx = self.canvasElement.getContext('2d');

    // Game settings
    self.finished = false;
    self.score = 0;
    self.level = 0;

    self.speed = 2;

    self.player = new Player(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height);
    self.asteroid = new Asteroid(self.ctx, self.speed, self.canvasElement.width, self.canvasElement.height);
    
    
    
    function checkIfDead(){
        // debugger;
        if(self.player.isDead === true){
            self.finished = true;
        }
    }
    
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
            // debugger;
            window.requestAnimationFrame(doFrame);
        }
        else if (self.finished){
            destroy();
        }
 
    }

    window.requestAnimationFrame(doFrame);

    self.handleKeyDown = function (event) {
        var key = event.key.toLowerCase();
        console.log(key);
        self.player.update(key);
    } 

    

    document.addEventListener('keydown', self.handleKeyDown);
}

Game.prototype.onGameOver = function (callback) {
    var self = this;

    self.onEnd = callback;
}

Game.prototype.destroy = function () {
    debugger;
    self.finished = true;
    document.removeEventListener('keydown', self.handleKeyDown);
    self.canvasElement.remove();
    destroyGame();
    youWin();
}

