import "./assets/css/style.css"

const contTask = document.querySelector(".tasks")
const template = document.querySelector("template").content
const fragment = document.createDocumentFragment()
const btnSubmit = document.querySelector("#btnSubmit")
const form = document.querySelector("form")

let data = {}
console.log(data.length)
document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("tasks")) {
    data = JSON.parse(localStorage.getItem("tasks"))
  }
  printTask()
})

function deleteTask(e) {
  if (e.target.classList.contains("btn-delete")) {
    delete data[e.target.dataset.id]
    printTask()
    saveTask()
  }
}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(data))
}

function printTask() {
  contTask.innerHTML = ""
  Object.keys(data).forEach((element) => {
    let clone = template.cloneNode(true)
    clone.querySelector("#nameTaskCard").textContent = data[element].name
    clone.querySelector("#descriptionTaskCard").textContent = data[element].desc
    clone.querySelector("#buttonCheck").dataset.id = data[element].id
    clone.querySelector("#buttonDelete").dataset.id = data[element].id
    fragment.appendChild(clone)
  })
  if (Object.keys(data).length === 0) {
    contTask.innerHTML = `
      <div class="card-task" style="justify-content: center;">Not found task</div>
    `
  }

  contTask.appendChild(fragment)
}

btnSubmit.addEventListener("click", (e) => {
  if (form[0].value && form[1].value) {
    let value = {
      name: form[0].value,
      desc: form[1].value,
      state: false,
      id: Date.now(),
    }
    data[value.id] = value

    printTask()
    saveTask()
    form.reset()
  } else {
    alert("Complete Name and Description!")
  }
  e.stopPropagation()
  e.preventDefault()
})

contTask.addEventListener("click", (e) => {
  deleteTask(e)
})
