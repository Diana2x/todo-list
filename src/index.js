import toDate from "date-fns/toDate";
import "./style.css";
import { Task, NewProject } from "./class";
import {
  createProjectLocalStorage,
  createTaskLocalStorage,
  getProjectData,
  getInboxData,
} from "./localStorage";
import { createProject, createTask } from "./components";
import { validateInputField, trimString } from "./utils";

document.body.style.backgroundImage = "url(svg/Background.svg)";

const addTaskBtn = document.querySelector(".new-task");
const popupForm = document.querySelector(".popupForm");
const addProjectBtn = document.querySelector(".new-project");
const submitBtn = document.getElementById("submit");

const headerText = document.querySelector(".header-text");
const inputName = document.getElementById("name");
const inputDate = document.getElementById("date");
const dateContainer = document.querySelector(".date");
const textContainer = document.querySelector(".description");
const textDescription = document.getElementById("description");

submitBtn.addEventListener("click", submitData);
addTaskBtn.addEventListener("click", openForm);
addProjectBtn.addEventListener("click", showModalProject);

let dataProjects = getProjectData();
if (dataProjects === null) {
  dataProjects = [];
}
let currentMode; // to select inbox or projects store option

function displayProjects(data) {
  data.forEach((e) => {
    createProject(e.name, e.id_project);
  });
}
displayProjects(dataProjects);

// Inbox
let inboxData = getInboxData();
if (inboxData === null) {
  inboxData = [];
}

function displayTask(data) {
  data.forEach((e) => {
    createTask(e.title, e.due_date, e.description);
  });
}

displayTask(inboxData);

function showModalProject() {
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "none";
  textContainer.style.display = "none";
  headerText.innerHTML = "New Project";

  currentMode = true;
}

function submitData() {
  let newName = trimString(inputName.value);
  if (currentMode) {
    let project = new NewProject(newName);
    console.log(project.id_project);
    if (!validateInputField(project, dataProjects)) {
      alert("Project already in use");
      return;
    }
    createProjectLocalStorage(project, dataProjects);
    createProject(newName, project.id_project);
  } else {
    let task = new Task(
      newName,
      inputDate.valueAsNumber,
      textDescription.value
    );
    createTaskLocalStorage(task, inboxData);
    createTask(newName, inputDate.valueAsNumber, textDescription.value);
  }
  closeForm();
}

function openForm() {
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "block";
  textContainer.style.display = "flex";
  headerText.innerHTML = "New Task";
  currentMode = false;
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
