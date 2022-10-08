// HIGHLIGHT the selected radio feature - completed

import { catsData } from "./data.js";

const emotionsListEl = document.querySelector(".radio-items-container");
const getMemebtnEl = document.querySelector(".get-meme-btn");
const radioGroup = document.getElementsByClassName("radio-item");
const modalEl = document.querySelector(".modal-container");
const modalBtnEl = document.querySelector(".modal-close-btn");
const modalInnerEl = document.querySelector(".modal-inner-container");
const requiredGIF = document.querySelector("#gif-required-input");

/*
 * Webpage starts from here.
 * Various emotions are being rendered on the screen using renderEmotion() function.
 */
function renderEmotion() {
  let emotionsArray = [];
  for (let i of catsData) {
    for (let j of i.emotionTags) {
      if (!emotionsArray.includes(j)) {
        emotionsArray.push(j);
      }
    }
  }
  let listItems = "";
  for (let k of emotionsArray) {
    listItems += `
        <div class="radio-item">
            <label for="${k}">${k}</label>
            <input type="radio" id="${k}" name="cat-emotion" value="${k}" />
        </div>`;
  }
  emotionsListEl.innerHTML = listItems; // STEP 2 - Program goes to here after STEP 1
}
// STEP 1 - Program starts from here
renderEmotion();

// EmotionsListEl is being used to listen for any selected radio input and also to highlight it .
emotionsListEl.addEventListener("change", getEmotionId);
let temp;
function getEmotionId(e) {
  // use of radioGroup
  temp = e.target.id;
  for(let radio of radioGroup) {
    radio.classList.remove("selected-radio-item");
  }
  document.getElementById(e.target.id).parentElement.classList.add("selected-radio-item");
  return e.target.id;
}



// If 'Get Meme' Button is clicked, then Flow goes here after renderEmotion()
getMemebtnEl.addEventListener("click", renderMeme);
// After renderEmotion(), this function gets executed.
function renderMeme() {
  if(temp) {
    const requiredCatArray = getCatObject();
    modalInnerEl.innerHTML = `<img src="images/${requiredCatArray.image}" alt=${requiredCatArray.alt} class="modal-inner-container"
    />`; // Modal is getting meme's only array from this line to parse it using .innerHTML method
    modalEl.style.display = "flex";
  }
}

function getCatObject() {
  const gifRequiredChoice = requiredGIF.checked; // This variable defines the 'Need GIF meme' input choice - Type BOOLEAN

  const arrayWithMultipleSelection = catsData.filter(function (catParameter) {
    return catParameter.emotionTags.includes(temp);
  }); // This variable is holding arrays with multiple elements having same emotion as selected by user [user selection is referred by 'temp' variable]

  let arrayWithAnimatedGif; //This variable would hold the array elements with keeping 'Need GIF meme' choice in thought
  if (gifRequiredChoice) {
    arrayWithAnimatedGif = arrayWithMultipleSelection.filter(function (cat) {
      return cat.emotionTags.includes(temp) && cat.isGif;
    });
  }

  const ultimateObject = gifRequiredChoice
    ? arrayWithAnimatedGif
    : arrayWithMultipleSelection; // This variable holds an array with the collection of objects keeping in mind that USER wants GIF meme or not

  const finalArrayToSend =
    ultimateObject.length === 1
      ? ultimateObject[0]
      : ultimateObject[Math.floor(Math.random() * ultimateObject.length)]; // This variable holds a single object from 'ultimateObject' array [I know in JS, arrays are objects :) ]

  return finalArrayToSend;
}

modalBtnEl.addEventListener("click", closeModal);
function closeModal() {
  modalEl.style.display = "none";
}

/*
  This event listener listens for any outside clicks in HTML document to close the modal.
*/
document.addEventListener('mouseup', function(e) {
  if (!modalEl.contains(e.target)) {
      modalEl.style.display = 'none';
  }
});