function toDoList (props) {
    const {form, addTaskButton, listTasks} = props;
    const KEY = 'tasks';

    // створення Local Storage
    const setToLocalData = (task) => {
        const currentLocalTask = localStorage.getItem(KEY);

        if(currentLocalTask===null) {
            localStorage.setItem(KEY, JSON.stringify([task]))
        } else {
            const tasks = JSON.parse(currentLocalTask);
            tasks.push(task)
            localStorage.setItem(KEY, JSON.stringify(tasks))
        }
    }

    // створення DOM
    const setNewTask = (task) => {

        const taskElement = document.createElement('li')
        taskElement.classList.add('todo-item')
        listTasks.appendChild(taskElement);

        const checkboxElement = document.createElement('input')
        checkboxElement.type ="checkbox"
        taskElement.appendChild(checkboxElement);

        const textElement = document.createElement('span')
        textElement.classList.add('todo-item__description')
        textElement.innerText = task;
        taskElement.appendChild(textElement);

        const delBut = document.createElement('button');
        delBut.classList.add('todo-item__delete')
        delBut.innerText = 'Delete';
        taskElement.appendChild(delBut);

        // видалення задачі
        delBut.addEventListener('click', () => {
            listTasks.removeChild(taskElement);
            removeFromLocalStorage(task);
        });

        // відзначення задачі викононаною
        checkboxElement.addEventListener('click', () => {
            textElement.classList.add('todo-item--checked');
        })
    }

    //видалення задачі з Local storage
    const removeFromLocalStorage = (task) => {
        const tasks = JSON.parse(localStorage.getItem(KEY));
        const newTasks = tasks.filter((item) => item !== task);
        localStorage.setItem(KEY, JSON.stringify(newTasks));
    };

    //збереження данних в Local storage після перезавантаження сторінки
    const getDataFromLoad = () => {
        const tasks = JSON.parse(localStorage.getItem(KEY));
        if (tasks !== null) {
            tasks.forEach(setNewTask)
        }
    }

    //додання нової задачі в todo list
    addTaskButton.addEventListener('click', function(event) {
        event.preventDefault();
        const textTask = form.elements.value.value;
        setNewTask (textTask)
        setToLocalData(textTask)
    })

    getDataFromLoad()

}

document.addEventListener('DOMContentLoaded', ()=> {
    toDoList( {
        form: document.querySelector('.js--form'),
        addTaskButton: document.querySelector('.form__btn'),
        listTasks: document.querySelector('.js--todos-wrapper'),
    })
})
