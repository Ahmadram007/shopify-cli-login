const { resolve, join } = require("path");
const JSONdb = require("simple-json-db");
const envPaths = require("env-paths");
const paths = envPaths("shoplog");
const mkdirp = require("mkdirp");
mkdirp.sync(paths.config);
const defaultPath = join(paths.config, "database.json");
const db = new JSONdb(defaultPath);

if (!db.has("list")) {
  db.set("list", []);
}

db.hasElement = (storeDomain) => {
  return db.JSON().list.includes(storeDomain);
};
db.addStore = (storeDomain) => {
  const newList = [...db.JSON().list, storeDomain];
  db.set("list", newList);
};
db.removeStore = (storeDomain) => {
  const filteredList = db.JSON().list.filter((item) => item !== storeDomain);
  db.set("list", filteredList);
};
db.getList = () => {
  return db.JSON().list;
};
db.replaceList = (list) => {
  db.set("list", list);
};
db.addList = (newlist) => {
  const newList = [...db.JSON().list, ...newlist];
  db.set("list", newList);
};

module.exports = {
  db,
  path: resolve(defaultPath),
};
