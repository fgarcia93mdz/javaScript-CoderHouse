function login(username, password) {
  
  fetch('http://localhost:8080/api/auth/login', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ username, password }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error('Error en la autenticación');
      }
      return response.json();
    })
    .then(data => {
      localStorage.setItem('Usuario', JSON.stringify(data.user));
      if (data.message === '200') {
        window.location.href = '../html/informes.html'; 
      }
    })
    .catch(error => {
      console.error('Error:', error);
      var errorMessageElement = document.getElementById('error-message');
      errorMessageElement.textContent = error.message;
      errorMessageElement.style.display = 'block';
    });
}

document.getElementById('loginForm').addEventListener('submit', function(event) {
  event.preventDefault();

  const username = document.getElementById('username').value;
  const password = document.getElementById('password').value;
  login(username, password);
});
