'use strict'

function Asteroid (ctx, speed, canvasWidth, canvasHeight) {
    var self = this;

    self.canvasWidth = canvasWidth;
    self.canvasHeight = canvasHeight;
    self.speed = speed;
    self.ctx = ctx;
    self.stats = {
        x: canvasWidth,
        y: 10 + Math.random() * (canvasHeight-40),
        width: 30,
        height: 30
    };
    self.isAsteroidOut = false;

    self.asteroidImg = new Image();
    self.asteroidImg.src = './images/asteroid.png';
}


Asteroid.prototype.draw = function () {
    var self = this;
    self.ctx.drawImage(self.asteroidImg, self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}


Asteroid.prototype.update = function () {
    var self = this;
    self.stats.x = self.stats.x - 1*(self.speed);
    // self.stats.x = self.stats.x - 2;
    if(self.stats.x < 0) {
        self.isAsteroidOut = true;
    }
}