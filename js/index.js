// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
const MONSTERS_URL = "http://localhost:3000/monsters"
let page = 1;

document.addEventListener("DOMContentLoaded", () => {
  createForm();
  fetchMonsters();

  let backBtn = document.querySelector("#back")
  backBtn.addEventListener('click', goBack)

  let forwardBtn = document.querySelector("#forward")
  forwardBtn.addEventListener('click', goForward)
})

function createForm(){
  let formContainer = document.querySelector('#create-monster')

  let createForm = document.createElement('form')
  
  let createName = document.createElement('input')
  createName.type = "text"
  createName.name = "name"
  createName.placeholder = "Monster name..."

  let createAge = document.createElement('input')
  createAge.type = "text"
  createAge.name = "age"
  createAge.placeholder = "Moster age..."

  let createDescription = document.createElement('input')
  createDescription.type = "text"
  createDescription.name = "description"
  createDescription.placeholder = "Monster description..."

  let createBtn = document.createElement('input')
  createBtn.type = "button"
  createBtn.id = "create-monster-button"
  createBtn.value = "Create Monster"
  createBtn.addEventListener('click', createMonster)

  createForm.append(createName, createAge, createDescription, createBtn)
  formContainer.append(createForm)
}

function fetchMonsters(){
  let monsterContainer = document.querySelector('#monster-container')
  monsterContainer.innerHTML =""

  let limit = 50; 
  let getParams = `?_limit=${limit}&_page=${page}`
  // page++

  fetch(`${MONSTERS_URL}/${getParams}`)
  .then( response => response.json() )
  .then( monstersArray => monstersArray.forEach(
    monster => renderMonster(monster)
  ) ) 
}

function renderMonster(monster){
  let monsterContainer = document.querySelector('#monster-container')

  let monsterDiv = document.createElement('div')
  monsterDiv.dataset.monsterId = monster.id

  let monsterName = document.createElement('h2')
  monsterName.innerText = `${monster.name} (${monster.id})`

  let monsterAge = document.createElement('h4')
  monsterAge.innerText = `Age: ${Math.floor(monster.age)} years ${Math.floor((monster.age % 1)*12)} months`

  let monsterDescrip = document.createElement('p')
  monsterDescrip.innerText = monster.description

  monsterDiv.append(monsterName, monsterAge, monsterDescrip)
  monsterContainer.append(monsterDiv)
}

function createMonster(){
  event.preventDefault()

  let form = event.currentTarget.parentElement
  let name = form.name.value
  let age = form.age.value
  let description = form.description.value

  let data = {
    name: name, 
    age: age, 
    description: description
  }

  fetch(MONSTERS_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify(data) 
  }).then( response => response.json() )
    .then( wtf => console.log(wtf) )

  event.currentTarget.parentElement.reset()
}

function goBack(){
  if (page === 1){
    fetchMonsters()
  } else {
    page--
    fetchMonsters()
  }
}

function goForward(){
  page++
  fetchMonsters()
}