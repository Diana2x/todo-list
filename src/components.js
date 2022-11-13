import { format } from "date-fns";
import toDate from "date-fns/toDate";
import { currentProjectId } from "./localStorage";
import { displayDataProjects, displayTask } from "./utils";

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
    let projectList = dataProjects.find(
      ({ id_project }) => id_project === id
    ).list;
    displayTask(projectList);
  });
  projectName.textContent = projectTitle;
  projectContainer.appendChild(projectItem);
  projectItem.appendChild(projectName);
}

function createTask(taskName, taskDate, taskDescription, id) {
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
    let editMenuList = document.getElementsByClassName("edit-btn--div");
    Array.from(editMenuList).forEach((e) => e.classList.remove("visible"));
    console.log(editMenuList);
    editMenuContainer.classList.add("visible");
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
