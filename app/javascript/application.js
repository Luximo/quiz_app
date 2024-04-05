// Configure your import map in config/importmap.rb. Read more: https://github.com/rails/importmap-rails
import "@hotwired/turbo-rails"
import "controllers"

document.addEventListener('DOMContentLoaded', (event) => {
    // Select all the radio buttons in the quiz
    const radioButtons = document.querySelectorAll('input[type="radio"]');
    // Function to calculate the score
    function calculateScore() {
      let score = 0;
      radioButtons.forEach((radio) => {
        // Check if the radio button is checked and if it's the correct answer
        if (radio.checked && radio.value === radio.dataset.correctAnswer) {
          score++;
        }
      });
      return score;
    }

    // Function to toggle dark and light mode
  function toggleMode() {
    const isChecked = document.getElementById('mode-toggle').checked;
    if (isChecked) {
      document.body.classList.add('dark-mode');
    } else {
      document.body.classList.remove('dark-mode');
    }
  }

  // Event listener for the mode toggle switch
  document.getElementById('mode-toggle').addEventListener('change', toggleMode);

    // Function to update the progress bar
  function updateProgressBar() {
    const totalQuestions = document.querySelectorAll('.question').length;
    const answeredQuestions = document.querySelectorAll('input[type="radio"]:checked').length;
    const progressPercentage = (answeredQuestions / totalQuestions) * 100;
    document.getElementById('progress-bar').style.width = progressPercentage + '%';
  }
  // Add event listeners to radio buttons to update the progress bar and allow unselecting
  radioButtons.forEach((radio) => {
    // Initialize the custom data attribute for tracking the checked state
    radio.dataset.wasChecked = 'false';

    radio.addEventListener('click', (e) => {
      // Use the custom data attribute to check the previous state
      if (radio.dataset.wasChecked === 'true') {
        radio.checked = false;
        radio.dataset.wasChecked = 'false';
      } else {
        radio.dataset.wasChecked = 'true';
      }
      updateProgressBar(); // Update the progress bar whenever a radio button is clicked
    });  

    radio.addEventListener('change', () => {
      // Reset the wasChecked state for other radio buttons in the same group
      radioButtons.forEach((otherRadio) => {
        if (otherRadio.name === radio.name && otherRadio !== radio) {
          otherRadio.wasChecked = false;
        }
      });
      updateProgressBar(); // Update the progress bar on change as well
    });
  });
    // Function to create and show the modal
  function showModal(score) {
    // Create the overlay
    const overlay = document.createElement('div');
    overlay.id = 'overlay';

    // Create the modal elements
    const modal = document.createElement('div');
    modal.id = 'score-modal';
    
    const scoreText = document.createElement('p');
    scoreText.textContent = 'Your score is: ' + score + '/10';
    
    const retryButton = document.createElement('button');
    retryButton.textContent = 'Retry';
    retryButton.onclick = function() {
      window.location.reload();
    };
    // Append elements to the modal
    modal.appendChild(scoreText);
    modal.appendChild(retryButton);
    
    // Append the overlay and modal to the body
    document.body.appendChild(overlay);
    document.body.appendChild(modal);
  }

  // Modify the event listener for the submit button
  document.getElementById('submit-quiz').addEventListener('click', (e) => {
    e.preventDefault();
    const score = calculateScore();
    showModal(score); // Show the modal with the score
  });
});