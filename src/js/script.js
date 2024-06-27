// Obtengo el contenedor donde se mostrarán todas las tareas.
const tasksContainer = document.getElementById('tasks-container');
// Obtengo los elementos del DOM que se encargarán de las funcionalidades de la To-Do List App (input donde se ingresa la tarea, botón para añadir una tarea, error, footer).
const inputTask = document.getElementById('input');
const addButton = document.getElementById('add-task-btn');
const errorElement = document.getElementById('error');
const footer = document.querySelector('footer')

// Función que se encarga de actualizar los contadores de tareas completadas y no completadas.
const updateCounters = () => {
// Obtengo los contadores que se encargarán de mostrar las tareas completadas y no completadas.
const completedCounter = document.getElementById('completed-counter');
const uncompletedCounter = document.getElementById('uncompleted-counter');
// Obtengo todos los checkboxes que tienen el atributo checked y los checkboxes que no tienen el atributo checked.
const completedTasks = document.querySelectorAll("input[type='checkbox']:checked").length;
const uncompletedTasks = document.querySelectorAll("input[type='checkbox']:not(:checked)").length;
// Actualizo los contadores de tareas completadas y no completadas con la cantidad de checkboxes que tienen el atributo checked y los checkboxes que no tienen el atributo checked.
completedCounter.textContent = completedTasks; 
uncompletedCounter.textContent = uncompletedTasks;
}

// Función que se encarga de obtener el valor del input, es decir -> tarea ingresada por el usuario.
const getInputTaskValue = () => {
    const value = inputTask.value.trim();
    return value;
};

// Otorgo un evento click al addButton para que cuando se haga click en él, obtenga la tarea que el usuario ingresó y posteriormente ejecute la función addTask.
addButton.addEventListener('click', function() {
    // Obtengo la tarea que el usuario ingresó.
    const taskValue = getInputTaskValue();
    //Añado la tarea al DOM.
    addTask(taskValue);
    updateCounters();
    updateFooterVisibility();
});

document.addEventListener('keydown', function(event) {
    if (event.code === 'Enter') {
        event.preventDefault();
        // Obtengo la tarea que el usuario ingresó.
        const taskValue = getInputTaskValue();
        //Añado la tarea al DOM.
        addTask(taskValue);
        updateCounters();
        updateFooterVisibility();
    }
});

const addTask = (nameOfTheTask) => {
    // obtengo el valor del input.
    const taskValue = getInputTaskValue();
    
    if (taskValue === '') {
        errorElement.classList.remove('hidden');
        setTimeout(() => {
            errorElement.classList.add('hidden');
        }, 3000);
        return;
    }

    // Creo el li que contendrá la tarea, le otorgo un id, y le asigno una clase.
    const task = document.createElement('li');
    task.id = 'task';
    task.className = 'w-full max-w-xl flex justify-between items-center p-4 bg-gray-100 rounded-xl border border-gray-300';
    
    // Creo el div 'taskNameWrapper' que contendrá un <h1> con el nombre de la tarea ingresada por el usuario.
    const taskNameWrapper = document.createElement('div');
    taskNameWrapper.className = 'flex-grow overflow-hidden';
    // Creo el h1 que contendrá el nombre de la tarea.
    const taskName = document.createElement('h1');
    taskName.className = 'break-words whitespace-normal w-full h-auto overflow-hidden text-md text-gray-700 font-bold';
    // El nombre de la tarea (valor del input) se muestra en el h1.
    taskName.innerText = taskValue;
    // Añado el h1 al taskNameWrapper.
    taskNameWrapper.appendChild(taskName);
    
    // Creo el div 'taskActionWrapper' que contendrá el deleteButton y el checkbox.
    const taskActionsWrapper = document.createElement('div');
    taskActionsWrapper.className = 'flex items-center justify-center gap-2';
    
    // Creo el checkBox.
    const checkBox = document.createElement('input');
    checkBox.type = 'checkbox';
    checkBox.className = 'form-checkbox h-5 w-5 text-teal-700 border-gray-300 rounded focus:bg-blue-500 px-2';
    // Cuando el estado del checkbox cambie, actualizo los contadores de tareas completadas y no completadas.
    checkBox.addEventListener('change', function() {
        updateCounters();
    });
    // Añado el checkbox al taskActionsWrapper.
    taskActionsWrapper.appendChild(checkBox);

    // Creo el deleteButton.
    const deleteButton = document.createElement('button');
    deleteButton.className = 'hover:bg-blue-500 bg-blue-900 text-black px-2 border-2 border-blue-700 text-white rounded';
    deleteButton.innerHTML = 'Delete';
    // Otorgo un evento click al deleteButton para que cuando se haga click en él, elimine el li que contiene la tarea.
    deleteButton.addEventListener('click', function() {
    tasksContainer.removeChild(task);
    updateCounters();
    updateFooterVisibility();
    });
    // Añado el deleteButton al taskActionsWrapper.
    taskActionsWrapper.appendChild(deleteButton);
    
    // Creo el editButton.
    const editButton = document.createElement('button');
    editButton.className = 'hover:bg-blue-500 bg-blue-900 text-black px-2 border-2 border-blue-700 text-white rounded';
    editButton.innerHTML = 'Edit';
    // Otorgo un evento click al editButton para que cuando se haga click en él, se muestre un prompt para ingresar el nuevo nombre de la tarea.
    editButton.addEventListener('click', function() {
        const newNameTask = window.prompt('Enter the new task name:', '');
        if (newNameTask !== null && newNameTask !== '') {
            task.querySelector('h1').innerText = newNameTask;
        };
    });
    // Añado el editButton al taskActionsWrapper.
    taskActionsWrapper.appendChild(editButton);
    
    task.appendChild(taskNameWrapper);
    task.appendChild(taskActionsWrapper);

    // Si el usuario ingresó una tarea, la agrego al DOM y limpio el input para que el usuario pueda ingresar otra tarea distinta.
    tasksContainer.appendChild(task);
    inputTask.value = '';
};

// Función que se encarga de mostrar/ocultar el footer dependiendo de si hay tareas agregadas o no.
const updateFooterVisibility = () => {
    const tasks = tasksContainer.children.length; // cantidad de tareas existentes en ul id='tasksContainer'
    if (tasks === 0) {
        footer.classList.add('hidden');
    } else {
        footer.classList.remove('hidden');
    }
};
