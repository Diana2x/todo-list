function createProjectLocalStorage(newProject, data) {
  data.push(newProject);
  localStorage.setItem("projects", JSON.stringify(data));
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

export {
  createProjectLocalStorage,
  createTaskLocalStorage,
  getProjectData,
  getInboxData,
};
