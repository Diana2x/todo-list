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
export { idGenerator, validateInputField, trimString };
