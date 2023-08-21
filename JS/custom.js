const input = document.querySelector('.input-btn input');
const listTasks = document.querySelector('.list-tasks ul');
const message = document.querySelector('.list-tasks');

function deleteTask(e){
    if (e.target.tagName == 'SPAN') {
        const deleteId = parseInt(e.target.getAttribute('task-id'));
        tasks = tasks.filter(task => task.id !== deleteId);
        createHTML();
    }
}

async function addTasks(){
    const task = input.value;
    if (task === '') {
        showError('The field is empty...');
        return;
    }
    let result = await fetch("http://localhost:3000/tasks", {
        method: "POST",
        headers:{
            "Content-type": "application/json; charset=utf-8"
        },
        body:JSON.stringify(
            {
                task: task,
                description: "",
                type: ""
            }
        )
    })
    let data = await data.JSON()
    

    input.value = '';
}

document.addEventListener("DOMContentLoaded", createHTML)

async function createHTML(){
    clearHTML();
    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()
    console.log(data)
    data.forEach(task => {
        const li = document.createElement('li');
        li.innerHTML = `${task.task} <img onClick="editBtn(${task.id})" src="../images/Tablet pen.png"> <img onClick="deleteBtn(${task.id})" src="../images/Trash.png"> <img onClick="checkBtn(${task.id})" src="../images/Check.png">`;

        listTasks.appendChild(li);
    });
}

function showError(error){
    const messageError = document.createElement('p');
    messageError.textContent = error;
    messageError.classList.add('error');

    message.appendChild(messageError);
    setTimeout(() => {
        messageError.remove();
    },4000);

}

function clearHTML(){
    listTasks.innerHTML = '';
}