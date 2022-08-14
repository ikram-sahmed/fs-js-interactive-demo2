console.log('connected')

const getAllBtn = document.querySelector('#all')
const charBtns = document.querySelectorAll('.char-btns')
const ageForm = document.querySelector('#age-form')
const ageInput = document.querySelector('#age-input')
const createForm = document.querySelector('#create-form')
const newFirstInput = document.querySelector('#first')
const newLastInput = document.querySelector('#last')
const newGenderDropDown = document.querySelector('select')
const newAgeInput = document.querySelector('#age')
const newLikesText = document.querySelector('textarea')
const charContainer = document.querySelector('section')

// const baseURL = 

function createCharacterCard(char) {
  let charCard = document.createElement('div')
  charCard.innerHTML = `<h3>${char.firstName} ${char.lastName}</h3>
  <p>gender: ${char.gender} | age: ${char.age}</p>
  <h4>Likes</h4>
  <ul>
    <li>${char.likes[0]}</li>
    <li>${char.likes[1]}</li>
    <li>${char.likes[2]}</li>
  </ul>`

  charContainer.appendChild(charCard)
}

function clearCharacters() {
  charContainer.innerHTML = ``
}
function getAllChars() {
  clearCharacters();

  // Let's send a GET request to our server to grab all the characters.
  axios.get(`${baseURL}/characters`) 
    .then((response) => {
      // Let's store our response.data onto a variable to keep track of it.
      const charactersArr = response.data;
      
      // Now let's write a for loop to go over our array, and create character cards.
      for(let i = 0; i < charactersArr.length; i++) {
        
        // Let's use that already-written-out function to render our HTML. Makes this function more readable.
        createCharacterCard(charactersArr[i]);
      }
    })
}

function getOneChar(event) {
  clearCharacters();
  axios.get(`${baseURL}/character/${event.target.id}`)
  .then((response) => {
    const characterObj = response.data;
    createCharacterCard(characterObj);
  })
}

function createNewChar(event) {
  event.preventDefault();
  clearCharacters();
  let newLikes = [...newLikesText.value.split(",")];

  let bodyObj = {
    firstName: newFirstInput.value,
    lastName: newLastInput.value,
    gender: newGenderDropDown.value,
    age: newAgeInput.value,
    likes: newLikes,
  }
  axios.post(`${baseURL}/character`, bodyObj)
    .then((response) => {
      const newArr = response.data;

      for(let i = 0; i < newArr.length; i++) {
        createCharacterCard(newArr[i]);
      }
    })

    newFirstInput.value = ''
    newLastInput.value = ''
    newGenderDropDown.value = 'female'
    newAgeInput.value = ''
    newLikesText.value = ''
}

getAllBtn.addEventListener("click", getAllChars);

for(let i = 0; i < charBtns.length; i++) {
  charBtns[i].addEventListener("click", getOneChar);
}

createForm.addEventListener("submit", createNewChar);
getAllChars();
