let elForm = document.querySelector(".form")
let elInput = document.querySelector(".form-input")
let elList = document.querySelector(".list")

let elModalWrapper = document.querySelector(".modal-wrapper")
let elModal = document.querySelector(".modal")

let allCounted = document.querySelector(".all")
let completeCount = document.querySelector(".completed")
let uncompleteCount = document.querySelector(".uncompleted")

let todo = JSON.parse(window.localStorage.getItem("todo")) || []

elForm.addEventListener("submit", function(evt){
    evt.preventDefault();
    let inputValue = elInput.value.trim();
    if (inputValue !== '') {
        let data = {
            id: todo.length + 1,
            value: inputValue,
            isComplete: false,
        };
        todo.push(data);
        renderList(todo, elList);
        renderCount();
        evt.target.reset();
        window.localStorage.setItem("todo", JSON.stringify(todo))
    }
});


function renderList(arr, list){
    list.innerHTML = ""
    arr.map((item, index) => {
        let elItem = document.createElement("li")
        elItem.classList.add("todo-item")
        elItem.innerHTML = `
        <div class="value-wrapper ${item.isComplete ? "complete" : ""}">
            <span>${index + 1}.</span>
            <strong>${item.value}</strong>
        </div>
        <div class="btn-wrapper">
            <input class="checkbox-todo" type="checkbox" id="${item.id}"/>
            <button onclick="updateClick(${item.id})">Update</button>
            <button onclick="deleteBtnClick(${item.id})">Delete</button>
        </div>
        `
        list.appendChild(elItem)
    })
}
renderList(todo, elList)
// counts click start

allCounted.parentElement.addEventListener("click", function(){
    renderList(todo, elList)
})
completeCount.parentElement.addEventListener("click", function(){
    const data = todo.filter(item => item.isComplete == true)
    renderList(data, elList)
})
uncompleteCount.parentElement.addEventListener("click", function(){
    const data = todo.filter(item => item.isComplete == false)
    renderList(data, elList)
})
// counts click end

// update start

function updateClick(id){
    elModalWrapper.classList.add("open-modal")
    const data = todo.find(item => item.id === id)

    elModal.innerHTML = `
    <div class="update-wrapper">
        <strong>Update Your ToDo</strong>
        <input class="update-input" type="text" value="${data.value}" placeholder="Enter your ToDo"/>
        <button onclick="updateBtnClick(${id})">Update</button>
    </div>
   `
}
function updateBtnClick(id){
    let elUpdateValue = document.querySelector(".update-input").value
    const data = todo.find(item => item.id === id)
    data.value = elUpdateValue
    elModalWrapper.classList.remove("open-modal")
    renderList(todo, elList)
    renderCount();
    window.localStorage.setItem("todo", JSON.stringify(todo))
}
// update end

// delete start

function deleteBtnClick(id){
    elModalWrapper.classList.add("open-modal")
    elModal.innerHTML = `
    <div class="delete-wrapper">
        <h2>Are you sure to delete?</h2>
        <div>
            <button onclick="cancelModal()">Cancel</button>
            <button onclick="deleteSureBtn(${id})">Delete</button>
        </div>
    </div>
    `
}
function cancelModal(){
    elModalWrapper.classList.remove("open-modal")
}

function deleteSureBtn(id){
    const data = todo.findIndex(item => item.id === id)
    todo.splice(data, 1)
    elModalWrapper.classList.remove("open-modal")
    renderList(todo, elList)
    renderCount()
    window.localStorage.setItem("todo", JSON.stringify(todo))
}
// delete end

// modal start

elModalWrapper.addEventListener("click", function(evt){
    if(evt.target.id == "modal-wrapper"){
        elModalWrapper.classList.remove("open-modal")
}
})

// modal end

// checkbox start

elList.addEventListener("click", function(evt){
    if(evt.target.matches(".checkbox-todo")){
        const id = evt.target.id;
        const data = todo.find(item => item.id.toString() === id);
        if (data) {
            data.isComplete = !data.isComplete;
            renderList(todo, elList);
            renderCount();
            window.localStorage.setItem("todo", JSON.stringify(todo))
        }
    }
});
// checkbox end

// complete start
function renderCount() {
    let allCount = todo.length;
    let completedCount = todo.filter(item => item.isComplete).length;
    let uncompletedCount = todo.filter(item => !item.isComplete).length;

    document.querySelector('.all').innerText = allCount;
    document.querySelector('.completed').innerText = completedCount;
    document.querySelector('.uncompleted').innerText = uncompletedCount;
    window.localStorage.setItem("todo", JSON.stringify(todo))
}
renderCount();
// complete end
