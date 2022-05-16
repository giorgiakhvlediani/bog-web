import { buttonSection } from "./common/buttonSection.js";
import { buttonsData } from "./buttons/buttonsData.js";
import { gifsSection } from "./common/gifsSection.js"
import { config } from "./config/config.js"

let submitButton = document.getElementById("submit");
let buttonsList = document.getElementsByClassName("button");
console.log(buttonsList, "ka");
addingButtons(buttonsData);
clickingButton(buttonsList);


submitButton.addEventListener('click', (event) => {
  let searchValue = document.getElementById("user-search").value;
  if (searchValue !== "") {
    buttonsData.push(searchValue);
    addingButtons(buttonsData);
    buttonsList = document.getElementsByClassName("button");
    let searchedGif = searchValue;
    searchingUrl(searchedGif);
  }
  clickingButton(buttonsList);
})

function addingButtons(buttonsData) {
  let id = document.getElementById('buttons');
    let searchBlock = new buttonSection(id);
    searchBlock.setButtonList = buttonsData;
    console.log(buttonsData);
    searchBlock.render()
}

let trendingButton = document.getElementById("trending");

trendingButton.addEventListener('click', (event) => {
  let url = `${config.trending.url}&limit=${config.trending.limit}&api_key=${config.trending.api_key}&fmt=${config.searched.fmt}`
  json(url);
})

function clickingButton() {
  for (let i = 0; i < buttonsList.length; i++) {
    buttonsList[i].addEventListener('click', (event) => {
      let searchedGif = buttonsList[i].value;
      searchingUrl(searchedGif);
    })
  }
}

function searchingUrl(searchedGif) {
  let url = `${config.searched.url}q=${searchedGif}&limit=${config.searched.limit}&api_key=${config.searched.api_key}&fmt=${config.searched.fmt}`
  json(url);
}

let id = document.getElementById('gif-boxes');
let gifsBlock = new gifsSection(id);

function json(url) {
  let promise = fetch(url);
  promise.then((res) => {
    return res.json();
  }).then((res) => {
    gifsBlock.setGifList = res.data;
    gifsBlock.render();
  })
}

