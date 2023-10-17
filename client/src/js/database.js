import { openDB } from 'idb';

const initdb = async () =>
  openDB('jate', 1, {
    upgrade(db) {
      if (db.objectStoreNames.contains('jate')) {
        console.log('jate database already exists');
        return;
      }
      db.createObjectStore('jate', { keyPath: 'id', autoIncrement: true });
      console.log('jate database created');
    },
  });


export const putDb = async (content) => {
  const offlineDb = await openDB('jate', 1);
  // Gives function permission to change the database or mutate it (mutations)
  const tx = offlineDb.transaction('jate', 'readwrite');

  const store = tx.objectStore('jate');
  // Succinct version of finding a row in the database using its id
  const request = store.put({id: 1, value: content});

  const result = await request;
  console.log('result.value', result);
}


export const getDb = async () => {
  console.log('GET from the database');

  const offlineDb = await openDB('jate', 1);

  const tx = offlineDb.transaction('jate', 'readonly');

  const store = tx.objectStore('jate');

  const request = store.getAll();

  const result = await request;
  console.log('result.value', result);

  // if you have an input or text area you have to use value
  return result.value;
}

initdb();
