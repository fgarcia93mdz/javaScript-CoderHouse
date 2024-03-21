function obtenerRoles() {
  fetch('http://localhost:8080/api/users/curso-js-rol/roles')
    .then(response => response.json())
    .then(data => {
      const rolTableBody = document.querySelector('#rolTable tbody');
      if (rolTableBody) {
        rolTableBody.innerHTML = '';
        data.forEach(rol => {
          const row = document.createElement('tr');

          const nameCell = document.createElement('td');
          nameCell.textContent = rol.nombre;
          row.appendChild(nameCell);

          const actionCell = document.createElement('td');
          const editButton = document.createElement('button');
          editButton.innerHTML = '<i class="fas fa-pencil-alt"> Editar </i>';
          editButton.addEventListener('click', () => {
            document.getElementById('editInput').value = rol.nombre;
            const editModal = new bootstrap.Modal(document.getElementById('editModal'));
            editModal.show();

            document.getElementById('saveButton').addEventListener('click', () => {
              const nuevoNombre = document.getElementById('editInput').value;
              if (nuevoNombre) {
                editarRol(rol.id, nuevoNombre);
                editModal.hide();
              }
            });
          });
          actionCell.appendChild(editButton);
          row.appendChild(actionCell);

          rolTableBody.appendChild(row);
        });
      }
    })
    .catch(error => console.error('Error:', error));
}

document.addEventListener('DOMContentLoaded', (event) => {
  obtenerRoles();
  const cargarRolesButton = document.getElementById('cargarRoles');
  if (cargarRolesButton) {
    cargarRolesButton.addEventListener('click', obtenerRoles);
  }
});

function crearRol(rol) {
  console.log("🚀 ~ crearRol ~ rol:", rol)
  fetch('http://localhost:8080/api/users/curso-js-rol/crear', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: rol }),
  })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Rol agregado con éxito',
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          obtenerRoles();
        }
      });
    })
    .catch(error => console.error('Error:', error));
}

function editarRol(id, nuevoNombre) {
  fetch(`http://localhost:8080/api/users/curso-js-rol/editar/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ nombre: nuevoNombre }),
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
        text: `¡Rol ${data.rol} editado con éxito!`,
      }).then(() => {
        obtenerRoles();
      });
    })
    .catch(error => console.error('Error:', error));
}


document.addEventListener('DOMContentLoaded', function () {
  document.getElementById('rolForm').addEventListener('submit', function (event) {
    event.preventDefault();
    const rol = document.getElementById('rol').value;
    crearRol(rol);
    document.getElementById('rol').value = '';
  });

});

document.addEventListener('DOMContentLoaded', function () {
  const editForm = document.getElementById('editForm');
  if (editForm) {
    editForm.addEventListener('submit', function (event) {
      event.preventDefault();
      const nuevoNombre = document.getElementById('editInput').value;
      if (nuevoNombre) {
        editarRol(rol.id, nuevoNombre);
      }
    });
  } else {
    console.log("El formulario de edición no se encontró en la página.");
  }
});