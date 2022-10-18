import { idGenerator } from "./utils";

class Task {
  constructor(title, due_date, description, status) {
    this.id = idGenerator();
    this.title = title;
    this.due_date = due_date;
    this.description = description;
    this.status = status;
  }

  getID() {
    return this.id;
  }
}

export { Task };
