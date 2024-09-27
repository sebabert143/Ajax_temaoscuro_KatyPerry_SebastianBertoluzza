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
