let allTasks = [];
let taskSelected;


addBtn.style.display = "block";
updateBtn.style.display = "none";

loadStorage();

function loadStorage(){
    allTasks = readStorage ();
    taskEnd(allTasks);
    printTasks(allTasks)

}

function addTask(){
    if(!valid()){
        return;
    }
    const task = setTask();
    task.id = generateID();
    allTasks = readStorage ();
    allTasks.push(task);
    saveStorage(allTasks);
    printTasks(allTasks);
    // clearForm();
}

function readStorage(){
    const str = localStorage.getItem("tasks");
    const tasks = str === null? [] : JSON.parse(str);
    return tasks;
}

function setTask(){
    const taskText = taskTextBox.value;
    const date = dateBox.value;
    const time = timeBox.value;

    const task = {taskText, date, time};
    return task;
}

function saveStorage(allTasks){
    localStorage.setItem("tasks" , JSON.stringify(allTasks));
}

// function printTask(task){
//     // const notesArea = document.getElementById("taskNotesArea");
//     const div = document.createElement("div");
//     div.id = task.id;
//     div.className = "note";
//     // div.onclick = selectTask(task.id);
//     div.onclick = function () {
//         this.parentElement.selectTask(task.id);
//     };
//     div.innerHTML = `
//         <i class="bi-x-square-fill removeBtn" onclick="removeTask(${task.id})"></i>
//         <div class="noteText">${task.taskText}</div>
//         <div class="noteData">
//         <p>${task.date}</p>
//         <p>${task.time}</p>
//      `;
//     document.getElementById("taskNotesArea").appendChild(div);
// }

function printTasks(allTasks){
    const notesArea = document.getElementById("taskNotesArea");
    notesArea.innerHTML = "";
    for(const obj of allTasks){
        const note = `
        <div class="note" onclick="selectTask(${obj.id})" id="${obj.id}">
            <i class="bi-x-square-fill removeBtn" onclick="removeTask(${obj.id})"></i>
            <div class="noteText">${obj.taskText}</div>
            <div class="noteData">
            <p>${obj.date}</p>
            <p>${obj.time}</p>
        </div>`
        notesArea.innerHTML += note;
    }
}

function removeTask(id){
    // allTasks = readStorage ();
    for (let i = 0; i < allTasks.length; i++) {
        if(allTasks[i].id == id){
            allTasks.splice(i, 1);
            saveStorage(allTasks);
            printTasks(allTasks);
            return;
        }
    }
}

function taskEnd(){
    const todayDate = new Date().toISOString().slice(0, 10);
    for (let i = 0; i < allTasks.length; i++) {
        if (allTasks[i].date <= todayDate){
            allTasks.splice(i, 1);
            saveStorage(allTasks);
            return;
        }
    }
}

function selectTask(id){
    allTasks = readStorage ();
    taskSelected = allTasks.find((current) => current.id == id);
    taskTextBox.value = taskSelected.taskText;
    dateBox.value = taskSelected.date;
    timeBox.value = taskSelected.time;
    addBtn.style.display = "none";
    updateBtn.style.display = "block";
}

function updateTask(){
    if(!valid()){
        return;
    }
    allTasks = readStorage ();
    const task = setTask();
    task.id = taskSelected.id;
    let index = allTasks.findIndex((current) => current.id == taskSelected.id);
    allTasks[index] = task;
    saveStorage(allTasks);
    printTasks(allTasks);
    clearForm();
    taskSelected = null;
    addBtn.style.display = "block";
    updateBtn.style.display = "none";
}



function valid(){
    if(taskTextBox.value === ""){
        alert("Missing text for task");
        return;
    }
    if(dateBox.value === ""){
        alert("Please enter a future date");
        return;
    }
    if(timeBox.value === ""){
        alert("Please enter a time");
        return;
    }
    return true;
}

function clearForm(){
    taskTextBox.value = "";
    dateBox.value = "";
    timeBox.value = "";
    taskTextBox.focus();
}

function generateID(){
    const id = Date.now();
    return id;
}

