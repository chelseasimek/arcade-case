// global variable that sets up an array of objects that hold
// game info (title, logo, path, and id). This is used to choose what game is selected.
// This can be any length. Images work best when they are 342 × 422
var games = [
  {
    title: 'Wack-A-Gritty',
    logo: '/images/whacagritty_game.png',
    path: 'wack-a-gritty/',
    id: 'wack-a-gritty'
  },
  {
    title: 'Wack-A-Gritty',
    logo: '/images/whacagritty_game.png',
    path: 'wack-a-gritty/',
    id: 'wack-a-gritty'
  },
  {
    title: 'Wack-A-Gritty',
    logo: '/images/whacagritty_game.png',
    path: 'wack-a-gritty/',
    id: 'wack-a-gritty'
  },
];

var gameIndex = 0;

// scale up css on load to fit any screen
function resizeContainer() {
  var originalWidth = 745;
  var originalHeight = 757;

  var windowWidth = window.innerWidth;
  var windowHeight = window.innerHeight;

  var originalRatio;
  var windowRatio;
  var newRatio;

  originalRatio = originalWidth / originalHeight;
  windowRatio = windowWidth / windowHeight;
  newRatio = windowWidth / originalWidth;

  if (originalRatio < windowRatio) {
    newRatio = windowHeight / originalHeight;
  }

  document.getElementById('container').style.transform = 'scale(' + newRatio + ') translate(-50%,-50%)';
}

document.onkeydown = function (e) {
  var joyStick = document.querySelectorAll('.joystickWrapper')[1];
  var buttons = document.querySelectorAll('.button');
  var buttonIndex = Math.floor(Math.random() * buttons.length);
  // move joy sticks if using d-pad
  if (e.key === 'ArrowLeft') {
    joyStick.classList.add('left');
  } else if (e.key === 'ArrowRight') {
    joyStick.classList.add('right');
  } else if (e.key === 'ArrowUp') {
    joyStick.classList.add('up');
  } else if (e.key === 'ArrowDown') {
    joyStick.classList.add('down');
  } else {
    // randomly choose a button to highlight on keypress
    buttons[buttonIndex].classList.add('highlight');
  }
}
document.onkeyup = function (e) {
  var joyStick = document.querySelectorAll('.joystickWrapper')[1];
  var gamesEl = document.getElementById('games');
  var gamesArr = document.querySelectorAll('.game');
  var buttons = document.querySelectorAll('.button');

  // remmove joystick classes
  if (e.key === 'ArrowLeft') {
    joyStick.classList.remove('left');
    // move to next game to select;
    if (gameIndex > 0) {
      gamesArr[gameIndex].classList.remove('selected');
      gameIndex--;
      gamesArr[gameIndex].classList.add('selected');
      gamesEl.style.left = gamesEl.offsetLeft + 215 + 'px';
    }
  } else if (e.key === 'ArrowRight') {
    joyStick.classList.remove('right');
    if (gameIndex < games.length - 1) {
      gamesArr[gameIndex].classList.remove('selected');
      gameIndex++;
      gamesArr[gameIndex].classList.add('selected');
      gamesEl.style.left = gamesEl.offsetLeft - 215 + 'px';
    }
  } else if (e.key === 'ArrowUp') {
    joyStick.classList.remove('up');
  } else if (e.key === 'ArrowDown') {
    joyStick.classList.remove('down');
  } else {
    // remove button highligt
    buttons.forEach(button => {
      button.classList.remove('highlight');
    });
    // go to the selected games path if enter is pressed
    if (e.key === 'Enter') {
      window.location = window.location.origin + '/' + games[gameIndex].path;
    }
    // exit out of a game if backspace or delete is pressed
    else if (e.keyCode === '8' || e.keyCode === '46') {
      event.preventDefault();
      window.location = window.location.origin;
    }
  }
}

window.onload = function () {
  resizeContainer();
  var render = "";
  var gamesEl = document.getElementById('games');
  games.forEach((game, index) => {
    if (index === 0) {
      render +=
        `<div class="game selected" href=${game.path}>
        <img class="logo" src="${game.logo}"/>
        </div>`
    } else {
      render +=
        `<div class="game" href=${game.path}>
        <img class="logo" src="${game.logo}"/>
        </div>`
    }
  });
  gamesEl.style.left = gamesEl.offsetLeft - (215 * gameIndex) + 'px';
  gamesEl.innerHTML = render;
}

// BACKGROUND MUSIC SOUNDTRACK

// var soundtrack = new Audio();
// soundtrack.src = 'images/Komiku_-_07_-_Battle_of_Pogs.mp3';
// soundtrack.loop = true;
// var playing = false;

// // i can do this because i have a settings in chrome set that lets me bypass user
// // interaction with dom. else, it will listen to the window event
// soundtrack.play();

// window.addEventListener('keydown', playAudio);
// function playAudio(){
//   if(!playing){
//     soundtrack.play()
//     playing = true;
//   }
//   window.removeEventListener('keydown', playAudio);
// }