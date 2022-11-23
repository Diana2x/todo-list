import { idGenerator } from "./utils";

class Task {
  constructor(name, due_date, description, status) {
    this.id = idGenerator();
    this.name = name;
    this.due_date = due_date;
    this.description = description;
    this.status = status;
  }
  get taskId() {
    return this.id;
  }
}

class NewProject {
  constructor(name) {
    this.id_project = idGenerator();
    this.name = name;
    this.list = [];
  }
}

export { Task, NewProject };
