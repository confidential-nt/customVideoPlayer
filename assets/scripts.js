const playBtn = document.querySelector("#jsPlayBtn");
const volumeBtn = document.querySelector("#jsVolumeBtn");
const volumeRange = document.querySelector("#jsVolumeRange");
const video = document.querySelector("#jsVideo");
const progress = document.querySelector("#jsProgress");
const progressGauge = document.querySelector("#jsProgressGauge");
const backwardBtn = document.querySelector("#jsBackward");
const forwardBtn = document.querySelector("#jsForward");

video.volume = volumeRange.value;
volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;

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
});
volumeBtn.addEventListener("click", toggleVolumeBtn);
backwardBtn.addEventListener("click", handleBackward);
forwardBtn.addEventListener("click", handleForward);
volumeRange.addEventListener("input", handleVolumeRange);
progress.addEventListener("click", handleVideoProgress);
