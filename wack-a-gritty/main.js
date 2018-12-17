var timer;
var interval;
var score = 0;
var gritty =
  `<div class="gritty">
  <img src="images/gritty-8bit.png" />
</div>`;
var giroux =
  `<div class="giroux">
  <img src="images/giroux-8bit.png" />
</div>`;

window.onload = function () {
  renderHoles();
  setTimeout(function () {
    startTimer();
    var randomInterval;
    interval = setInterval(function () {
      randomInterval = Math.floor((Math.random() * 2));
      setTimeout(function () {
        randomize();
      }, randomInterval * 10);
    }, 600);
  }, 3000);
}

document.onkeydown = function (e) {
  var holesArr = document.querySelectorAll('.hole');
  var empty = true;
  if (e.keyCode === '8' || e.keyCode === '46') {
    event.preventDefault();
    window.location = window.location.origin;
  }
  if (e.key === '1' ||
    e.key === '2' ||
    e.key === '3' ||
    e.key === '4' ||
    e.key === '5' ||
    e.key === '6' ||
    e.key === '7' ||
    e.key === '8' ||
    e.key === '9') {
    // for all of the children in each hole (gritty or giroux)
    for (let i = 0; i < holesArr[(e.key - 1)].children.length; i++) {
      // if that child is currently shown
      if (holesArr[(e.key - 1)].children[i].classList.contains('show')) {
        // only if the child that's shown is gritty
        if (holesArr[(e.key - 1)].children[i].classList.contains('gritty')) {
          empty = false;
          holesArr[(e.key - 1)].children[i].children[0].src = 'images/gritty-success-8bit.png';
          setTimeout(function () {
            holesArr[(e.key - 1)].children[i].children[0].src = 'images/gritty-8bit.png';
          }, 200);
        } else {
          holesArr[(e.key - 1)].children[i].children[0].src = 'images/giroux-alert-8bit.png';
          setTimeout(function () {
            holesArr[(e.key - 1)].children[i].children[0].src = 'images/giroux-8bit.png';
          }, 200);
        }
        // hide the child
        setTimeout(function () {
          holesArr[(e.key - 1)].children[i].classList.remove('show');
        }, 100);
        break;
      }
    }
    // if the targeted hole was gritty
    if (!empty) {
      score += 20;
    }
    // if the hole was empty or the targeted hole was giroux
    else {
      score -= 25;
    }
    setScore();
  }
}

function renderHoles() {
  var holesEl = document.getElementById('holes');
  var render = '';
  for (let i = 0; i < 9; i++) {
    render +=
      `<div class="hole">
        ${gritty} ${giroux}
      </div>`
  }
  holesEl.innerHTML = render;
}

function randomize() {
  var holesArr = document.querySelectorAll('.hole');
  // choose a random number between 0 and the length -1 of the number of holes on screen
  var randomHole = Math.floor(Math.random() * holesArr.length);

  // if there is already a child shown on the chosen hole, don't do anything
  for (let i = 0; i < holesArr[randomHole].children.length; i++) {
    if (holesArr[randomHole].children[i].classList.contains('show')) {
      return;
    }
  }
  // chose a random number between 1 - 10
  var randomChild = Math.floor((Math.random() * 10) + 1);
  var randomTimeout = Math.floor((Math.random() * 1200) + 800);
  // only if the number is 3(10% of the time), show giroux
  if (randomChild === 3) {
    holesArr[randomHole].children[1].classList.add('show');
    // hide it 1.5 seconds later
    timer = setTimeout(function () {
      holesArr[randomHole].children[1].classList.remove('show');
    }, randomTimeout);
  }
  // all the other times (90%), show gritty
  else {
    holesArr[randomHole].children[0].classList.add('show');
    // hide it 1.5 seconds later
    timer = setTimeout(function () {
      holesArr[randomHole].children[0].classList.remove('show');
    }, randomTimeout);
  }
}

function startTimer() {
  var clock = document.getElementById('clock');
  var time = 30;
  setInterval(function () {
    if (time > 0) {
      time--;
      clock.innerHTML = `<div class="text">00:${time}</div>`;
    }
    if (time === 0) {
      clearInterval(interval);
      setTimeout(function () {
        document.location.href = `/index.html?id=wack-a-gritty&score=${score}`
      }, 4000);
    }
  }, 1000);
}

function setScore() {
  var scoreEl = document.getElementById('score');
  scoreEl.innerHTML = `<div class="text">${score}</div>`;
}