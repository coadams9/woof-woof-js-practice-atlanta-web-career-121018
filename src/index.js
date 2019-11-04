document.addEventListener('DOMContentLoaded', () => initPage())

const initPage = () => {
  fetchDogs()
  // showInfo()
}


const fetchDogs = () => {
  fetch('http://localhost:3000/pups')
    .then(res => res.json())
    .then(data => data.forEach(dog => {
      let container = document.querySelector('#dog-bar')

      let span = document.createElement('span')
      container.appendChild(span)

      span.innerText = dog.name

      showInfo(dog, span)
    }))
}


const showInfo = (dog, span) => {
  const goodDog = (button) => {
    button.innerText = 'Good Dog!'
  }

  const badDog = (button) => {
    button.innerText = 'Bad Dog!'
  }

  span.addEventListener('click', () => {
    let dogInfo = document.querySelector('#dog-info')


    let img = document.createElement('img')
    let h2 = document.createElement('h2')

    img.src = dog.image
    h2.innerText = dog.name

    dogInfo.appendChild(img)
    dogInfo.appendChild(h2)

    let button = document.createElement('button')
    button.dataset.id = dog.id
    button.dataset.isGoodDog = dog.isGoodDog


    dog.isGoodDog ? goodDog(button) : badDog(button)

    dogInfo.appendChild(button)

    toggleDog(button)
  })
}

function doDogThings(button) {
  button.addEventListener('click', () => {
    if (button.innerText === 'Good Dog!') {
      button.innerText = 'Bad Dog!'
    } else {
      button.innerText = 'Good Dog!'
    }
  })
}

const doBackendThings = button => {
  button.addEventListener('click', () => {
    let value;

    button.dataset.isGoodDog === true ? value = false : value = true
    console.log(button.dataset.isGoodDog)
    console.log(value)

    fetch(`http://localhost:3000/pups/${button.dataset.id}`, {
      method: 'PATCH',
      body: JSON.stringify({
        isGoodDog: true
      })
    })
  })
}

const toggleDog = button => {
  doDogThings(button)
  doBackendThings(button)
}


