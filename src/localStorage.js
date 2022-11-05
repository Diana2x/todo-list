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

function createTaskLocalStorage(newTask, data) {
  data.push(newTask);
  localStorage.setItem("inbox", JSON.stringify(data));
}

function getProjectData() {
  let AllData = JSON.parse(localStorage.getItem("projects"));
  return AllData;
}

function getInboxData() {
  let inboxData = JSON.parse(localStorage.getItem("inbox"));
  return inboxData;
}

function storeTaskbyProject(task, id, data) {
  data.find(({ id_project }) => id_project === id).list.push(task);
  localStorage.setItem("projects", JSON.stringify(data));
}

export {
  createProjectLocalStorage,
  createTaskLocalStorage,
  getProjectData,
  getInboxData,
  currentProjectId,
  storeTaskbyProject,
  getCurrentProjectId,
};
