'use strict'

function Player (ctx, speed, canvasWidth, canvasHeight) {
    var self = this;

    self.canvasWidth = canvasWidth;
    self.canvasHeight = canvasHeight;
    self.speed = speed;
    self.ctx = ctx;
    self.stats = {
        width: 40,
        height: 30,
        x: 50,
        y: canvasHeight/2 - 15
    };
    self.isDead = false;
}


Player.prototype.draw = function () {
    var self = this;
    console.log('Player speed is', self.speed)
    self.ctx.fillStyle = 'rgb(0, 255, 255)';
    self.ctx.fillRect(self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}


Player.prototype.update = function (key) {
    var self = this;
    console.log(key);

    if (key === 'o') {
        self.stats.y = self.stats.y - 15;
    }
    if (key === 'l') {
        self.stats.y = self.stats.y + 15;
    }
    if (key === 'k') {
        self.stats.x = self.stats.x - 15;
    }
    if (key === 'ñ') {
        self.stats.x = self.stats.x + 15;
    }

    if (self.stats.y < 0) {
        self.stats.y = 0; 
    }
    if (self.stats.y > self.canvasHeight - self.stats.height) {
         self.stats.y = self.canvasHeight - self.stats.height; 
    }
    if (self.stats.x < 0) {
        self.isDead = true;
        //self.stats.x = 0;
    }
    if (self.stats.x + self.stats.width > self.canvasWidth) {
        self.stats.x = self.canvasWidth - self.stats.width;
    }
}





    // INSERT PLAYER IMAGE 
    // var sourceX = 0;
    // var sourceY = 0;
    // var sourceWidth = 150;
    // var sourceHeight = 150;
    // var destWidth = sourceWidth;
    // var destHeight = sourceHeight;
    // var destX = canvasElement.width / 2 - destWidth / 2;
    // var destY = canvasElement.height / 2 - destHeight / 2;

    // var imageObj = {};
    // imageObj.src = 'https://www.html5canvastutorials.com/demos/assets/darth-vader.jpg';

    // ctx.drawImage(imageObj, sourceX, sourceY, sourceWidth, sourceHeight, destX, destY, destWidth, destHeight);

    // var img = new Image();
    // img.src = 'http://hdwpro.com/space-image.html';