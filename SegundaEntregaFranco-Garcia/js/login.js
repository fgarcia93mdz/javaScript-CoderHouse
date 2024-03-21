function login(username, password) {
  
  fetch('https://steady-hammerhead-fibre.glitch.me/api/auth/login', {
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
        Swal.fire({
          icon: 'success',
          title: `¡Bienvenido ${data.user.nombre}!`,
          timer: 1000,
          timerProgressBar: true,
        }).then((result) => {
          if (result.dismiss === Swal.DismissReason.timer) {
            window.location.href = '../html/informes.html';
          }
        });
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

const togglePassword = document.querySelector('#togglePassword');
const password = document.querySelector('#password');
const eyeIcon = togglePassword.querySelector('i'); 

togglePassword.addEventListener('click', function (e) {
  const type = password.getAttribute('type') === 'password' ? 'text' : 'password';
  password.setAttribute('type', type);
  
  if (password.getAttribute('type') === 'password') {
    eyeIcon.classList.remove('fa-eye');
    eyeIcon.classList.add('fa-eye-slash');
  } else {
    eyeIcon.classList.remove('fa-eye-slash');
    eyeIcon.classList.add('fa-eye');
  }
});