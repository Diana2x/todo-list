function idGenerator() {
  const uuid = require("uuid");
  return uuid.v4();
}

function validateInputField(newData, totalData) {
  return totalData.every(
    (e) => e.name.toLowerCase() !== newData.name.toLowerCase()
  );
}

export { idGenerator, validateInputField };
