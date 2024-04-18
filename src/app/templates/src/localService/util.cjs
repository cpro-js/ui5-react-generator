/* ----------------- Helper Functions ----------------------- */
function stripTextEscaping(text) {
  return text ? text.replace(/'/g, "") : text;
}

function getParams(odataRequest) {
  return [...odataRequest.allParams.entries()].reduce((collector, [key, val]) => {
    collector[key] = stripTextEscaping(val);
    return collector;
  }, {});
}

function generateId() {
  return Math.floor(Math.random() * 9999999).toString();
}

exports.getParams = getParams;
exports.generateId = generateId;
