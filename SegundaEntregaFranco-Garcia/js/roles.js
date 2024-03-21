function obtenerYRenderizarRolesParaEditar() {
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
  obtenerYRenderizarRolesParaEditar();
  const cargarRolesButton = document.getElementById('cargarRoles');
  if (cargarRolesButton) {
    cargarRolesButton.addEventListener('click', obtenerYRenderizarRolesParaEditar);
  }
});