const { method } = require("lodash");
const { cos } = require("prelude-ls");

const input = document.querySelector('.input-btn input');
const listTasks = document.querySelector('.list-tasks ul');
const message = document.querySelector('.list-tasks');

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

async function editBtn(id){
    let newName = prompt("Edita la tarea")

    let result = await fetch("http://localhost:3000/tasks")
    let data = await result.json()

    data.forEach(async task =>{
        if(id === task.id){
            const response = await fetch (`http://localhost:3000/tasks/${task.id}`, {
                method: "PUT",
                headers:{
                    "Content-type": "application/json",
                },
                body: JSON.stringify({
                    ...task,
                    task: newName,
                })
            })
        }
    })
}
