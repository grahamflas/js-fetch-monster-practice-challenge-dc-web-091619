// When the page loads, show the first 50 monsters. Each monster's name, age, and description should be shown.
const MONSTERS_URL = "http://localhost:3000/monsters"

document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM loaded")
  fetchMonsters();
})

function fetchMonsters(){
  let limit = 50;
  let page
  let getParams = `?_limit=${limit}&_page=${page}`

  fetch(`${MONSTERS_URL}/${getParams}`)
  .then( response => response.json() )
  .then( monstersArray => monstersArray.forEach(
    monster => renderMonster(monster)
  ) ) 
}

function renderMonster(monster){
  console.log(monster)
  let monsterContainer = document.querySelector('#monster-container')

  let monsterDiv = document.createElement('div')
  monsterDiv.dataset.monsterId = monster.id

  let monsterName = document.createElement('h2')
  monsterName.innerText = monster.name

  let monsterAge = document.createElement('h4')
  monsterAge.innerText = `Age: ${Math.floor(monster.age)} years ${Math.floor((monster.age % 1)*12)} months`

  let monsterDescrip = document.createElement('p')
  monsterDescrip.innerText = monster.description

  monsterDiv.append(monsterName, monsterAge, monsterDescrip)
  monsterContainer.append(monsterDiv)
}
