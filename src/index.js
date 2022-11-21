import "./style.css";
import { Task, NewProject } from "./class";
import {
  createProjectLocalStorage,
  getProjectData,
  storeTaskbyProject,
  getCurrentProjectId,
  currentProjectId,
} from "./localStorage";
import { createProject, createTask } from "./components";
import {
  validateNameInput,
  trimString,
  displayTask,
  displayDataProjects,
  displayFilterTask,
} from "./utils";
import { isThisWeek, isToday, format } from "date-fns";

/*---DEFAULT---*/

let dataProjects = getProjectData();
if (dataProjects === null) {
  dataProjects = [];
}

displayDataProjects(dataProjects);
//render inbox data
currentProjectId("1");
displayTask(dataProjects);
/*--------------*/

const addbtnContainer = document.getElementById("add-btn");
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
const pageHeader = document.getElementById("page-header");
const inboxBtn = document.getElementById("inbox");
submitBtn.addEventListener("click", submitData);
addTaskBtn.addEventListener("click", openForm);
addProjectBtn.addEventListener("click", showModalProject);
const todayBtn = document.getElementById("today");
const weekBtn = document.getElementById("week");
const displayText = document.createElement("p");
displayText.classList.add("filter-text");
let currentMode; // to select inbox or projects store option
inboxBtn.addEventListener("click", () => {
  addTaskBtn.style.display = "block";
  displayContainer.innerHTML = "";
  pageHeader.innerText = `Inbox`;
  currentProjectId("1");
  displayTask(dataProjects);
  displayContainer.classList.remove("filter-event");
});
todayBtn.addEventListener("click", () => {
  addbtnContainer.style.display = "none";
  displayContainer.innerHTML = "";
  displayText.innerText = "Task for Today: ";
  displayContainer.appendChild(displayText);
  displayFilterTask(todayTaskfilter(dataProjects));
  pageHeader.innerText = `Daily Task Manager`;
  displayContainer.classList.add("filter-event");
});

weekBtn.addEventListener("click", () => {
  addbtnContainer.style.display = "none";
  displayContainer.innerHTML = "";
  displayContainer.appendChild(displayText);
  displayText.innerText = "To do for this Week: ";
  pageHeader.innerText = `Weekly Task Manager`;
  displayFilterTask(weekTaskFilter(dataProjects));
  displayContainer.classList.add("filter-event");
});

function showModalProject() {
  inputName.value = "";
  submitBtn.style.display = "flex";
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "none";
  textContainer.style.display = "none";
  headerText.innerHTML = "New Project";
  currentMode = true;
}

function submitData(e) {
  let newName = trimString(inputName.value);
  let currentProjectId = getCurrentProjectId();
  if (headerText.innerText === "New Project") {
    let project = new NewProject(newName);
    if (!validateNameInput(project, dataProjects)) {
      alert("Project already in use");
      return;
    }
    createProjectLocalStorage(project, dataProjects);
    createProject(newName, project.id_project, dataProjects);
  }
  if (headerText.innerText === "New Task") {
    let task = new Task(
      newName,
      inputDate.valueAsNumber,
      textDescription.value
    );
    if (inputDate.value === "") {
      alert("Please select a date");
      return false;
    }
    storeTaskbyProject(task, currentProjectId, dataProjects);
    createTask(
      newName,
      inputDate.valueAsNumber,
      textDescription.value,
      task.taskId,
      dataProjects
    );
  }
  e.preventDefault();
  closeForm();
}

function todayTaskfilter(allData) {
  return allData.map((e) => e.list.filter((e) => isToday(e.due_date))).flat();
}

function weekTaskFilter(allData) {
  return allData
    .map((e) => e.list.filter((e) => isThisWeek(e.due_date)))
    .flat();
}

const submitEditBtn = document.getElementById("submit-edit");
function openForm() {
  inputName.value = "";
  textDescription.value = "";
  inputDate.value = "";
  submitEditBtn.style.display = "none";
  submitBtn.style.display = "flex";
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "block";
  textContainer.style.display = "flex";
  headerText.innerHTML = "New Task";
  currentMode = false;
}

function openModifyForm(currentTask) {
  popupForm.style.visibility = "visible";
  dateContainer.style.display = "block";
  textContainer.style.display = "flex";
  headerText.innerHTML = "Modify Task";
  inputName.value = currentTask.name;
  inputDate.valueAsNumber = currentTask.due_date;
  textDescription.value = currentTask.description;
  currentMode = false;
}

function closeForm() {
  popupForm.style.visibility = "hidden";
  submitBtn.style.display = "none";
}

window.addEventListener("click", (e) => {
  if (e.target == popupForm) {
    closeForm();
  }

  const editMenuContainer = Array.from(
    document.getElementsByClassName("edit-btn--div")
  );

  const element = editMenuContainer.filter((e) => {
    return e.classList[1] === "visible";
  });

  if (e.target.classList.value !== "fas fa-gear") {
    if (element.length > 0) {
      element[0].classList.remove("visible");
    }
  }
});

function autoSetTime() {
  var dateControl = document.querySelector('input[type="date"]');
  dateControl.value = format(new Date(), "yyyy-MM-dd");
}
autoSetTime();

export { openModifyForm, closeForm };
