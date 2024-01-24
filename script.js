window.onload = function () {
    var merrywrap = document.getElementById("merrywrap");
    var box = merrywrap.getElementsByClassName("giftbox")[0];
    var step = 1;
    var stepMinutes = [2000, 2000, 5000, 1000]; // Adjust the time for the video step
  
    function init() {
      box.addEventListener("click", openBox, false);
    }
  
    function openBox() {
      if (step === 1) {
        box.removeEventListener("click", openBox, false);
      }
      stepClass(step);
  
      // Check if it's the step where you want to play the video
      if (step === 3) {
        // Set a timeout to show the confirmation dialog after 5 seconds
        setTimeout(displayConfirmation, 5000);
      }
  
      if (step === 4) {
        return;
      }
      step++;
      setTimeout(openBox, stepMinutes[step - 1]);
    }
  
    function stepClass(step) {
      merrywrap.className = "merrywrap";
      merrywrap.className = "merrywrap step-" + step;
    }
  
    function displayConfirmation() {
      // Show a confirmation dialog
      var userConfirmation = confirm("Do you want to play the video in full-screen mode?");
      if (userConfirmation) {
        // User clicked OK, play the video
        playVideo();
      } else {
        // User clicked Cancel, continue to the next step
        step++;
        setTimeout(openBox, stepMinutes[step - 1]);
      }
    }
  
    function playVideo() {
    // Replace 'your_video_url.mp4' with the actual URL of your video
    var videoURL = 'video.mp4';

    // Create a full-screen video element dynamically
    var video = document.createElement('video');
    video.src = videoURL;  // Set the video source
    video.autoplay = true;  // Enable autoplay
    video.controls = true;  // Show video controls (like play, pause, etc.)
    video.style.position = 'fixed';  // Fixed position
    video.style.top = '0';  // Positioned at the top
    video.style.left = '0';  // Positioned at the left
    video.style.width = '100%';  // Take up 100% width of the screen
    video.style.height = '100%';  // Take up 100% height of the screen

    // Append the video element to the body of the HTML document
    document.body.appendChild(video);

    // Play the video
    video.play();

    // Request full-screen mode after user interaction
    video.addEventListener('loadedmetadata', function () {
      video.requestFullscreen().catch(function (err) {
        console.error('Error attempting to enable fullscreen:', err.message);
      });
    });
  }
    init();
  };
  