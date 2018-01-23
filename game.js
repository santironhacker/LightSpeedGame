'use strict'

function Game (siteMain, canvasElement) {
    var self = this;
    
    canvasElement = document.createElement('canvas');
    self.width = 600;
    self.height = 400;
    canvasElement.height = HEIGHT;
    siteMain.appendChild(canvasElement);
    var ctx = canvasElement.getContext('2d');


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
}