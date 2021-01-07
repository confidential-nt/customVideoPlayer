const controls = document.querySelector("#jsControls");
const playBtn = document.querySelector("#jsPlayBtn");
const volumeBtn = document.querySelector("#jsVolumeBtn");
const volumeRange = document.querySelector("#jsVolumeRange");
const video = document.querySelector("#jsVideo");
const progress = document.querySelector("#jsProgress");
const progressGauge = document.querySelector("#jsProgressGauge");
const backwardBtn = document.querySelector("#jsBackward");
const forwardBtn = document.querySelector("#jsForward");
const optionBtn = document.querySelector("#jsOptionBtn");
const optionMenu = document.querySelector("#jsOptionMenu");
const fullscrBtn = document.querySelector("#jsFullscrBtn");
const currentText = document.querySelector("#jsCurrent");
const durationText = document.querySelector("#jsDuration");
const speedOptions = document.querySelectorAll(".controls__option li");
const videoBlock = document.querySelector("#jsVideoBlock");

video.volume = volumeRange.value;
volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;

function handleFullscreen() {
  if (!document.fullscreenElement) {
    videoBlock.requestFullscreen();
  } else {
    document.exitFullscreen();
  }
}

function handleVideoSpeed() {
  const speed = this.dataset.rate;
  video.playbackRate = parseFloat(speed, 10);
}

function handleOptionMenu() {
  optionMenu.scrollTop = 0;
  optionMenu.classList.toggle("hide");
  controls.classList.toggle("opacity");
}

function getTimeframe(time) {
  const hour = Math.round(time / 3600);
  const min = Math.round((time % 3600) / 60);
  const sec = Math.round((time % 3600) % 60);

  return `${hour < 10 ? `0${hour}` : hour}:${min < 10 ? `0${min}` : min}:${
    sec < 10 ? `0${sec}` : sec
  }`;
}

function handleBackward() {
  const sec = this.dataset.sec;
  video.currentTime -= parseInt(sec, 10);
}

function handleForward() {
  const sec = this.dataset.sec;
  video.currentTime += parseInt(sec, 10);
}

function handleVideoProgress(e) {
  const offsetWidth = progress.offsetWidth;

  const { offsetX } = e;

  video.currentTime = video.duration * (offsetX / offsetWidth);
  progressGauge.style.width = `${(offsetX / offsetWidth) * 100}%`;
}

function judgeVolumeIcon() {
  if (video.volume <= 1 && video.volume >= 0.5) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
  } else if (video.volume < 0.5 && video.volume > 0) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-down"></i>`;
  } else if (video.volume === 0) {
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

function handleVolumeRange() {
  video.volume = this.value;
  judgeVolumeIcon();
}

function handleEndStatus() {
  video.paused = true;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function toggleVolumeBtn() {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = video.volume;
    judgeVolumeIcon();
  } else {
    video.muted = true;
    volumeRange.value = 0;
    volumeBtn.innerHTML = `<i class="fas fa-volume-mute"></i>`;
  }
}

function togglePlayBtn() {
  if (video.paused) {
    video.play();
    playBtn.innerHTML = `<i class="fas fa-pause"></i>`;
  } else {
    video.pause();
    playBtn.innerHTML = `<i class="fas fa-play"></i>`;
  }
}

playBtn.addEventListener("click", togglePlayBtn);
video.addEventListener("click", togglePlayBtn);
video.addEventListener("ended", handleEndStatus);
video.addEventListener("timeupdate", () => {
  progressGauge.style.width = `${(video.currentTime / video.duration) * 100}%`;
  const currentTime = getTimeframe(video.currentTime);
  currentText.innerText = currentTime;
});
video.addEventListener("loadedmetadata", () => {
  const durationTime = getTimeframe(video.duration);
  durationText.innerText = durationTime;
});
volumeBtn.addEventListener("click", toggleVolumeBtn);
backwardBtn.addEventListener("click", handleBackward);
forwardBtn.addEventListener("click", handleForward);
optionBtn.addEventListener("click", handleOptionMenu);
fullscrBtn.addEventListener("click", handleFullscreen);
volumeRange.addEventListener("input", handleVolumeRange);
progress.addEventListener("click", handleVideoProgress);
speedOptions.forEach((op) => op.addEventListener("click", handleVideoSpeed));
videoBlock.addEventListener("fullscreenchange", () => {
  if (document.fullscreen) {
    controls.style.width = `${window.outerWidth}px`;
    fullscrBtn.innerHTML = `<i class="fas fa-compress-arrows-alt"></i>`;
  } else {
    controls.style.width = `100%`;
    fullscrBtn.innerHTML = `<i class="fas fa-expand"></i>`;
  }
});
