import { format } from "date-fns";
import {
  currentProjectId,
  deleteTaskProjects,
  getCurrentTask,
  modifyTask,
  deleteProject,
} from "./localStorage";
import { displayTask } from "./utils";
import { openModifyForm, closeForm, currentSelectionActive } from "./index";

const submitEditBtn = document.getElementById("submit-edit");
const submitBtn = document.getElementById("submit");
const inputName = document.getElementById("name");
const inputDate = document.getElementById("date");
const textDescription = document.getElementById("description");
const pageHeader = document.getElementById("page-header");

function createProject(projectTitle, id, dataProjects) {
  if (projectTitle === "inbox") {
    return;
  }
  const addbtnContainer = document.getElementsByClassName("add-btn");
  const addTaskBtn = document.querySelector(".new-task");
  const displayContainer = document.getElementById("task-container");
  const projectContainer = document.getElementById("project-container");
  const projectItem = document.createElement("div");
  projectItem.classList.add("project-div");
  const projectName = document.createElement("button");
  const projectDelete = document.createElement("button");
  projectDelete.innerHTML = `<i class="fa-solid fa-trash"></i>`;
  projectName.classList.add("project-title");

  projectName.addEventListener("click", () => {
    addbtnContainer[0].style.display = "flex";
    displayContainer.classList.remove("filter-event");
    currentSelectionActive();
    addTaskBtn.style.display = "block";
    displayContainer.innerHTML = "";
    currentProjectId(id);
    displayTask(dataProjects);
    pageHeader.textContent = projectTitle;
    projectItem.classList.add("project-active");
  });
  projectDelete.addEventListener("click", () => {
    if (confirm("Are you sure you want to delete this project?") == true) {
      deleteProject(id, dataProjects);
      projectContainer.removeChild(projectItem);
    } else return;
  });
  projectName.textContent = projectTitle;
  projectContainer.appendChild(projectItem);
  projectItem.appendChild(projectName);
  projectItem.appendChild(projectDelete);
}

function createTask(taskName, taskDate, taskDescription, id, data) {
  const taskContainer = document.getElementById("task-container");
  const taskItem = document.createElement("div");
  taskItem.classList.add("item-container");
  const leftContainer = document.createElement("div");
  leftContainer.classList.add("task-left--container");
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
    openModifyForm(getCurrentTask(id, data));
    submitBtn.style.display = "none";
    submitEditBtn.style.display = "flex";

    submitEditBtn.addEventListener("click", () => {
      modifyTask(
        inputName.value,
        inputDate.valueAsNumber,
        textDescription.value,
        data,
        id
      );

      itemName.textContent = inputName.value;
      itemDate.textContent = format(inputDate.valueAsNumber, "dd/MM/yyyy");
      descriptionDisplay.textContent = textDescription.value;
    });
    submitEditBtn.addEventListener("click", closeForm);
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
  topContainer.appendChild(settingContainer);
  settingContainer.appendChild(settingIcon);
  settingContainer.appendChild(editMenuContainer);
  editMenuContainer.appendChild(modifyOption);
  editMenuContainer.appendChild(deleteOption);

  itemName.textContent = taskName;
  itemDate.textContent = format(taskDate, "dd/MM/yyyy");
  descriptionDisplay.textContent = taskDescription;
}

export { createProject, createTask };
