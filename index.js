'use strict';

  /* --- FUNCTION MAIN --- */

function main () {
  var siteMain = document.getElementById('site-main');
  var startButton;
  var game;
  var playAgainButton;
  var splashMusic;
  var youWinMusic;
  var level = 1;

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
    
    // Create splash container and title
    var splash = document.createElement('div');
    // var title = document.createElement('h1');
    // title.innerHTML = 'LIGHT-SPEED';
    // splash.appendChild(title);
    siteMain.appendChild(splash);

    // Create image backgroung and styling
    splash.style.width = window.innerWidth + "px";
    splash.style.height = window.innerHeight + "px";
    splash.style.backgroundImage = "url('./images/lightspeed.jpg')";
    splash.style.backgroundSize = window.innerWidth + "px" + " " + window.innerHeight + "px";
    splash.style.backgroundRepeat = "none";
    splash.style.color = "yellow";

    // Create Star Wars Logo
    var starWarsLogo = document.createElement('div');
    starWarsLogo.setAttribute('class', 'starwars-demo');
    var imgStar = document.createElement('img');
    imgStar.setAttribute('src', './images/star.png');
    imgStar.setAttribute('class', 'star');
    starWarsLogo.appendChild(imgStar);
    var imgWars = document.createElement('img');
    imgWars.setAttribute('src', './images/wars.png');
    imgWars.setAttribute('class', 'wars');
    starWarsLogo.appendChild(imgWars);
    var byLine = document.createElement('h2');
    byLine.innerHTML = "Light Speed Game";
    byLine.setAttribute('class', 'by-line');
    byLine.setAttribute('id', 'by-line');
    starWarsLogo.appendChild(byLine);
    splash.appendChild(starWarsLogo);

    var endLogoInfinite = function () {
      imgStar.style.display = "none";
      imgWars.style.display = "none";
      byLine.style.color = "yellow";
      starWarsLogo.setAttribute('class', 'starwars-demo scroll-up');
    }

    imgWars.addEventListener("animationend", endLogoInfinite, false);

    var eventCount = 0;
    var endTitleSlide = function () {
      eventCount++;
      if(eventCount == '4') {
        createMenu();
      }
    }

    starWarsLogo.addEventListener("animationend", endTitleSlide, false);

    function createMenu () {
      var welcomeMenu = document.createElement('div');
      welcomeMenu.setAttribute('class', 'welcome-menu');
      splash.appendChild(welcomeMenu);

      // Create welcome
      var welcomeText = document.createElement('div');
      welcomeText.setAttribute('class', 'welcome-text');
      welcomeText.innerHTML = 'The imperial forces have destroyed the last earth base camp of the resistance. Only a last fleet is trying to escape while being persecuted by the imperial destructors. Your only chance is to jumpt to light speed to escape but before you will need to cross the asteroids belt... ';
      welcomeMenu.appendChild(welcomeText);

      // Create start button
      startButton = document.createElement('button');
      startButton.innerHTML = 'Start Game';
      startButton.setAttribute('class', 'start-button');
      welcomeMenu.appendChild(startButton);
      startButton.addEventListener('click', handleStartClick);

      startButton.addEventListener('mouseover', function() {
        startButton.style.backgroundColor = "yellow";
      });

      // var toggle = document.createElement('button');
      // toggle.setAttribute('class', 'toggle');
      // toggle.innerHTML = "Show less";
      // welcomeMenu.appendChild(toggle);

      // var slider = document.createElement('div')
      // slider.setAttribute('class', 'slider opened');
      // welcomeMenu.appendChild(slider);

      // Create warning
      var welcomeWarning = document.createElement('div');
      welcomeWarning.innerHTML = 'WARNING: ';
      welcomeWarning.setAttribute('class', 'welcome-warning');
      welcomeMenu.appendChild(welcomeWarning);
      var welcomeWarningText = document.createElement('span');
      welcomeWarningText.innerHTML = "Avoid all obstacles untill you reach LEVEL 10. If you crash, current level will be restarted. Working on FIRE code so your weapons are useless. May the force be with you!";
      welcomeWarning.appendChild(welcomeWarningText);

      // Create instruccions
      var instructions = document.createElement('div');
      instructions.innerHTML = 'INSTRUCTIONS:';
      instructions.setAttribute('class', 'welcome-instructions');
      welcomeMenu.appendChild(instructions);

      var itemList1 = document.createElement('li');
      itemList1.innerHTML = 'Go up: O';
      itemList1.setAttribute('class', 'item-list');
      instructions.appendChild(itemList1);
      var itemList2 = document.createElement('li'); 
      itemList2.innerHTML = 'Go down: L';
      itemList2.setAttribute('class', 'item-list');
      instructions.appendChild(itemList2);
      var itemList3 = document.createElement('li'); 
      itemList3.innerHTML = 'Go down: Ñ';
      itemList3.setAttribute('class', 'item-list');
      instructions.appendChild(itemList3);
      var itemList4 = document.createElement('li'); 
      itemList4.innerHTML = 'Go down: K';
      itemList4.setAttribute('class', 'item-list');
      instructions.appendChild(itemList4);
      var itemList5 = document.createElement('li'); 
      itemList5.innerHTML = 'Fire: SPACEBAR';
      itemList5.setAttribute('class', 'item-list');
      instructions.appendChild(itemList5);

      var itemList6 = document.createElement('li'); 
      itemList6.innerHTML = 'Quit game: Q';
      itemList6.setAttribute('class', 'item-list');
      instructions.appendChild(itemList6);

      // toggle.addEventListener('click', toggleSlider, false);

      function toggleSlider(){
        console.log("Button was clicked");
          if (slider.classList.contains('opened')) {
              slider.classList.remove('opened');
              slider.classList.add('closed');
          } else {
              slider.classList.remove('closed');
              slider.classList.add('opened');
          }
      }
    }


    // Audio Splash
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
    game = new Game (siteMain, level);

    game.onGameQuit(function() {
      game.destroy();
      level = 1;
      splash();
    });

    game.onGameSuccess(function() {
      game.destroy();
      level = 1;
      youWin();
    });
  }


