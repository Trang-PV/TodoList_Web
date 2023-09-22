const cardFilter = document.querySelector('.card-filter');
const one = document.querySelector('#one')
const two = document.querySelector('#two')
const three = document.querySelector('#three')
const four = document.querySelector('#four')
const addItem = document.querySelector('.addItem');
const input = document.querySelector('#newTask')
const cardAdd = document.querySelector('.card__add')
const todoList = document.querySelector('#todo')
const completed = document.querySelector('#completed')
const remove = document.querySelector('.remove')
const li = document.createElement('li')
const messenger = document.querySelector('.card__todo--messenger');


function start() {

    // hàm thêm giá tị value
    addValue()

    // render date
    renderTime()

    // load lại localStorage để làm mới
    loadTodoLocal()

    // xử lý messenger
    handleMessage()

    handleInput()
}
start()

// hàm thêm giá tị value
function addValue() {

    // lấy giá trị value nhập vào và truyền vào biến value
    let value = input.value.trim()

    // nếu có value thì mới thực hiện hàm
    if (value) {
        renderElement({
            text: value,
        })

        saveLocalstorage()
        handleMessage()

    }

    input.value = ''

}

function handleInput(valueText) {

    // sử lý sự kiện click thêm value
    addItem.addEventListener('click', (e) => {
        e.preventDefault();
        addValue()

    })


    // sử lý sự kiện enter để thêm value
    input.addEventListener('keydown', (e) => {
        if (e.which == 13) {

            e.preventDefault();
            addValue()

        }
    })

}


// render ra dữ liệu
function renderElement(options) {
    var li = document.createElement('li')
    li.innerHTML = `
        <span>${options.text}</span>
        <div class="buttons">
            <button class="remove" data-index="1" data-status="todo" ">
                <i class="fa fa-trash-alt"></i>
            </button>
            <button class="complete" data-index="1" data-status="todo"
               ">
                <i class="noCheck far fa-check-circle"></i>
                <i class="check fas fa-check-circle"></i>
            </button>
        </div>
    `

    // sử lý sự kiện xoá item
    li.querySelector('.buttons').addEventListener('click', function (e) {

        // cleck remove
        if (e.target.closest('.remove')) {
            this.parentElement.remove()

            // gọi lại hàm localStorage
            saveLocalstorage()
            handleMessage()

        }

        // click nocheck
        if (e.target.closest('.noCheck')) {
            const newLiData = li.querySelector('.buttons').parentElement
            this.parentElement.remove()


            // gọi lại hàm localStorage
            completed.appendChild(newLiData)
            handleMessage()

        }

        // click check
        if (e.target.closest('.check')) {
            const newLiData = li.querySelector('.buttons').parentElement
            this.parentElement.remove()


            // gọi lại hàm localStorage
            todoList.appendChild(newLiData)
            handleMessage()

        }


    })



    todoList.appendChild(li)
}




// render datetime
function renderTime() {
    const date = new Date()

    const year = date.getFullYear()
    const month = date.getMonth() + 1
    const day = date.getDate()
    const minutes = date.getMinutes()

    const cardTitle = document.querySelector('.card-title')
    cardTitle.innerHTML = `
        <h2>My Tasks</h2>
        <p>July ${day}, ${year}</p>    
        `
    // console.log(minutes);
}



// lưu dữ liệu vào localStorage
function saveLocalstorage() {

    let listItem = document.querySelectorAll('li');
    var todoStorage = []
    listItem.forEach((item) => {
        let text = item.querySelector('span').innerText
        todoStorage.push({
            text
        });

    })

    localStorage.setItem('todolist', JSON.stringify(todoStorage))
}

// load lại localStorage để làm mới
function loadTodoLocal() {
    let data = JSON.parse(localStorage.getItem('todolist'))
    if (data) {
        data.forEach((item) => {
            renderElement(item)
        })
    }
}



// xử lý hiện và đóng Card Filter
cardFilter.addEventListener('click', function (e) {
    cardFilter.classList.toggle('open');
})



// xử lý messenger
function handleMessage() {

    if (todoList.querySelector('li')) {
        todoList.querySelector('.card__todo--messenger').style.display = 'none'
    } else {
        todoList.querySelector('.card__todo--messenger').style.display = 'block';

    }

    if (completed.querySelector('li')) {
        completed.querySelector('.card__todo--messenger').style.display = 'none'
        // console.log(1);
    } else {
        completed.querySelector('.card__todo--messenger').style.display = 'block'
        // console.log(0);

    }
}



// sắp xếp item a-z 
two.addEventListener('click', function (e) {


    let listItem = document.querySelectorAll('li');
    var todoStorage = []
    listItem.forEach((item) => {
        let text = item.querySelector('span').innerText
        todoStorage.push({
            text
        });

    })


    todoStorage.sort(function (a, b) {
        if (a.text < b.text) { return -1; }
        return 0;
    })

    document.getElementById("todo").innerHTML = ""

    todoStorage.forEach((item) => {
        renderElement(item)
    })


    // console.log(todoStorage)


    // const itemProduct = document.querySelectorAll('li')
    // const array = []
    // itemProduct.forEach(function (item) {
    //     const valueItemText = item.querySelector('span').innerText
    //     array.push(valueItemText.split('-'))
    // })
    // // console.log(array.split(''));
    // console.log(array);
    // console.log(array.sort());
})

three.addEventListener('click', function (e) {


    let listItem = document.querySelectorAll('li');
    var todoStorage = []
    listItem.forEach((item) => {
        let text = item.querySelector('span').innerText
        todoStorage.push({
            text
        });

    })

    todoStorage.sort(function (a, b) {
        if (a.text > b.text) { return -1; }
        return 0;
    })

    document.getElementById("todo").innerHTML = ""

    todoStorage.forEach((item) => {
        renderElement(item)
    })


    // console.log(todoStorage)


    // const itemProduct = document.querySelectorAll('li')
    // const array = []
    // itemProduct.forEach(function (item) {
    //     const valueItemText = item.querySelector('span').innerText
    //     array.push(valueItemText.split('-'))
    // })
    // // console.log(array.split(''));
    // console.log(array);
    // console.log(array.sort());
})



