import { format } from "date-fns";
import {
  currentProjectId,
  deleteTaskProjects,
  getCurrentTask,
  modifyTask,
} from "./localStorage";
import { displayTask } from "./utils";
import { openModifyForm } from "./index";

let submitBtn = document.getElementById("submit");
let inputName = document.getElementById("name");
let inputDate = document.getElementById("date");
let textDescription = document.getElementById("description");

function createProject(projectTitle, id, dataProjects) {
  const addTaskBtn = document.querySelector(".new-task");
  const displayContainer = document.getElementById("task-container");
  const projectContainer = document.getElementById("project-container");
  const projectItem = document.createElement("div");
  const projectName = document.createElement("button");
  projectName.classList.add("project-title");
  projectName.addEventListener("click", () => {
    addTaskBtn.style.display = "block";
    displayContainer.innerHTML = "";
    currentProjectId(id);
    displayTask(dataProjects);
  });
  projectName.textContent = projectTitle;
  projectContainer.appendChild(projectItem);
  projectItem.appendChild(projectName);
}

function createTask(taskName, taskDate, taskDescription, id, data) {
  const taskContainer = document.getElementById("task-container");
  const taskItem = document.createElement("div");
  taskItem.classList.add("item-container");
  const leftContainer = document.createElement("div");
  const topContainer = document.createElement("div");
  topContainer.classList.add("top-container");
  const itemDate = document.createElement("p");
  itemDate.classList.add("task-date");
  const itemName = document.createElement("p");
  itemName.classList.add("task-name");
  const textContainer = document.createElement("div");
  textContainer.classList.add("text-container");
  const descriptionTag = document.createElement("p");
  descriptionTag.innerHTML = `About: `;
  const descriptionDisplay = document.createElement("p");
  descriptionDisplay.classList.add("description-field");
  const statusContainer = document.createElement("div");
  statusContainer.classList.add("status-container");
  const itemStatus = document.createElement("p");
  itemStatus.classList.add("current-status");
  itemStatus.innerHTML = `New`;
  const settingContainer = document.createElement("div");
  settingContainer.classList.add("setting-container");
  const settingIcon = document.createElement("button");
  settingIcon.classList.add("setting-btn");
  settingIcon.innerHTML = `<i class="fas fa-gear"></i>`;
  // Calling edit Menu
  const editMenuContainer = document.createElement("div");
  editMenuContainer.classList.add("edit-btn--div");
  const modifyOption = document.createElement("div");
  modifyOption.classList.add("modify-task--details", "edit-menu--item");
  modifyOption.innerText = "Edit";
  const deleteOption = document.createElement("div");
  deleteOption.classList.add("delete-task", "edit-menu--item");
  deleteOption.innerText = "Delete";
  settingIcon.addEventListener("click", () => {
    if (editMenuContainer.classList.contains("visible")) {
      editMenuContainer.classList.remove("visible");
      return;
    }
    const auxBtns = Array.from(
      document.getElementsByClassName("edit-btn--div")
    );
    const elements = auxBtns.filter((e) => e.classList.contains("visible"));
    Array.from(elements).forEach((e) => e.classList.remove("visible"));
    editMenuContainer.classList.add("visible");
  });
  modifyOption.addEventListener("click", () => {
    let currentTask = getCurrentTask(id, data);
    openModifyForm(currentTask);
    console.log(getCurrentTask(id, data));
    submitBtn.addEventListener("click", () => {
      modifyTask(
        inputName.value,
        inputDate.valueAsNumber,
        textDescription.value,
        data,
        id
      );
    });
  });
  deleteOption.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this task?") == true) {
      deleteTaskProjects(id, data);
      taskContainer.removeChild(taskItem);
    } else return;
  });

  taskContainer.appendChild(taskItem);
  taskItem.appendChild(leftContainer);
  leftContainer.appendChild(topContainer);
  topContainer.appendChild(itemDate);
  topContainer.appendChild(itemName);
  leftContainer.appendChild(textContainer);
  textContainer.appendChild(descriptionTag);
  textContainer.appendChild(descriptionDisplay);
  leftContainer.appendChild(statusContainer);
  statusContainer.appendChild(itemStatus);
  taskItem.appendChild(settingContainer);
  settingContainer.appendChild(settingIcon);
  settingContainer.appendChild(editMenuContainer);
  editMenuContainer.appendChild(modifyOption);
  editMenuContainer.appendChild(deleteOption);

  itemName.textContent = taskName;
  itemDate.textContent = format(taskDate, "dd/MM/yyyy");
  descriptionDisplay.textContent = taskDescription;
}

export { createProject, createTask };
