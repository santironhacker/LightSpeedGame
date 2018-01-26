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

    self.falconImg = new Image();
    self.falconImg.src = './images/falcon-noBackground.png';
}


Player.prototype.draw = function () {
    var self = this;
    console.log('Player speed is', self.speed)
    self.ctx.drawImage(self.falconImg, self.stats.x, self.stats.y, self.stats.width, self.stats.height);
}


Player.prototype.update = function (key) {
    var self = this;
    console.log(key);

    if (key === 'w') {
        self.stats.y = self.stats.y - 20;
    }
    if (key === 's') {
        self.stats.y = self.stats.y + 20;
    }
    if (key === 'a') {
        self.stats.x = self.stats.x - 20;
    }
    if (key === 'd') {
        self.stats.x = self.stats.x + 20;
    }

    if (self.stats.y < 0) {
        self.stats.y = 0; 
    }
    if (self.stats.y > self.canvasHeight - self.stats.height) {
         self.stats.y = self.canvasHeight - self.stats.height; 
    }
    if (self.stats.x < 0) {
        self.stats.x = 0;
        // self.isDead = true;
    }
    if (self.stats.x + self.stats.width > self.canvasWidth) {
        self.stats.x = self.canvasWidth - self.stats.width;
    }
}