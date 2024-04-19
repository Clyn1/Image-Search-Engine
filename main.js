document.addEventListener('DOMContentLoaded', function () {
  const searchButton = document.getElementById('searchButton');
  const searchInput = document.getElementById('searchInput');
  const photoContainer = document.getElementById('photoContainer');
  const modal = document.getElementById('myModal');
  const modalImg = document.getElementById('img01');
  const span = document.getElementsByClassName('close')[0];

  searchButton.addEventListener('click', function () {
    fetchData();
  });

  searchInput.addEventListener('keypress', function (event) {
    if (event.key === 'Enter') {
      fetchData();
    }
  });

  function fetchData() {
    const searchTerm = searchInput.value.trim();

    if (searchTerm === '') {
      alert('Please enter a search term.');
      return;
    }

    const apiUrl = `https://api.unsplash.com/search/photos?page=1&query=${searchTerm}&client_id=7YKeTFGwD7vMMfVPbnrOUYwCIDfdJcHO2YM5zDEkCPs`;

    fetch(apiUrl)
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
        displayPhotos(data.results);
      })
      .catch(error => {
        console.error('There was a problem with the fetch operation:', error);
      });
  }

  function displayPhotos(photos) {
    // Clear previous search results
    photoContainer.innerHTML = '';

    // Display each photo in the grid
    photos.forEach(photo => {
      const photoElement = document.createElement('img');
      photoElement.src = photo.urls.regular;
      photoElement.alt = photo.alt_description;
      photoElement.classList.add('photo');

      // Add click event listener to open modal on image click
      photoElement.addEventListener('click', function () {
        toggleFullScreen(photoElement);
      });

      photoContainer.appendChild(photoElement);
    });
  }

  // Close the modal when user clicks on the close button
  span.addEventListener('click', function () {
    modal.style.display = 'none';
  });

  // Close the modal when user clicks anywhere outside the modal
  window.addEventListener('click', function (event) {
    if (event.target === modal) {
      modal.style.display = 'none';
    }
  });

  // Function to toggle fullscreen mode
  function toggleFullScreen(element) {
    if (!document.fullscreenElement) {
      element.requestFullscreen().catch(err => {
        console.error('Error attempting to enable full-screen mode:', err);
      });
    } else {
      document.exitFullscreen();
    }
  }
});
