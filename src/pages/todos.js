import Auth from "../services/auth.js";
import location from "../services/location.js";
import loading from "../services/loading.js";
import TodoRepository from "../repository/todoRep.js";
const init = async () => {
    const { ok: isLogged } = await Auth.me()

    if (!isLogged) {
        return location.login()
    } else {
        loading.stop()
    }

    const todosdoc = document.getElementById('todos');

async function loadTodos() {


    todosdoc.innerHTML = "";

    const todos = await TodoRepository.getAll();

    for (let el of todos["data"]) {
        let wrapper = document.createElement("div");

        let checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.setAttribute("data-id", el.id); 
        if(el.completed){
            checkbox.checked = true
        }
        checkbox.addEventListener('change', async () => {
            const todoId = checkbox.getAttribute("data-id");
            await TodoRepository.update(todoId, checkbox.checked);
            const textElement = checkbox.nextElementSibling;
            if (textElement) {
                textElement.classList.toggle('done', checkbox.checked);
            }
        });
        let text = document.createElement("span");
        text.textContent = el.description;
        text.className = "todo-text";

        wrapper.appendChild(checkbox);
        wrapper.appendChild(text);
        todosdoc.appendChild(wrapper);
    }
}

const todosbut = document.getElementById('todos_button');
todosbut.addEventListener("click", function () {
    loadTodos();
});
const deleteButton = document.getElementById('delete_button');
deleteButton.addEventListener("click", async function () {
    const checkboxes = document.querySelectorAll('.checkbox');
    for (let checkbox of checkboxes) {
        if (checkbox.checked) {
            const id = checkbox.getAttribute("data-id");
            await TodoRepository.remove(id); 
        }
    }
    loadTodos();
});
    const form = document.getElementById("todo-form");
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        const input = form.elements["todo"];
        const value = input.value.trim();

        if (value) {
            TodoRepository.create(value)
        }
        setTimeout(() => {
            loadTodos();
        }, 500);
    });
}

if (document.readyState === 'loading') {
    document.addEventListener("DOMContentLoaded", init)
} else {
    init()
}
