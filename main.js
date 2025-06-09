const videoPlayer = document.getElementById("videoPlayer");

const videos = [
  "videos/video1.MP4",
  "videos/video2.MP4",
  "videos/video3.MP4"
];

let currentIndex = 0;
let videoStartTime = Date.now();

function sendData(participant, videoIndex, timeSpent) {
  fetch("/.netlify/functions/submit", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      participant: participant,
      videoIndex: videoIndex,
      timeSpent: timeSpent
    })
  })
}

function loadVideo(index) {
  if (index < 0 || index >= videos.length) return;

  if (currentIndex !== index) {
    const timeSpent = (Date.now() - videoStartTime) / 1000;
    console.log(`Watched video ${currentIndex + 1} for ${timeSpent.toFixed(2)}s`);
    sendData("JAC001", currentIndex + 1, timeSpent.toFixed(2));
    videoStartTime = Date.now();
  }

  currentIndex = index;
  videoPlayer.src = videos[currentIndex];
  videoPlayer.load();
  videoPlayer.onloadeddata = () => {
    if (document.body.contains(videoPlayer)) {
      videoPlayer.play().catch(e => console.warn("Play failed:", e));
    }
  };
}

document.addEventListener("keydown", (e) => {
  if (e.key === "ArrowRight") {
    loadVideo(currentIndex + 1);
  } else if (e.key === "ArrowLeft") {
    loadVideo(currentIndex - 1);
  }
});

loadVideo(currentIndex);