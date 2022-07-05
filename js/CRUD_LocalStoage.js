// Globals
const formularioUI = document.querySelector('#formulario');
const listaActividadesUI = document.querySelector('#listaActividades');
let arrayActividades = [];
const localStorageVar = 'actividad';

// Functions
// Add items to array
const CrearItem = (actividad) => {
    let item = {
        actividad: actividad,
        estado: 'To Do',
        colors: {
            toDo: 'alert-danger',
            done: 'alert-success'
        },
    };

    arrayActividades.push(item);
    return item;
}

// Save into local storage
const GuardarActividad = (actividad) => {
    // Save into local storage as JSON
    localStorage.setItem(localStorageVar, JSON.stringify(arrayActividades))
    LeerDB();

}
// read from local Storage
const LeerDB = () => {
    // Clean the div before read from local and show it
    listaActividadesUI.innerHTML = '';
    // Replace the array with the JSON local storage content
    arrayActividades = JSON.parse(localStorage.getItem(localStorageVar));
    // Prevent null if nothing in local storage
    if(arrayActividades === null) {
        arrayActividades = [];
    } else {
        arrayActividades.forEach(element => {
            if(element.estado === 'Done') {
                listaActividadesUI.innerHTML += `<div class="alert ${element.colors.done} shadow p-3 mb-3 rounded" role="alert">
                <i class="material-icons float-start mr-2 pe-3 ">
                accessibility
                </i>
                <b>${element.actividad}</b> - ${element.estado}
                <span class="float-end">
                <i class="material-icons float-start mr-2"  style="cursor: pointer;">
                    done
                </i>
                <i class="material-icons float-start mr-2"  style="cursor: pointer;">
                    delete
                </i>
                </span>
                </div>`;
            } else {
                listaActividadesUI.innerHTML += `<div class="alert ${element.colors.toDo} shadow p-3 mb-3 rounded" role="alert">
                <i class="material-icons float-start mr-1 pe-3">
                accessibility
                </i>
                <b>${element.actividad}</b> - ${element.estado}
                <span class="float-end">
                    <i class="material-icons float-start me-2"  style="cursor: pointer;">
                        done
                    </i>
                    <i class="material-icons float-start me-2"  style="cursor: pointer;">
                        delete
                    </i>
                </span>
                </div>`;
            };
        });
    }
}

// Delete from local Storage
const EliminarDB = (actividad) => {
    let indexArray;
    arrayActividades.forEach((elemento, index) => {
        // Get the index of the activity  option 1
        if (elemento.actividad === actividad) {
            indexArray = index;
        }
    });
    // Delete the activity
    arrayActividades.splice(indexArray, 1);
    GuardarActividad(arrayActividades);
}

const EditarDB = (actividad) => {
    // Get the index if the activity option 2
    let indexArray = arrayActividades.findIndex((elemento)=>elemento.actividad === actividad);
    // Change estado and color
    arrayActividades[indexArray].estado = 'Done';

    GuardarActividad(arrayActividades);
}


//Event Listeners
formularioUI.addEventListener('submit', (e) => {
    //Prevent reload page
    e.preventDefault();
    // Get input
    let actividadUI = document.querySelector('#actividad').value;
    // Push input into the array
    CrearItem(actividadUI);
    // Save input in local Storage
    GuardarActividad(actividadUI);
    // Clean form
    formularioUI.reset();
});
// Load from LStorage and complete the activiades container
document.addEventListener('DOMContentLoaded', LeerDB());

listaActividadesUI.addEventListener('click', (e) => {
    e.preventDefault();
    // Get the name of the activity
    const texto = e.path[2].childNodes[3].innerHTML;
    // Get the icon name
    if(e.target.innerHTML.trim() === 'done') {
        EditarDB(texto)
    };
    if(e.target.innerHTML.trim() === 'delete') {
        EliminarDB(texto)
    };
})