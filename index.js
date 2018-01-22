'use strict';

//Start coding here

function main () {

  /* --- GLOBAL VARIABLES --- */

    var SPEED;
    var STAGE;
    var WIDTH = 600;
    var HEIGHT = 400;
    var SIZE = {
      x : '',
      y : ''
    }
    
    

  var siteMain = document.getElementById('site-main');
  var startButton;

  var handleStartClick = function () {
    destroySplash();
    buildGame();
  };

  splash();

/* --- SPLASH --- */

  function splash () {
  // Create local container and title
  var splash = document.createElement('div');
  var title = document.createElement('h1');
    title.innerHTML = 'LIGHT-SPEED';
    splash.appendChild(title);
    siteMain.appendChild(splash);
  
  // Create start button
  startButton = document.createElement('button');
  startButton.innerHTML = 'Start Game';
  splash.appendChild(startButton);
  startButton.addEventListener('click', handleStartClick);
  }

  function destroySplash () {
    startButton.removeEventListener('click', handleStartClick);
    siteMain.children[0].remove();
  }

  /* --- GAME --- */

  function buildGame () {
  var canvasElement = document.createElement('canvas');
  canvasElement.width = WIDTH;
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

    window.setTimeout(function () {
      destroyGame();
      youWin();
    }, 2000);

    
  }

  function destroyGame () {
    canvasElement.remove();
  }


/* --- YOU WIN --- */
function youWin () {
  console.log('you win');
  var title = document.createElement('h1');
  'You escaped at space light!'
}


}

window.onload = main;