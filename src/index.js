document.addEventListener('DOMContentLoaded', initPage)

function initPage(){
  fetchDogs()
  showAllDogs()
  filterButnHandler()
}




function fetchDogs(){
  return fetch('http://localhost:3000/pups')
  .then(res => res.json())
}

function showAllDogs(){
  fetchDogs()
  .then(dogs => {
    dogs.forEach(renderSingleDog)

  })
}

function filterButnHandler(){
  let button = document.querySelector('#good-dog-filter')
  button.addEventListener('click', filterDogs)
}

function renderSingleDog(dog){
  let dogContainer = document.querySelector('#dog-bar')
  let span = document.createElement('span')
  dogContainer.appendChild(span)
  span.innerText = dog.name
  span.dataset.id = dog.id
  span.addEventListener('click', () => dogInfo(dog))
  console.log(dog)
}

function dogInfo(dog){
  // debugger
  let dogInfo = document.querySelector('#dog-info')
  dogInfo.innerHTML = ""
  let image = document.createElement('img')
  image.src = dog.image
  dogInfo.appendChild(image)

  let h2 = document.createElement('h2')
  h2.innerText = dog.name
  dogInfo.appendChild(h2)

  let button = document.createElement('button')
  if (dog.isGoodDog === true) {
    button.textContent = "Good Dog!"
  } else {
    button.textContent = "Bad Dog!"
  }
  button.dataset.id = dog.id
  button.addEventListener('click', () => goodOrBad(dog))
  dogInfo.appendChild(button)


}


function goodOrBad(dog){
  // debugger
  dogStatus = null

  if (event.target.innerText === "Bad Dog!"){
    event.target.innerText = "Good Dog!"
    dogStatus = true
  } else {
    event.target.innerText = "Bad Dog!"
    dogStatus = false
  }


  // if (dog.isGoodDog === true){
  //   var dogStatus = false
  // } else {
  //   var dogStatus = true
  // }

  // debugger



  fetch(`http://localhost:3000/pups/${dog.id}`, {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    },
    body: JSON.stringify({
      isGoodDog: dogStatus
    })

  })
  // debugger


}


function filterDogs(){

  let dogContainer = document.querySelector('#dog-bar')
  dogContainer.innerHTML = ""

  if (event.target.textContent === "Filter good dogs: OFF"){
    event.target.textContent = "Filter good dogs: ON"
    fetchDogs()
    .then(dog => {
      dog.filter(dog => dog.isGoodDog).forEach(renderSingleDog)
    })
  } else if (event.target.textContent === "Filter good dogs: ON") {
    event.target.textContent = "Filter good dogs: OFF"
    showAllDogs()
  }



}
