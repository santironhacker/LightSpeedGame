'use strict'

function Asteroid (ctx, speed, canvasWidth, canvasHeight) {
    var self = this;

    self.canvasWidth = canvasWidth;
    self.canvasHeight = canvasHeight;
    self.speed = speed;
    self.ctx = ctx;
    self.stats = {
        x: 600,
        y: 200,
        width: 40,
        height: 30
    };

}


Asteroid.prototype.draw = function () {
    var self = this;
    console.log('Asteroid speed is:' + self.speed)
    self.ctx.clearRect(0,0, 500, 500);
    self.ctx.fillStyle = 'rgb(0, 255, 255)';
    self.ctx.fillRect(self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}