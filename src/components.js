import { format } from "date-fns";
import toDate from "date-fns/toDate";

function createProject(projectTitle, id, dataProjects) {
  const displayContainer = document.getElementById("task-container");
  const projectContainer = document.getElementById("project-container");
  const projectItem = document.createElement("div");
  const projectName = document.createElement("button");
  // - Add filter
  projectName.classList.add("project-title");
  projectName.addEventListener("click", () => {
    displayContainer.innerHTML = "";
    console.log(dataProjects);
  });
  projectName.textContent = projectTitle;
  projectContainer.appendChild(projectItem);
  projectItem.appendChild(projectName);
}

function createTask(taskName, taskDate, taskDescription) {
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
  const settingIcon = document.createElement("button");
  settingIcon.classList.add("setting-btn");
  settingIcon.innerHTML = `<i class="fas fa-gear"></i>`;

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

  itemName.textContent = taskName;
  itemDate.textContent = format(taskDate, "dd/MM/yyyy");
  descriptionDisplay.textContent = taskDescription;
}

export { createProject, createTask };
