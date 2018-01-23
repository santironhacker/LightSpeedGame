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
  splash = document.createElement('div');
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
    splash.remove;
    // siteMain.children[0].remove();
  }
}