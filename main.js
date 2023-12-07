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
        const { valueTask, isChecked } = task;

        const taskElement = document.createElement('li')
        taskElement.classList.add('todo-item')
        listTasks.appendChild(taskElement);

        const checkboxElement = document.createElement('input')
        checkboxElement.type ="checkbox";
        checkboxElement.checked = isChecked;
        taskElement.appendChild(checkboxElement);

        const textElement = document.createElement('span')
        textElement.classList.add('todo-item__description')
        textElement.innerText = valueTask;
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
        checkboxElement.addEventListener('change', () => {
            checkboxElement.checked
                ? textElement.classList.add('todo-item--checked')
                : textElement.classList.remove('todo-item--checked')
            updateCheckedStatusInLocalStorage (task, checkboxElement.checked)
        })
    }
    const updateCheckedStatusInLocalStorage = (task, isChecked) => {
        const tasks = JSON.parse(localStorage.getItem(KEY));
        const taskIndex = tasks.findIndex((item) => item.valueTask === task.valueTask);
        if (taskIndex !== -1) {
            tasks[taskIndex].isChecked = isChecked;
            localStorage.setItem(KEY, JSON.stringify(tasks));
        }
    };

    //видалення задачі з Local storage
    const removeFromLocalStorage = (task) => {
        const tasks = JSON.parse(localStorage.getItem(KEY));
        const newTasks = tasks.filter((item) => item.valueTask !== task.valueTask);
        localStorage.setItem(KEY, JSON.stringify(newTasks));
    };

    //збереження данних в Local storage після перезавантаження сторінки
    const getDataFromLoad = () => {
        const tasks = JSON.parse(localStorage.getItem(KEY));
        if (tasks !== null) {
            tasks.forEach((task) => {
                setNewTask(task)

                const taskElement = listTasks.lastChild;
                if (task.isChecked) {
                    taskElement.querySelector('.todo-item__description').classList.add('todo-item--checked');
                }
            })
        }
    }

    //додання нової задачі в todo list
    addTaskButton.addEventListener('click', function(event) {
        event.preventDefault();
        const taskData = {
            valueTask: form.elements.value.value,
            isChecked: false
        };
        setNewTask (taskData)
        setToLocalData(taskData)
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



