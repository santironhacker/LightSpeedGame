'use strict';

  /* --- FUNCTION MAIN --- */

function main () {
  var siteMain = document.getElementById('site-main');
  var startButton;
  var game;
  var playAgainButton;
  var splashMusic;
  var youWinMusic;

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

    // Audio
    splashMusic = document.createElement('audio');
    splashMusic.setAttribute('src', './sounds/StarWarsMainTheme.mp3');
    splashMusic.setAttribute('autoplay', 'true');
    siteMain.appendChild(splashMusic);
  }

  function destroySplash () {
    startButton.removeEventListener('click', handleStartClick);
    splashMusic.remove();
    siteMain.children[0].remove();
  }

  /* --- GAME --- */

  function buildGame () {
    game = new Game (siteMain);
    
    game.onGameOver(function() {
      game.destroy();
      youWin();
    });
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

    // Audio
    youWinMusic = document.createElement('audio');
    youWinMusic.setAttribute('src', './sounds/StarWarsEndCreditsTheme.mp3');
    youWinMusic.setAttribute('autoplay', 'true');
    siteMain.appendChild(youWinMusic);
  }

  function destroyYouWin () {
    playAgainButton.removeEventListener('click', handleRestartClick);
    siteMain.children[0].remove();
    youWinMusic.remove();
  }  

   
}

window.onload = main;