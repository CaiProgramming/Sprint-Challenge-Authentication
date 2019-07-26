const db = require("../database/dbConfig");

module.exports = {
  findBy,
  add
};

function findBy(user) {
  return db.table("users").where(user);
}
function add(user) {
  return db.table("users").insert(user);
}
