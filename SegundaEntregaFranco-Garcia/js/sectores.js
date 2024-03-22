function obtenerSectores() {
  fetch('https://steady-hammerhead-fibre.glitch.me/api/sectors/curso-js-sector/sectores')
    .then(response => response.json())
    .then(data => {
      const sectorTable = document.getElementById('sectorTable').getElementsByTagName('tbody')[0];
      sectorTable.innerHTML = ''; 
      data.forEach(sector => {
        const row = document.createElement('tr');

        const nameCell = document.createElement('td');
        nameCell.textContent = sector.sector;
        row.appendChild(nameCell);

        const actionCell = document.createElement('td');
        const editButton = document.createElement('button');
        editButton.innerHTML = '<i class="fas fa-pencil-alt"> Editar </i>';
        editButton.addEventListener('click', () => {
          document.getElementById('editInput').value = sector.sector;
          const editModal = new bootstrap.Modal(document.getElementById('editModal'));
          editModal.show();

          document.getElementById('saveButton').addEventListener('click', () => {
            const nuevoNombre = document.getElementById('editInput').value;
            if (nuevoNombre) {
              editarSector(sector.id, nuevoNombre);
              editModal.hide();
            }
          });
        });
        actionCell.appendChild(editButton);
        row.appendChild(actionCell);

        sectorTable.appendChild(row);
      });
    })
    .catch(error => console.error('Error:', error));
}

function crearSector(sector) {
  fetch('https://steady-hammerhead-fibre.glitch.me/api/sectors/curso-js-sector/crear', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sector }),
  })
    .then(response => response.json())
    .then(data => {
      Swal.fire({
        icon: 'success',
        title: '¡Éxito!',
        text: 'Sector agregado con éxito',
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          obtenerSectores();
        }
      });
    })
    .catch(error => console.error('Error:', error));
}

function editarSector(id, nuevoNombre) {
  fetch(`https://steady-hammerhead-fibre.glitch.me/api/sectors/curso-js-sector/editar/${id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ sector: nuevoNombre }),
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
        text: 'Sector editado exitosamente',
        timer: 2000,
        timerProgressBar: true,
      }).then((result) => {
        if (result.dismiss === Swal.DismissReason.timer) {
          obtenerSectores(); 
        }
      });
    })
    .catch(error => console.error('Error:', error));
}
obtenerSectores();

document.getElementById('sectorForm').addEventListener('submit', function (event) {
  event.preventDefault();

  const sector = document.getElementById('sector').value;
  crearSector(sector);
});

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