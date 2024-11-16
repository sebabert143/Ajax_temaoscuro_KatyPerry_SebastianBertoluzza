fetch('footer.html') 
.then(response => response.text()) 
.then(data => { 
    document.getElementById('footer-placeholder').innerHTML = data; 
});

fetch('nav.html') 
.then(response => response.text()) 
.then(data => { 
    document.getElementById('nav-placeholder').innerHTML = data; 
});







const darkModeToggle = document.getElementById('dark-mode-toggle');
darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
});






// Función para cargar una página con AJAX
function loadPage(pageUrl,contenedor) {
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(contenedor).innerHTML = html;
        })
        .catch(error => {
            console.error('Hubo un problema al cargar la página:', error);
        });
}


document.getElementById('teenagemusic').addEventListener('click', function() {
    loadPage('page1.html','contentContainer');
});

document.getElementById('prismmusic').addEventListener('click', function() {
    loadPage('page2.html','contentContainer');
});

document.getElementById('witnessmusic').addEventListener('click', function() {
    loadPage('page3.html','contentContainer');
});

document.getElementById('143music').addEventListener('click', function() {
    loadPage('page4.html','contentContainer');
});

document.getElementById('katyroar').addEventListener('click', function() {
    loadPage('page5.html', 'singleskaty');
});


// Add a loading spinner to indicate loading
function showLoadingSpinner(container) {
    const spinner = document.createElement('div');
    spinner.className = 'loading-spinner';
    spinner.innerHTML = '<div class="spinner"></div>';
    document.getElementById(container).appendChild(spinner);
}

function hideLoadingSpinner(container) {
    const spinner = document.querySelector(`#${container} .loading-spinner`);
    if (spinner) {
        spinner.remove();
    }
}

// Enhanced loadPage function with loading spinner and feedback
function loadPageWithFeedback(pageUrl, container) {
    showLoadingSpinner(container);
    fetch(pageUrl)
        .then(response => {
            if (!response.ok) {
                throw new Error('Error en la solicitud: ' + response.status);
            }
            return response.text();
        })
        .then(html => {
            document.getElementById(container).innerHTML = html;
        })
        .catch(error => {
            console.error('Hubo un problema al cargar la página:', error);
            document.getElementById(container).innerHTML = '<p class="error-feedback">Hubo un problema al cargar el contenido. Por favor, inténtalo de nuevo más tarde.</p>';
        })
        .finally(() => {
            hideLoadingSpinner(container);
        });
}

// Replace existing loadPage calls
document.getElementById('teenagemusic').addEventListener('click', function() {
    loadPageWithFeedback('page1.html', 'contentContainer');
});

document.getElementById('prismmusic').addEventListener('click', function() {
    loadPageWithFeedback('page2.html', 'contentContainer');
});

document.getElementById('witnessmusic').addEventListener('click', function() {
    loadPageWithFeedback('page3.html', 'contentContainer');
});

document.getElementById('143music').addEventListener('click', function() {
    loadPageWithFeedback('page4.html', 'contentContainer');
});

document.getElementById('katyroar').addEventListener('click', function() {
    loadPageWithFeedback('page5.html', 'singleskaty');
});

// Implement lazy loading for images
document.addEventListener('DOMContentLoaded', function() {
    const lazyImages = document.querySelectorAll('img[data-src]');
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                img.src = img.dataset.src;
                img.removeAttribute('data-src');
                observer.unobserve(img);
            }
        });
    });

    lazyImages.forEach(img => {
        imageObserver.observe(img);
    });
});













document.getElementById('lyrics-form').addEventListener('submit', function(event) {
    event.preventDefault();
    const song = document.getElementById('song-input').value.trim();
    const lyricsContainer = document.getElementById('lyrics-display');
    const lyricsOutput = document.getElementById('lyrics-output');
    const artist = 'Katy Perry'; // Fixed default artist

    if (!song) {
        lyricsOutput.textContent = 'Por favor, ingresa el nombre de una canción.';
        lyricsContainer.style.display = 'block';
        return;
    }

    lyricsOutput.innerHTML = '<p>Cargando...</p>';
    lyricsContainer.style.display = 'block'; // Show the container during the loading process

    // Fetch lyrics from API
    fetch(`https://api.lyrics.ovh/v1/${encodeURIComponent(artist)}/${encodeURIComponent(song)}`)
        .then(response => {
            if (!response.ok) {
                throw new Error('Letra no encontrada o error en la API');
            }
            return response.json();
        })
        .then(data => {
            const { lyrics } = data;
            if (lyrics) {
                // Split lyrics into lines and wrap each line in a paragraph
                const formattedLyrics = lyrics
                    .split('\n')
                    .map(line => `<p>${line}</p>`)
                    .join('');
                lyricsOutput.innerHTML = formattedLyrics;
            } else {
                lyricsOutput.innerHTML = '<p>No se encontraron resultados para esta canción.</p>';
            }
        })
        .catch(error => {
            console.error('Error en la solicitud de letras:', error);
            lyricsOutput.innerHTML = '<p>No se pudo obtener la letra. Verifica el nombre de la canción o inténtalo más tarde.</p>';
        });
});