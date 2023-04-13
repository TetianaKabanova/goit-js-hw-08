import Player from '@vimeo/player';
import throttle from 'lodash.throttle';

const iframe = document.querySelector('iframe');
const player = new Player(iframe);
const LOCALSTORAGE_KEY = 'videoplayer-current-time';

player.on('timeupdate', throttle(onPlay, 1000));

function onPlay(event) {
  localStorage.setItem(LOCALSTORAGE_KEY, event.seconds);
}

setCurrentTime();
function setCurrentTime() {
  if (!localStorage.getItem(LOCALSTORAGE_KEY)) {
    return;
  }
  player.setCurrentTime(localStorage.getItem(LOCALSTORAGE_KEY));
}
