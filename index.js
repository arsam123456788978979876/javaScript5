const save_button = document.querySelector("#save_btn");
const title_input  = document.querySelector("#title")
const list = document.querySelector(".list")
const deleteAll = document.querySelector(".delete_all")


let todo_list = [];

function renderItem(todo_item) {
    //<div class="item">
    const item = document.createElement("div")
    item.classList.add("item")

    //<input type="checkbox"/>

    const checkbox = document.createElement("input");
    checkbox.setAttribute("type" , "checkbox")
    checkbox.checked = todo_item.status;

    //<span>Item 1</span>

    const span = document.createElement("span");
    span.textContent = todo_item.title;

    // <button>delete</button>
    const deleteBnt = document.createElement("button");
    deleteBnt.classList.add("delete");
    deleteBnt.textContent = "Delete";


    item.appendChild(checkbox);
    item.appendChild(span);
    item.appendChild(deleteBnt);

    list.appendChild(item)

    checkbox.addEventListener("click" ,  () => {

        toggleStatus(todo_item.title);
    })

    deleteBnt.addEventListener("click" ,  () => {
        remove(todo_item.title)
    }
    )
}

function clearInput() {
    title_input.value = ""
}

function renderList() {

    list.innerHTML = "";



    for(let i=0; i<todo_list.length; i++) { // همیشه فور برامون کار نمیکنه چون شاید به احتمال زیاد نال برگردونه ما باید شرط بزاریم که همیشه بهمون ارایه برگردونه
        const item = todo_list[i]
        renderItem(item)
    }
}

function toggleStatus(title) {
    for(let i = 0; i <todo_list.length; i++) {
        const list_item = todo_list[i]
        
        if(list_item.title === title) {
            list_item.status =  !list_item.status // ?false :true
        }
    }

    syncStorage();
}
function addItem(item) {
    const next_item = {
        title: item.title,
        status: item.status,
    }
    todo_list.push(next_item);

    syncStorage()
}
function remove(title) {
    for(let i = 0; i <todo_list.length; i++) {
        const list_item = todo_list[i]
        
        if(list_item.title === title) {
            todo_list.splice(i , 1)
        }
    }

    syncStorage()
    renderList()
}
function syncStorage() {

   

        
    
    const next_list = JSON.stringify(todo_list);
    localStorage.setItem("my_list" , next_list );
}

function loadFromStorage() {
    let listFromStorage= JSON.parse(localStorage.getItem("my_list")) || [];
// if( !previous_list ) { // تو این خط میگه اگر پریویس لیست وجود نداشت یا مساوی نال بود بیا برامون مساویش کن با ارایه
//     previous_list = []
// }
todo_list = listFromStorage


}
function onAddItem() {
    const val = title_input.value;
    
    if(val === "") {
        alert("hoyyyyyyyyy")
    }else {
        const item =  {
            title: val,
            status: false,
        }
        addItem(item)
        renderItem( item);
        clearInput();
    }
}



function onDeleteAll() {




    const new_items = todo_list.filter((item) => {
        if( item.status && item.title) {
            todo_list.splice(item , item.length)
        }
    })



    todo_list = new_items;

    syncStorage()
    renderList();

    // let new_array = []
    // for(let i = 0; i< todo_list.length; i++) {
    //     const item = todo_list[i]
    //     if(myFilter(item)) {
    //         new_array.push(item)
    //     }







    // }


}

function events() {
    save_button.addEventListener("click" , onAddItem)
    deleteAll.addEventListener("click" , onDeleteAll)
}

function init() {
    loadFromStorage()
    renderList()
    events()
}






init()
