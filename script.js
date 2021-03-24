$(document).ready(function() {
  const clock = {
    text: "session",
    playing: false,
    looped: false,
    breaking: false,
    started: false,
    min: 25,
    sec: 0,
    break: 5,
    session: 25
  };
  
  function display() {
    const l = document.getElementById("timer-label")
    const t = document.getElementById("time-left");
    const b = document.getElementById("break-length");
    const s = document.getElementById("session-length");
    let min = clock.min;
      if (min < 10) {
        min = "0" + min;
      };
    let sec = clock.sec;
      if (sec < 10) {
        sec = "0" + sec;
      }
    l.textContent = clock.text;
    t.textContent = min + ":" + sec;
    b.textContent = clock.break;
    s.textContent = clock.session;
  };
  display();
  
  function playBeep() {
    const a = document.getElementById("beep");
    a.currentTime = 0;
    a.play();
  }
  
  function subTime() {
    if (clock.sec === 0) {
      clock.min -= 1;
      clock.sec = 60;
    }
    if (clock.min < 0) {
      clock.min = 0;
    }
    if (clock.min >= 0) {
      clock.sec -= 1;
    }
    if (clock.min === 0 && clock.sec === 0) {
        playBeep();
        clock.looped = true;
    }
  };
  
  function timer() {
    if (!clock.looped) {
      subTime();
    }
    else if (clock.looped && !clock.breaking) {
      clock.min = clock.break;
      clock.sec = 0;
      clock.text = "break";
      clock.looped = false;
      clock.breaking = true;
    }
    else if (clock.looped && clock.breaking) {
      clock.min = clock.session;
      clock.text = "session";
      clock.looped = false;
      clock.breaking = false;
    }
    display();
  }
  
  
  
  let countDown;
  function start() {
    countDown = window.setInterval(timer, 1000);
  }
  
  function stop() {
    window.clearInterval(countDown)
  }
  
  $("#break-increment").click(() => {
    if (clock.break < 60 && !clock.started) {
      clock.break += 1;
    }
    display();
  });
  
  $("#break-decrement").click(() => {
    if (clock.break > 1 && !clock.started) {
      clock.break -= 1;
    }
    display();
  });
  
  $("#session-increment").click(() => {
    if (clock.session < 60 && !clock.started) {
      clock.session += 1;
      clock.min += 1;
    }
    display();
  });
  
  $("#session-decrement").click(() => {
    if (clock.session > 1 && !clock.started) {
      clock.session -= 1;
      clock.min -= 1;
    }
    display();
  });
  
  $("#start_stop").click(() => {
   clock.started = true;
    if (clock.playing === false) {
      clock.playing = true;
      start();
    }
    else {
      clock.playing = false;
      stop();
    }
  });
  
  
  $("#reset").click(() => {
    clock.started = false;
    clock.text = "session";
    clock.looped = false;
    clock.breaking = false;
    clock.playing = false;
    clock.min = 25;
    clock.sec = 0;
    clock.break = 5;
    clock.session = 25;
    const a = document.getElementById("beep");
    a.currentTime = 0;
    a.pause();
    stop();
    display();
  });
  
})