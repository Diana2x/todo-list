import { createProject, createTask } from "./components";
import { createProjectLocalStorage, getCurrentProjectId } from "./localStorage";
import { NewProject } from "./class";

function idGenerator() {
  const uuid = require("uuid");
  return uuid.v4();
}

function validateNameInput(newData, totalData) {
  return totalData.every(
    (e) => e.name.toLowerCase() !== newData.name.toLowerCase()
  );
}

function trimString(string) {
  return string
    .replace(/(\W|\_)/g, " ")
    .replace(/\ {2,30}/g, " ")
    .trim();
}

const displayDataProjects = (data) => {
  let newData = data.every((e) => {
    e.name !== "inbox";
  });

  if (newData) {
    let createInboxData = new NewProject("inbox");
    createInboxData.id_project = "1";
    createProjectLocalStorage(createInboxData, data);
    createProject("inbox", createInboxData.id_project, createInboxData);
  }

  data.map((e) => {
    if (e.name !== "inbox") {
      createProject(e.name, e.id_project, data);
    }
  });
};

const displayTask = (data) => {
  let dataProject = data.find((e) => e.id_project === getCurrentProjectId());
  console.log(dataProject);
  dataProject.list.forEach((e) => {
    createTask(e.name, e.due_date, e.description, e.id, data);
  });
};

export {
  idGenerator,
  validateNameInput,
  trimString,
  displayDataProjects,
  displayTask,
};
