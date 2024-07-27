document.getElementById('loginForm').addEventListener('submit', function(event) {
    event.preventDefault();
    const gender = document.getElementById('gender').value;
    const age = document.getElementById('age').value;

    // Salva i dati nel localStorage
    localStorage.setItem('userData', JSON.stringify({ gender, age }));

    // Reindirizza alla pagina principale
    window.location.href = 'index.html';
});
