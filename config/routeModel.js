const db = require("../database/dbConfig");

module.exports = {
  findBy,
  add
};

function findBy(user) {
  return db
    .select()
    .table("users")
    .where(user)
    .first();
}
function add(user) {
  return db.table("users").insert(user);
}
