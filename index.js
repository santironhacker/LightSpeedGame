'use strict';

//Start coding here

function main () {

  /* --- GLOBAL VARIABLES --- */

    var SPEED;
    var STAGE;
    // var WIDTH = 600;
    // var HEIGHT = 400;
    var SIZE = {
      x : '',
      y : ''
    }
    
    

  var siteMain = document.getElementById('site-main');
  var startButton;
  var game;
  var playAgainButton;

  var handleStartClick = function () {
    destroySplash();
    buildGame();
  };

  var handleRestartClick = function () {
    destroyYouWin();
    buildGame();
  }

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

  function gameOver () {
    destroyGame();
    youWin();
  }
  /* --- GAME --- */

  function buildGame () {
    game = new Game (siteMain);

    game.onGameOver(gameOver);

    // window.setTimeout(function () {
    //   destroyGame();
    //   youWin();
    // }, 3000);
    
  }

  function destroyGame () {
    game.destroy();
  }


/* --- YOU WIN --- */
  function youWin () {
    // Create local container and title
    var youWinContainer = document.createElement('div');
    var title = document.createElement('h1');
    title.innerHTML = 'You escaped at space light!'
    youWinContainer.appendChild(title);
    siteMain.appendChild(youWinContainer);
    
    // Create play again button
    playAgainButton = document.createElement('button');
    playAgainButton.innerHTML = 'Play again';
    youWinContainer.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', handleRestartClick);
    }

  function destroyYouWin () {
    playAgainButton.removeEventListener('click', handleRestartClick);
    siteMain.children[0].remove();
  }  

   
}

window.onload = main;