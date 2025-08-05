// Single unified functions
function changeBg(mode) {
  if(mode === 'dark'){
    document.body.classList.add('dark-mode');
  }else {
    document.body.classList.remove('dark-mode');
  }
}

function toggleNavbar() {
  const navbar = document.querySelector(".nav-items");
  navbar.classList.toggle("active");
}

function toggleCategory(category) {
  category.nextElementSibling.classList.toggle('show');
}

// Initialize FAQ functionality
document.querySelectorAll('.faq-question').forEach(question => {
  question.addEventListener('click', () => {
      const answer = question.nextElementSibling;
      answer.style.display = answer.style.display === 'block' ? 'none' : 'block';
  });
});

// Initialize media items
document.querySelectorAll('.media-item').forEach(item => {
  item.addEventListener('click', function () {
    const title = this.querySelector('div').textContent;
    const imageSrc = this.querySelector('img').src;

    document.getElementById('modal-title').textContent = title;
    document.getElementById('modal-image').src = imageSrc;
    document.getElementById('media-modal').style.display = 'flex';
  });
});

function closeModal() {
  document.getElementById('media-modal').style.display = 'none';
}
window.onclick = function(event) {
  const modal = document.getElementById('media-modal');
  if (event.target == modal) {
    modal.style.display = 'none';
  }
}
function showModal(title, description, imgSrc) {
  document.getElementById('modal-title').textContent = title;
  document.getElementById('modal-description').textContent = description;
  document.getElementById('modal-image').src = imgSrc;
  document.getElementById('media-modal').style.display = 'block';
}


// Handle the API
const apiKey = 'f934eb2db49e53e1e35e8fa789a71630';

function getMovieSuggestionsByMood(mood) {
  let genreId;

  switch (mood) {
    case 'happy':
      genreId = 35;
      break;
    case 'sad':
      genreId = 18;
      break;
    case 'excited':
      genreId = 28;
      break;
    case 'romantic':
      genreId = 10749;
      break;
    default:
      genreId = 12;
  }

  const randomPage = Math.floor(Math.random() * 10) + 1;


  

  fetch(`https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}&with_genres=${genreId}&language=en&page=${randomPage}`)
    .then(response => response.json())
    .then(data => {
      const resultsContainer = document.getElementById('suggestions-container');
      if (!resultsContainer) {
        console.error('No container with ID "suggestions-container" found.');
        return;
      }

      resultsContainer.innerHTML = '';

      const validMovies = data.results.filter(movie => movie.poster_path && movie.overview);

      const shuffled = validMovies.sort(() => 0.5 - Math.random());
      shuffled.slice(0, 10).forEach(movie => {
        const card = document.createElement('div');
        card.classList.add('movie-card');

        card.innerHTML = `
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          <h3>${movie.title}</h3>
          <p>${movie.overview.substring(0, 100)}...</p>
        `;

        resultsContainer.appendChild(card);
      });
    })
    .catch(error => {
      console.error('Error fetching movie suggestions:', error);
    });
}
