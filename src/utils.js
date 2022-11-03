import { createProject, createTask } from "./components";

function idGenerator() {
  const uuid = require("uuid");
  return uuid.v4();
}

function validateInputField(newData, totalData) {
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
  data.forEach((e) => {
    createProject(e.name, e.id_project, data);
  });
};

const displayInbox = (data) => {
  data.forEach((e) => {
    createTask(e.name, e.due_date, e.description);
  });
};

export {
  idGenerator,
  validateInputField,
  trimString,
  displayDataProjects,
  displayInbox,
};
