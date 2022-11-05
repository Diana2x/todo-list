import toDate from "date-fns/toDate";
import "./style.css";
import { Task, NewProject } from "./class";
import {
  createProjectLocalStorage,
  createTaskLocalStorage,
  getProjectData,
  getInboxData,
  currentProjectId,
  storeTaskbyProject,
  getCurrentProjectId,
} from "./localStorage";
import { createProject, createTask } from "./components";
import {
  validateNameInput,
  trimString,
  displayTask,
  displayDataProjects,
} from "./utils";
import { add } from "date-fns";

document.body.style.backgroundImage = "url(svg/Background.svg)";

let dataProjects = getProjectData();
if (dataProjects === null) {
  dataProjects = [];
}
let inboxData = getInboxData();
if (inboxData === null) {
  inboxData = [];
}
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
const displayContainer = document.getElementById("task-container");
displayContainer.innerHTML = "";
const inboxBtn = document.getElementById("inbox");
submitBtn.addEventListener("click", submitData);
addTaskBtn.addEventListener("click", openForm);
addProjectBtn.addEventListener("click", showModalProject);
let currentMode; // to select inbox or projects store option
let currentDisplaySelection = "inbox";
inboxBtn.addEventListener("click", () => {
  displayContainer.innerHTML = "";
  currentDisplaySelection = "inbox";
  console.log(currentDisplaySelection);
  displayTask(inboxData);
});

displayDataProjects(dataProjects);
projectButtonsDetect();

function showModalProject() {
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "none";
  textContainer.style.display = "none";
  headerText.innerHTML = "New Project";
  currentMode = true;
}

function submitData() {
  let newName = trimString(inputName.value);
  let currentProjectId = getCurrentProjectId();
  if (currentMode) {
    let project = new NewProject(newName);
    if (!validateNameInput(project, dataProjects)) {
      alert("Project already in use");
      return;
    }
    createProjectLocalStorage(project, dataProjects);
    createProject(newName, project.id_project, dataProjects);
  } else {
    let task = new Task(
      newName,
      inputDate.valueAsNumber,
      textDescription.value
    );
    if (currentDisplaySelection === "inbox") {
      createTaskLocalStorage(task, inboxData);
    } else {
      storeTaskbyProject(task, currentProjectId, dataProjects);
    }
    createTask(newName, inputDate.valueAsNumber, textDescription.value);
  }
  projectButtonsDetect();
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

function projectButtonsDetect() {
  const projectButtons = document.querySelectorAll(".project-title");
  projectButtons.forEach((button) =>
    button.addEventListener("click", () => {
      currentDisplaySelection = "project";
      console.log(currentDisplaySelection);
    })
  );
}

// validate empty date, function to detect new buttons in projects
