var startTime;
var timerInterval;

// Function to start the stopwatch
function startStopwatch() {
  startTime = Date.now();

  timerInterval = setInterval(updateStopwatch, 10); // Update every 10 milliseconds

  // Store the start time in localStorage
  localStorage.setItem('startTime', startTime.toString());
}

// Function to update the stopwatch display
function updateStopwatch() {
  var currentTime = Date.now();
  var elapsedTime = currentTime - parseInt(localStorage.getItem('startTime'), 10);

  var milliseconds = Math.floor((elapsedTime % 1000) / 10);
  var seconds = Math.floor((elapsedTime / 1000) % 60);
  var minutes = Math.floor((elapsedTime / (1000 * 60)) % 60);
  var hours = Math.floor((elapsedTime / (1000 * 60 * 60)) % 24);

  // Format the time components with leading zeros if needed
  milliseconds = padZero(milliseconds, 2);
  seconds = padZero(seconds, 2);
  minutes = padZero(minutes, 2);
  hours = padZero(hours, 2);

  // Display the stopwatch time
  var timerElement = document.getElementById('timer');
  timerElement.textContent = hours + ':' + minutes + ':' + seconds + '.' + milliseconds;
}

// Function to pad zeros to the time components
function padZero(value, length) {
  return value.toString().padStart(length, '0');
}

// Event listener for the start button
document.getElementById('startButton').addEventListener('click', function() {
  startStopwatch();
});

// Event listener for the stop button
document.getElementById('stopButton').addEventListener('click', function() {
  clearInterval(timerInterval);

  // Remove the start time from localStorage
  localStorage.removeItem('startTime');
});

// Check if the timer was already running on page load
if (localStorage.getItem('startTime')) {
  startStopwatch();
}