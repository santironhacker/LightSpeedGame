'use strict'

function Caza (ctx, speed, canvasWidth, canvasHeight) {
    var self = this;

    self.canvasWidth = canvasWidth;
    self.canvasHeight = canvasHeight;
    self.speed = speed;
    self.ctx = ctx;
    self.stats = {
        x: canvasWidth,
        y: 10 + Math.random() * (canvasHeight-34),
        width: 40,
        height: 24
    };
    self.isCazaOut = false;
    self.resistance = 10;

    self.cazaImg = new Image();
    self.cazaImg.src = './images/large-spacecraft-red.png';
}


Caza.prototype.draw = function () {
    var self = this;
    self.ctx.drawImage(self.cazaImg, self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}


Caza.prototype.update = function () {
    var self = this;
    self.stats.x = self.stats.x - (self.speed/2);
    if(self.stats.x < 0) {
        self.isCazaOut = true;
    }
}