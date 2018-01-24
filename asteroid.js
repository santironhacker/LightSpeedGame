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
        width: 40,
        height: 30
    };
    self.isOut = false;
}


Asteroid.prototype.draw = function () {
    var self = this;
    console.log('Asteroid speed is:' + self.speed)
    self.ctx.fillStyle = 'rgb(255, 0, 255)';
    self.ctx.fillRect(self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}

Asteroid.prototype.update = function () {
    var self = this;
    self.stats.x = self.stats.x - 10;
    if(self.stats.x < 0) {
        self.isOut = true;
    }
}