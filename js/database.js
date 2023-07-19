export function openDatabaseConnection(databaseName, version) {
    let openRequest = indexedDB.open(databaseName, version);

    openRequest.onupgradeneeded = function (e) {
        db = e.target.result;
        console.log('running onupgradeneeded');
        const storeOS = db.createObjectStore('users',  {keyPath: "email"});
     };
    
    openRequest.onsuccess = function (e) {
        console.log('running onsuccess');
        db = e.target.result;
    };
    
    openRequest.onerror = function (e) {
        console.log('onerror! doesnt work');
    };


    return openRequest;
}

export function addNewUser(openRequest, user) {
    const user = {
        firstname: user.firstname,
        lastname: user.lastname,
        email: user.email,
        password: user.password
    };
    const transaction = openRequest.transaction("users", "readwrite");
    const dataStore = transaction.objectStore('users');
    dataStore.add(user);
}