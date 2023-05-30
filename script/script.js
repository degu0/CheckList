const localStorageKey = 'to-do-list-gn'

function validateIfExistsNewTask() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let inputValue = document.getElementById('input-cadastre').value
    let exists = values.find(x => x.name == inputValue)
    return !exists ? false : true
}

function newTask() {
    let input = document.getElementById('input-cadastre')
    input.style.border = ''

    // validation
    if (!input.value) {
        alert('Digite algo para inserir em sua lista')
    }
    else if (validateIfExistsNewTask()) {
        alert('Já existe uma task com essa descrição')
    }
    else {
        // increment to localStorage
        let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
        values.push({
            name: input.value
        })
        localStorage.setItem(localStorageKey, JSON.stringify(values))
        showValues()
    }
    input.value = ''
}

function showValues() {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let list = document.getElementById('to-do-list')
    list.innerHTML = ''
    for (let i = 0; i < values.length; i++) {
        list.innerHTML += `<div class='checkbox'>
                                <div>
                                    <input type='checkbox' class='box' id='${values[i]['name']}'>
                                    <label for='${values[i]['name']}'>
                                        ${values[i]['name']}
                                    </label>    
                                </div>
                                <div>
                                    <button id='btn-ok' onclick='removeItem("${values[i]['name']}")'>
                                    <i class="fa-solid fa-xmark fa-sm"></i></i>
                                    </button>
                                </div>
                            </div>
                            <hr>`
    }
}

function removeItem(data) {
    let values = JSON.parse(localStorage.getItem(localStorageKey) || "[]")
    let index = values.findIndex(x => x.name == data)
    values.splice(index, 1)
    localStorage.setItem(localStorageKey, JSON.stringify(values))
    showValues()
}

showValues()