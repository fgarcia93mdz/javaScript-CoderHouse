document.addEventListener('DOMContentLoaded', (event) => {
  let user = JSON.parse(localStorage.getItem('Usuario'));

  document.getElementById('saludo').textContent = `¡Hola, ${user.nombre} ${user.apellido}, datos del usuario en storage!`;

  const autorElement = document.getElementById('autor');
  if (autorElement) {
    autorElement.value = `${user.usuario}`;
  } else {
    console.error('El elemento con el ID "autor" no existe en la página.');
  }

});

function obtenerUsuarios() {
  fetch('https://steady-hammerhead-fibre.glitch.me/api/users/curso-js-usuario/usuarios')
    .then(response => response.json())
    .then(data => {
      const userTable = document.getElementById('userTable');
      if (userTable) {
        const tbody = userTable.getElementsByTagName('tbody')[0];
        tbody.innerHTML = '';
        data.forEach(user => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.textContent = user.nombre;
          row.appendChild(nameCell);

          const lastNameCell = document.createElement('td');
          lastNameCell.textContent = user.apellido;
          row.appendChild(lastNameCell);

          const usernameCell = document.createElement('td');
          usernameCell.textContent = user.usuario;
          row.appendChild(usernameCell);

          const roleCell = document.createElement('td');
          roleCell.textContent = user.rol.nombre;
          row.appendChild(roleCell);

          const emailCell = document.createElement('td');
          emailCell.textContent = user.email;
          row.appendChild(emailCell);

          const actionCell = document.createElement('td');
          const editButton = document.createElement('button');
          editButton.innerHTML = '<i class="fas fa-pencil-alt"> Editar </i>';
          editButton.addEventListener('click', () => {
            obtenerYRenderizarRolesParaEditar();
            document.getElementById('editNombre').value = user.nombre;
            document.getElementById('editApellido').value = user.apellido;
            document.getElementById('editUsuario').value = user.usuario;
            document.getElementById('editEmail').value = user.email;
            document.getElementById('editRol').value = user.rol.id;

            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();

            document.getElementById('saveButton').addEventListener('click', () => {
              const nuevoNombre = document.getElementById('editNombre').value;
              const nuevoApellido = document.getElementById('editApellido').value;
              const nuevoUsuario = document.getElementById('editUsuario').value;
              const nuevoEmail = document.getElementById('editEmail').value;
              const nuevoRol = document.getElementById('editRol').value;
              if (nuevoNombre && nuevoApellido && nuevoUsuario && nuevoEmail && nuevoRol) {
                editarUsuario(user.id, nuevoNombre, nuevoApellido, nuevoUsuario, nuevoEmail, nuevoRol);
                editModal.hide();
              }
            });
          });
          actionCell.appendChild(editButton);
          row.appendChild(actionCell);

          tbody.appendChild(row);
        });
      }
    })
    .catch(error => console.error('Error:', error));
}

function editarUsuario(id, nuevoNombre, nuevoApellido, nuevoUsuario, nuevoEmail, nuevoRol) {
  fetch(`https://steady-hammerhead-fibre.glitch.me/api/users/curso-js-usuario/editar/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: nuevoNombre, apellido: nuevoApellido, usuario: nuevoUsuario, email: nuevoEmail, rol: nuevoRol }),
  })
    .then(response => {
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      return response.json();
    })
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: `¡Usuario ${data.usuario} editado con éxito!`,
      }).then(() => {
        obtenerUsuarios();
      });
    })
    .catch(error => console.error('Error:', error));
}

obtenerUsuarios();

function crearUsuario(nombre, apellido, usuario, email, password, rol) {
  fetch('https://steady-hammerhead-fibre.glitch.me/api/users/curso-js-usuario/crear', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre, apellido, usuario, email, password, rol }),
  })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Usuario creado con éxito',
      }).then(() => {
        window.location.href = '../html/usuarios.html';
      });
    })
    .catch(error => console.error('Error:', error));
}

function obtenerYRenderizarRolesParaEditar() {
  fetch('https://steady-hammerhead-fibre.glitch.me/api/users/curso-js-rol/roles')
    .then(response => response.json())
    .then(data => {
      const rolSelector = document.getElementById('editRol');
      if (rolSelector) {
        rolSelector.innerHTML = '';
        data.forEach(rol => {
          const option = document.createElement('option');
          option.value = rol.id;
          option.textContent = rol.nombre;
          rolSelector.appendChild(option);
        });
      }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
  const userForm = document.getElementById('formInforme');
  if (userForm) {
    userForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const nombre = document.getElementById('nombre').value;
      const apellido = document.getElementById('apellido').value;
      const usuario = document.getElementById('usuario').value;
      const email = document.getElementById('email').value;
      const password = document.getElementById('password').value;
      const rol = document.getElementById('rol').value;

      crearUsuario(nombre, apellido, usuario, email, password, rol);
    });
  }

  obtenerUsuarios();
  obtenerYRenderizarRolesParaEditar();
});

