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
import { add, isThisWeek, isToday } from "date-fns";

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
const editMenuContainer = document.getElementsByClassName("edit-btn--div");
const inboxBtn = document.getElementById("inbox");
submitBtn.addEventListener("click", submitData);
addTaskBtn.addEventListener("click", openForm);
addProjectBtn.addEventListener("click", showModalProject);
const todayBtn = document.getElementById("today");
const weekBtn = document.getElementById("week");
const displayText = document.createElement("p");
displayText.classList.add("filter-text");
let currentMode; // to select inbox or projects store option
let currentDisplaySelection = "inbox";
inboxBtn.addEventListener("click", () => {
  addTaskBtn.style.display = "block";
  displayContainer.innerHTML = "";
  currentDisplaySelection = "inbox";
  console.log(currentDisplaySelection);
  displayTask(inboxData);
});
todayBtn.addEventListener("click", () => {
  addTaskBtn.style.display = "none";
  displayContainer.innerHTML = "";
  displayText.innerText = "Task for Today: ";
  displayContainer.appendChild(displayText);
  let todayFilter = todayTaskfilter(inboxData, dataProjects);
  displayTask(todayFilter);
});
weekBtn.addEventListener("click", () => {
  addTaskBtn.style.display = "none";
  displayContainer.innerHTML = "";
  displayContainer.appendChild(displayText);
  displayText.innerText = "To do for this Week: ";
  let weekFilter = weekTaskFilter(inboxData, dataProjects);
  displayTask(weekFilter);
});
displayTask(inboxData);
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
    if (inputDate.value === "") {
      alert("Please select a date");
      return false;
    }
    if (currentDisplaySelection === "inbox") {
      createTaskLocalStorage(task, inboxData);
    } else {
      storeTaskbyProject(task, currentProjectId, dataProjects);
    }
    createTask(
      newName,
      inputDate.valueAsNumber,
      textDescription.value,
      task.taskId
    );
    console.log(inputDate.value);
  }
  projectButtonsDetect();
  closeForm();
}

function todayTaskfilter(inboxTasks, projectTasks) {
  let filteredTasks = [];
  filteredTasks.push(inboxTasks.filter((e) => isToday(e.due_date)));
  filteredTasks.push(
    projectTasks.map((e) => e.list.filter((e) => isToday(e.due_date))).flat()
  );
  console.log(filteredTasks.flat());
  return filteredTasks.flat();
}

function weekTaskFilter(inboxTasks, projectTasks) {
  let filteredTask2 = [];
  filteredTask2.push(inboxTasks.filter((e) => isThisWeek(e.due_date)));
  filteredTask2.push(
    projectTasks.map((e) => e.list.filter((e) => isThisWeek(e.due_date))).flat()
  );
  console.log(filteredTask2.flat());
  return filteredTask2.flat();
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
  let currentEditContainer = Array.from(editMenuContainer).find((container) =>
    container.classList.contains("visible")
  );
  if (e.target == popupForm) {
    closeForm();
  }
  if (e.target.classList.value != "fas fa-gear") {
    currentEditContainer.classList.remove("visible");
  }
  // console.log(editMenuContainer);
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
