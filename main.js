let allTasks = [];

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


function printTasks(allTasks){
    const notesArea = document.getElementById("taskNotesArea");
    notesArea.innerHTML = "";
    for(const obj of allTasks){
        const note = `
        <div class="note" id="${obj.id}">
            <i class="bi-x-square-fill removeBtn" onclick="removeTask(${obj.id})"></i>
            <div class="noteText" dir="auto">${obj.taskText}</div>
            <div class="noteData">
            <p>${obj.date}</p>
            <p>${obj.time}</p>
        </div>`
        notesArea.innerHTML += note;
    }
    // for(let i = 0; i < allTasks.length; i++){
    //     if (i === allTasks.length - 1){
    //         const note = `
    //         <div class="note fadeIn" id="${allTasks[i].id}">
    //         <i class="bi-x-square-fill removeBtn" onclick="removeTask(${allTasks[i].id})"></i>
    //         <div class="noteText">${allTasks[i].taskText}</div>
    //         <div class="noteData">
    //         <p>${allTasks[i].date}</p>
    //         <p>${allTasks[i].time}</p>
    //         </div>`
    //         notesArea.innerHTML += note;
    //     } else {
    //         const note = `
    //         <div class="note" id="${allTasks[i].id}">
    //         <i class="bi-x-square-fill removeBtn" onclick="removeTask(${allTasks[i].id})"></i>
    //         <div class="noteText">${allTasks[i].taskText}</div>
    //         <div class="noteData">
    //         <p>${allTasks[i].date}</p>
    //         <p>${allTasks[i].time}</p>
    //         </div>`
    //         notesArea.innerHTML += note;
    //     }
    // }
}

function removeTask(id){
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

