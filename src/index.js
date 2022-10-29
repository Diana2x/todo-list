document.body.style.backgroundImage = "url(svg/Background.svg)";

import "./style.css";
import { Task, NewProject } from "./class";
import {
  createProjectLocalStorage,
  createTaskLocalStorage,
  getProjectData,
} from "./localStorage";

const addTaskBtn = document.querySelector(".new-task");
const popupForm = document.querySelector(".popupForm");
const addProjectBtn = document.querySelector(".new-project");
const submitBtn = document.getElementById("submit");

const headerText = document.querySelector(".header-text");
const inputName = document.getElementById("name");
const inputDate = document.getElementById("date");
const dateContainer = document.querySelector(".date");
const descriptionContainer = document.querySelector(".description");
const textDescription = document.getElementById("description");

submitBtn.addEventListener("click", saveDataProject);
addTaskBtn.addEventListener("click", openForm);
addProjectBtn.addEventListener("click", showModalProject);

let dataProjects = getProjectData();
if (dataProjects === null) {
  dataProjects = [];
}
let inboxData = [];
let projectStatus;

function createProject(nameProject) {
  const projectContainer = document.getElementById("project-container");
  const projectItem = document.createElement("div");
  const projectTitle = document.createElement("button");
  projectTitle.classList.add("project-title");
  projectTitle.textContent = nameProject;

  projectContainer.appendChild(projectItem);
  projectItem.appendChild(projectTitle);
}

function displayProjects(data) {
  data.forEach((e) => {
    createProject(e.name);
  });
}
displayProjects(dataProjects);

function showModalProject() {
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "none";
  descriptionContainer.style.display = "none";
  headerText.innerHTML = "New Project";

  projectStatus = true;
}

function saveDataProject() {
  if (projectStatus) {
    let project = new NewProject(inputName.value);
    createProjectLocalStorage(project, dataProjects);
    createProject(inputName.value);
  } else {
    console.log(inputName.value);
    let task = new Task(
      inputName.value,
      inputDate.value,
      textDescription.value
    );
    createTaskLocalStorage(task, inboxData);
  }
  closeForm();
}

function openForm() {
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "block";
  descriptionContainer.style.display = "flex";
  headerText.innerHTML = "New Task";
  projectStatus = false;
}

function closeForm() {
  popupForm.style.visibility = "hidden";
  inputName.value = "";
  textDescription.value = "";
  inputDate.value = "";
}

window.addEventListener("click", (e) => {
  if (e.target == popupForm) {
    closeForm();
  }
});
