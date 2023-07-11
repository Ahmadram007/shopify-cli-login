import { resolve, join } from 'path';
import JSONdb from 'simple-json-db';
import envPaths from 'env-paths';
const paths = envPaths('shoplog');
import mkdirp from 'mkdirp';
mkdirp.sync(paths.config);
const defaultPath = join(paths.config, 'database.json');
const db = new JSONdb(defaultPath);

if (!db.has('list')) {
	db.set('list', []);
}

db.hasElement = (storeDomain) => {
	return db.JSON().list.includes(storeDomain);
};
db.addStore = (storeDomain) => {
	const newList = [...db.JSON().list, storeDomain];
	db.set('list', newList);
};
db.removeStore = (storeDomain) => {
	const filteredList = db.JSON().list.filter((item) => item !== storeDomain);
	db.set('list', filteredList);
};
db.getList = () => {
	return db.JSON().list;
};
db.replaceList = (list) => {
	db.set('list', list);
};
db.addList = (newlist) => {
	const newList = [...db.JSON().list, ...newlist];
	db.set('list', newList);
};

export { db, defaultPath };
