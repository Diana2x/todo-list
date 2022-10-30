import { idGenerator } from "./utils";

class Task {
  constructor(name, due_date, description) {
    this.id = idGenerator();
    this.name = name;
    this.due_date = due_date;
    this.description = description;
    this.status = "New";
  }

  getID() {
    return this.id;
  }
}

class NewProject {
  constructor(name) {
    this.id_project = idGenerator();
    this.name = name;
    this.list = [];
  }
  getIdProject() {
    return this.id_project;
  }
}

export { Task, NewProject };
