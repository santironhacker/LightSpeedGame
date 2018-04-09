'use strict';

function Fire (ctx, playerPosX, playerPosY, playerWidth, playerHeight, canvasWidth) {
    var self = this;

    self.ctx = ctx;
    // Positioning
    self.playerWidth = playerWidth;
    self.playerHeight = playerHeight;
    self.canvasWidth = canvasWidth;
    // Thickness
    self.stats = {
        x: playerPosX,
        y: playerPosY,
        width: 12,
        height: 4
    };

    self.isFireOut = false;
    self.attack = 10;
}

Fire.prototype.draw = function () {
    var self = this;

    self.ctx.fillStyle = 'blue';
    self.ctx.fillRect(self.stats.x + self.playerWidth, self.stats.y + (self.playerHeight/2) - (self.stats.height/2) , self.stats.width, self.stats.height);
}

Fire.prototype.update = function () {
    var self = this;
    self.stats.x = self.stats.x + 3;
    if(self.stats.x > self.canvasWidth) {
        self.isFireOut = true;
    }
}