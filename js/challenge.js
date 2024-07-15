
  document.addEventListener('DOMContentLoaded', function() {
    // Initialize variables
    let counterElement = document.getElementById('counter');
    let counterValue = parseInt(counterElement.textContent, 10);
    let likes = {}; // Object to track likes for each counter value
    let isPaused = false; // Flag to check if the counter is paused
    let intervalId;
  
    // Get references to buttons and form elements
    const minusButton = document.getElementById('minus');
    const plusButton = document.getElementById('plus');
    const heartButton = document.getElementById('heart');
    const pauseButton = document.getElementById('pause');
    const commentForm = document.getElementById('comment-form');
    const commentInput = document.getElementById('comment-input');
    const commentsList = document.getElementById('list');
  
    // Event listener for the minus button
    minusButton.addEventListener('click', function() {
      if (!isPaused) { // Only decrement if the counter is not paused
        counterValue--;
        counterElement.textContent = counterValue;
      }
    });
  
    // Event listener for the plus button
    plusButton.addEventListener('click', function() {
      if (!isPaused) { // Only increment if the counter is not paused
        counterValue++;
        counterElement.textContent = counterValue;
      }
    });
  
    // Event listener for the heart button to like the current counter value
    heartButton.addEventListener('click', function() {
      if (!isPaused) { // Only like if the counter is not paused
        if (likes[counterValue]) {
          likes[counterValue]++;
        } else {
          likes[counterValue] = 1;
        }
        displayLikes(); // Update the likes display
      }
    });
  
    // Event listener for the pause button to pause/resume the counter
    pauseButton.addEventListener('click', function() {
      if (isPaused) {
        resumeCounter();
      } else {
        pauseCounter();
      }
    });
  
    // Event listener for the comment form submission
    commentForm.addEventListener('submit', function(event) {
      event.preventDefault(); // Prevent the form from submitting normally
      const commentText = commentInput.value.trim(); // Get the input value and trim any whitespace
      if (commentText !== '') { // Only add non-empty comments
        addComment(commentText); // Add the comment to the list
        commentInput.value = ''; // Clear the input field
      }
    });
  
    // Function to display the likes
    function displayLikes() {
      let likesList = document.querySelector('.likes');
      likesList.innerHTML = ''; // Clear the list first
      for (let key in likes) {
        let li = document.createElement('li');
        li.textContent = `Number ${key} has been liked ${likes[key]} time${likes[key] > 1 ? 's' : ''}.`;
        likesList.appendChild(li);
      }
    }
  
    // Function to pause the counter
    function pauseCounter() {
      clearInterval(intervalId); // Stop the timer
      isPaused = true;
      pauseButton.textContent = 'resume'; // Change button text to resume
      // Disable other buttons
      minusButton.disabled = true;
      plusButton.disabled = true;
      heartButton.disabled = true;
    }
  
    // Function to resume the counter
    function resumeCounter() {
      startTimer(); // Restart the timer
      isPaused = false;
      pauseButton.textContent = 'pause'; // Change button text to pause
      // Enable other buttons
      minusButton.disabled = false;
      plusButton.disabled = false;
      heartButton.disabled = false;
    }
  
    // Function to start the timer
    function startTimer() {
      intervalId = setInterval(function() {
        if (!isPaused) { // Only increment if the counter is not paused
          counterValue++;
          counterElement.textContent = counterValue;
        }
      }, 1000); // Increment every second
    }
  
    // Function to add a comment to the list
    function addComment(comment) {
      let p = document.createElement('p');
      p.textContent = comment;
      commentsList.appendChild(p);
    }
  
    // Start the timer when the page loads
    startTimer();
  });
  