'use strict'

function Asteroid (ctx, speed, canvasWidth, canvasHeight) {
    var self = this;

    self.canvasWidth = canvasWidth;
    self.canvasHeight = canvasHeight;
    self.speed = speed;
    self.ctx = ctx;
    self.stats = {
        x: 500,
        y: Math.random() * canvasHeight,
        width: 60,
        height: 60
    };
    self.isOut = false;

    self.asteroidImg = new Image();
    self.asteroidImg.src = './images/asteroid.png';
}


Asteroid.prototype.draw = function () {
    var self = this;
    console.log('Asteroid speed is:' + self.speed)
    self.ctx.drawImage(self.asteroidImg, self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}


Asteroid.prototype.update = function () {
    var self = this;
    self.stats.x = self.stats.x - 1*(self.speed);
    if(self.stats.x < 0) {
        self.isOut = true;
    }
}