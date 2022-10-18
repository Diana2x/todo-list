function idGenerator() {
  const uuid = require("uuid");
  return uuid.v4();
}

export { idGenerator };
