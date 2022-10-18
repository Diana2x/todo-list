import "./style.css";
document.body.style.backgroundImage = "url(svg/Background.svg)";
import { Task } from "./class";

const addButton = document.querySelector(".new-task");
const popupForm = document.getElementsByClassName("popupForm");

console.log(window.navigator.language);
addButton.addEventListener("click", openForm);
function openForm() {
  popupForm[0].style.visibility = "visible";
}

function closeForm() {
  popupForm[0].style.visibility = "hidden";
}

window.addEventListener("click", (e) => {
  if (e.target == popupForm[0]) {
    closeForm();
  }
});
