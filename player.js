'use strict'

function Player (ctx, speed, canvasWidth, canvasHeight) {
    var self = this;

    self.canvasWidth = canvasWidth;
    self.canvasHeight = canvasHeight;
    self.speed = speed;
    self.ctx = ctx;
    self.stats = {
        x: 50,
        y: 80,
        width: 40,
        height: 30
    };
    self.isDead = false
}


Player.prototype.draw = function () {
    var self = this;
    console.log('speed is', self.speed)
    self.ctx.fillStyle = 'rgb(0, 255, 255)';
    self.ctx.fillRect(self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}


Player.prototype.update = function (key) {
    var self = this;
    console.log(key)
    // console.log('update done')
    if (key === 'o') {
        self.stats.y = self.stats.y - 10;
    }
    console.log(self.stats.y)
    if (key === 'l') {
        self.stats.y = self.stats.y + 10;
    }
    if (key === 'k') {
        self.stats.x = self.stats.x - 10;
    }

    if (self.stats.y < 5) {
        self.stats.y = 10; 
    }
    if (self.stats.y > self.canvasHeight - 30) {
         self.stats.y = self.canvasHeight - 30; 
    }
    if (self.stats.x < 10) {
        self.isDead = true
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