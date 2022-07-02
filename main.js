import "./assets/css/style.css"

const contTask = document.querySelector(".tasks")
const template = document.querySelector("template").content
const fragment = document.createDocumentFragment()
const btnSubmit = document.querySelector("#btnSubmit")
const form = document.querySelector("form")

let data = {}

if (localStorage.getItem("tasks")) {
  data = JSON.parse(localStorage.getItem("tasks"))
  printTask()
} else {
  contTask.innerHTML = `
    <div class="card-task" style="justify-content: center;">Not found task</div>
  `
}

function saveTask() {
  localStorage.setItem("tasks", JSON.stringify(data))
}

function printTask() {
  Object.keys(data).forEach((element) => {
    contTask.innerHTML = ""
    let clone = template.cloneNode(true)
    clone.querySelector("#nameTaskCard").textContent = data[element].name
    clone.querySelector("#descriptionTaskCard").textContent = data[element].desc
    fragment.appendChild(clone)
  })
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
  } else {
    alert("Complete Name and Description!")
  }

  e.preventDefault()
})
