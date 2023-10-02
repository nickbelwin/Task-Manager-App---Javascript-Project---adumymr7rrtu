var newTask = document.querySelector("#create-task");
var openTasks = document.querySelector(".append-task");
var modal = document.querySelector(".modal");
var closeSpan = document.querySelector(".close");
var allCardContents = document.querySelectorAll("#card-contents");
var btn = document.querySelector("#add-task");

//count of tasks
let count = 1;

//previous id of task
let prevId;


//Create a new task
newTask.addEventListener('click', () => {
    modal.style.display = "flex";
    // console.log(openTasks.childElementCount);
    if(allCardContents[0].childElementCount === 0 &&
        allCardContents[1].childElementCount === 0 &&
        allCardContents[2].childElementCount === 0 &&
        allCardContents[3].childElementCount === 0){
        
        //If there is no task, the serial no. will start from 1
        count = 1;
    }
});

//close modal
closeSpan.addEventListener('click', () => {
    modal.style.display = "none";
});

//close modal on clicking wherever in the window
window.onclick = function(event){
    if(event.target == modal){
        modal.style.display = "none";
    }
}

//allowing drop to different cards
function allowDrop(e){
    e.preventDefault();
}

//allowing drag of tasks
function drag(e){
    e.dataTransfer.setData("task-card", e.target.id);
    prevId = e.target.parentNode.parentNode.id;
}


//drop will work only if the previous source element id of the task is same as the target element class
//Users can only proceed in the given sequence "Open" -> "In-Progress" -> "In-Review" -> "Done"
function drop(e){
    if(
        prevId == e.target.classList[0]
    ){
        e.preventDefault();
        var data = e.dataTransfer.getData("task-card");
        if(e.target.id === "card-contents"){
            e.target.appendChild(document.getElementById(data));
        }
    }else{
        // console.log('PrevId: ' +prevId);
        // console.log('NextClass: '+e.target.parentNode.id);
        alert('You cannot go from "'+prevId+'" to "'+e.target.parentNode.id+'".');

    }
}

//Deletion of a created/completed task
function deleteTask(event){
    let delNode = event.currentTarget.parentNode.parentNode;
    delNode.removeChild(event.currentTarget.parentNode);
}

//Creation of a task
btn.addEventListener('click', () => {
    let taskName = document.querySelector("#task-name");
    let taskDesc = document.querySelector("#task-description");
    if(taskName.value === ""){
        alert("Please enter a task name!");
        return;
    }
    let taskDiv = document.createElement("div");
    taskDiv.classList.add("task");
    taskDiv.setAttribute("id", count);
    taskDiv.draggable = "true";
    taskDiv.ondragstart = drag;

    let taskHead = document.createElement("div");
    taskHead.classList.add("task-heading");

    taskHead.textContent = count +".    "+ taskName.value;
    taskName.value = "";
    
    let taskBody = document.createElement("div");
    taskBody.classList.add("task-body");

    taskBody.textContent = taskDesc.value;
    taskDesc.value = "";

    let delBin = document.createElement("span");
    delBin.classList.add("bin-img");
    delBin.classList.add("removebtn");
    delBin.onclick = deleteTask;
    delBin.setAttribute("id", count);
    delBin.textContent = 'REMOVE';

    taskDiv.appendChild(delBin);
    taskDiv.appendChild(taskHead);
    taskDiv.appendChild(taskBody);

    openTasks.appendChild(taskDiv);
    modal.style.display = "none";
    count++;
});


