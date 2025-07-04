let audio = document.getElementById("audio");
let songTitle = document.getElementById("song-title");
let playBtn = document.getElementById("playPauseBtn");
let progress = document.getElementById("progress");
let playlistElement = document.getElementById("playlist");
let volumeSlider = document.getElementById("volume");
let cover = document.getElementById("cover");
let currentTimeElement = document.getElementById("current-time");
let durationElement = document.getElementById("duration");

let isPlaying = false;
let currentSong = 0;

// Playlist songs
let songs = [
  { name: "Song One", file: "song1.mp3", cover: "cover1.jpg" },
  { name: "Song Two", file: "song2.mp3", cover: "cover2.jpg" },
  { name: "Song Three", file: "song3.mp3", cover: "cover3.jpg" },
];

// Load song info
function loadSong(index) {
  let song = songs[index];
  audio.src = song.file;
  songTitle.textContent = song.name;
  cover.src = song.cover;
  isPlaying = false;
  playBtn.textContent = "▶️";
  updateActive();
  cover.classList.remove("rotating");
  currentTimeElement.textContent = "0:00";
  durationElement.textContent = "0:00";
}

// Play / Pause toggle
function playPause() {
  if (isPlaying) {
    audio.pause();
    isPlaying = false;
    playBtn.textContent = "▶️";
    cover.classList.remove("rotating");
  } else {
    audio.play();
    isPlaying = true;
    playBtn.textContent = "⏸️";
    cover.classList.add("rotating");
  }
}

// Stop music
function stopMusic() {
  audio.pause();
  audio.currentTime = 0;
  isPlaying = false;
  playBtn.textContent = "▶️";
  cover.classList.remove("rotating");
}

// Next song
function nextSong() {
  currentSong = (currentSong + 1) % songs.length;
  loadSong(currentSong);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
  cover.classList.add("rotating");
}

// Previous song
function prevSong() {
  currentSong = (currentSong - 1 + songs.length) % songs.length;
  loadSong(currentSong);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
  cover.classList.add("rotating");
}

// Update progress bar as song plays
audio.addEventListener("timeupdate", function () {
  let percent = (audio.currentTime / audio.duration) * 100;
  progress.value = percent;
  currentTimeElement.textContent = formatTime(audio.currentTime);
});

// Seek song when progress slider changes
progress.addEventListener("input", function () {
  audio.currentTime = (progress.value / 100) * audio.duration;
});

// Volume control
volumeSlider.addEventListener("input", function () {
  audio.volume = volumeSlider.value;
});

// When audio metadata is loaded, show duration
audio.addEventListener("loadedmetadata", () => {
  durationElement.textContent = formatTime(audio.duration);
});

// Build playlist clickable list
function buildPlaylist() {
  playlistElement.innerHTML = "";
  songs.forEach((song, index) => {
    let li = document.createElement("li");
    li.textContent = song.name;
    li.onclick = () => {
      currentSong = index;
      loadSong(currentSong);
      audio.play();
      isPlaying = true;
      playBtn.textContent = "⏸️";
      cover.classList.add("rotating");
      updateActive();
    };
    playlistElement.appendChild(li);
  });
}

let isLooping = false;

// 🔁 Loop Toggle
function toggleLoop() {
  isLooping = !isLooping;
  audio.loop = isLooping;
  alert("Loop is now " + (isLooping ? "ON" : "OFF"));
}

// 🔀 Shuffle
function shuffleSong() {
  let randomIndex;
  do {
    randomIndex = Math.floor(Math.random() * songs.length);
  } while (randomIndex === currentSong); // avoid same song

  currentSong = randomIndex;
  loadSong(currentSong);
  audio.play();
  isPlaying = true;
  playBtn.textContent = "⏸️";
  cover.classList.add("rotating");
}

// Highlight active song in playlist
function updateActive() {
  const items = document.querySelectorAll("#playlist li");
  items.forEach((item, idx) => {
    item.classList.toggle("active", idx === currentSong);
  });
}

// Format seconds to M:SS
function formatTime(seconds) {
  let minutes = Math.floor(seconds / 60);
  let secs = Math.floor(seconds % 60);
  if (secs < 10) secs = "0" + secs;
  return minutes + ":" + secs;
}

// Initialize player
loadSong(currentSong);
buildPlaylist();
     