/* --- YOU WIN --- */
  function youWin () {
    // Create local container and title
    var youWinContainer = document.createElement('div');
    youWinContainer.setAttribute('class', 'you-win');
    var title = document.createElement('h1');
    title.innerHTML = 'You escaped at light speed!'
    youWinContainer.appendChild(title);
    siteMain.appendChild(youWinContainer);

    // Create image backgroung and styling
    youWinContainer.style.width = window.innerWidth + "px";
    youWinContainer.style.height = window.innerHeight + "px";
    youWinContainer.style.backgroundImage = "url('./images/lightspeed.jpg')";
    youWinContainer.style.backgroundSize = window.innerWidth + "px" + " " + window.innerHeight + "px";
    youWinContainer.style.backgroundRepeat = "none";

    // Create play again button
    playAgainButton = document.createElement('button');
    playAgainButton.innerHTML = 'Play again';
    playAgainButton.setAttribute('class', 'play-again');
    youWinContainer.appendChild(playAgainButton);
    playAgainButton.addEventListener('click', handleRestartClick);
    playAgainButton.addEventListener('mouseover', function() {
      playAgainButton.style.backgroundColor = "yellow";
    });

    // Audio Win 
    youWinMusic = document.createElement('audio');
    youWinMusic.setAttribute('src', './sounds/StarWarsEndCreditsTheme.mp3');
    youWinMusic.setAttribute('autoplay', 'true');
    siteMain.appendChild(youWinMusic);
  }

  function destroyYouWin () {
    playAgainButton.removeEventListener('click', handleRestartClick);
    youWinMusic.remove();
    siteMain.children[0].remove();
  }

}

window.onload = main;