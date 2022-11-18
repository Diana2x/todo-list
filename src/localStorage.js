import { da } from "date-fns/locale";
import { openModifyForm } from "./index";
function createProjectLocalStorage(newProject, data) {
  data.push(newProject);
  localStorage.setItem("projects", JSON.stringify(data));
}

function currentProjectId(id) {
  localStorage.setItem("currentProject", JSON.stringify(id));
}

function getCurrentProjectId() {
  return JSON.parse(localStorage.getItem("currentProject"));
}

function getProjectData() {
  let AllData = JSON.parse(localStorage.getItem("projects"));
  return AllData;
}

function storeTaskbyProject(task, id, data) {
  data.find(({ id_project }) => id_project === id).list.push(task);
  localStorage.setItem("projects", JSON.stringify(data));
}

function getCurrentTask(idTask, data) {
  let currentProject = data.find((e) => e.id_project === getCurrentProjectId());
  let task = currentProject.list.find((e) => e.id === idTask);
  return task;
}

function modifyTask(name, date, description, data, idTask) {
  let currentProject = data.find((e) => e.id_project === getCurrentProjectId());
  let task = currentProject.list.find((e) => e.id === idTask);
  task.name = name;
  task.due_date = date;
  task.description = description;
  localStorage.setItem("projects", JSON.stringify(data));
}

function deleteTaskProjects(idTask, data) {
  let currentProject = data.find((e) => e.id_project === getCurrentProjectId());
  let currentIndex = currentProject.list.findIndex((e) => e.id === idTask);
  currentProject.list.splice(currentIndex, 1);
  localStorage.setItem("projects", JSON.stringify(data));
}

export {
  createProjectLocalStorage,
  getProjectData,
  currentProjectId,
  storeTaskbyProject,
  getCurrentProjectId,
  deleteTaskProjects,
  getCurrentTask,
  modifyTask,
};
