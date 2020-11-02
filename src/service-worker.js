importScripts('./ngsw-worker.js');

self.addEventListener('sync', (event) => {
  if (event.tag === 'post-data') {
    // call method
    event.waitUntil(getDataAndSend());
  }
});


function getDataAndSend() {
  let db;
  const request = indexedDB.open('my-db');
  request.onerror = (event) => {
    console.log('Please allow my web app to use IndexedDB 😃>>>👻');
  };
  request.onsuccess = (event) => {
    db = event.target.result;
    getData(db);
  };
}

function getData(db) {
  const transaction = db.transaction(['user-store']);
  const objectStore = transaction.objectStore('user-store');
  // const request = objectStore.get('name');
  const request = objectStore.getAll()
  request.onerror = (event) => {
    // Handle errors!
  };
  request.onsuccess = (event) => {
    // Do something with the request.result!
    addData(request.result);
    console.log('Name of the user is ' + JSON.stringify(request.result));
  };
}

function addData(data) {
  //indexDb
  // let obj = {
  //   name: userName,
  // };

  for (var dt of data) {
    fetch('https://api.npoint.io/b331ecf08dddd718044d', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        name: dt.name,
        number: dt.number
      }),
    })
      .then(() => Promise.resolve())
      .catch(() => Promise.reject());
  }


}
