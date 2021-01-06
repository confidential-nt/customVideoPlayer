const playBtn = document.querySelector("#jsPlayBtn");
const volumeBtn = document.querySelector("#jsVolumeBtn");
const volumeRange = document.querySelector("#jsVolumeRange");
const video = document.querySelector("#jsVideo");

video.volume = volumeRange.value;

function handleVolumeRange() {
  video.volume = this.value;
}

function handleEndStatus() {
  video.paused = true;
  playBtn.innerHTML = `<i class="fas fa-play"></i>`;
}

function toggleVolumeBtn() {
  if (video.muted) {
    video.muted = false;
    volumeRange.value = video.volume;
    volumeBtn.innerHTML = `<i class="fas fa-volume-up"></i>`;
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
volumeBtn.addEventListener("click", toggleVolumeBtn);
volumeRange.addEventListener("input", handleVolumeRange);
