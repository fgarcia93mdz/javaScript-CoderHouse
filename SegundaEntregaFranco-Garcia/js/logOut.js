document.getElementById('logout').addEventListener('click', function () {
  localStorage.removeItem('Usuario');
  window.location.href = '/';
});