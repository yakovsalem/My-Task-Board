
const allTasks = [];
function getAll(){
    //todo read local storege and sava global 
    const tasks = JSON.parse(localStorage.getItem("tasks"));
    return tasks;
}

function getOne(id){
    return items.find(x=>x.id==id);
}

function save(obj){
    obj.id = generateID();
    items.push(obj);
    //todo local storge 

    localStorage.setItem("tasks" , JSON.stringify(allTasks));
}

function update(obj){
    //get by id
    //update
    //save
}
function delete(id){

}

getAll();


function generateID(){
    const id = Date.now();
    return id;
}