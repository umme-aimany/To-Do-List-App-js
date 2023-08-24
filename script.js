function addTask() {
    const taskInput = document.getElementById("task");
    const taskList = document.getElementById("taskList");
    
    if (taskInput.value !== "") {
      const newTask = document.createElement("li");
      newTask.innerHTML = `<input type="checkbox">${taskInput.value}`;
      taskList.appendChild(newTask);
      taskInput.value = "";
    }
  }
 // For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyC-mD2PMfvsaa5BC4iCs5v2GvynfI64HJI",
    authDomain: "to--do-list-app-43f5c.firebaseapp.com",
    projectId: "to--do-list-app-43f5c",
    storageBucket: "to--do-list-app-43f5c.appspot.com",
    messagingSenderId: "816019078215",
    appId: "1:816019078215:web:12ffdef14dbc258b764562",
    measurementId: "G-GVN86WK2H1"
  };
  
  firebase.initializeApp(firebaseConfig);
  const db = firebase.firestore();
  
  const guestbookForm = document.getElementById("guestbook-form");
  const entriesList = document.getElementById("entries");
  
  guestbookForm.addEventListener("submit", function(event) {
    event.preventDefault();
    
    const name = document.getElementById("name").value;
    const message = document.getElementById("message").value;
    
    if (name && message) {
      db.collection("guestbook").add({
        name: name,
        message: message,
        timestamp: firebase.firestore.FieldValue.serverTimestamp()
      });
      
      document.getElementById("name").value = "";
      document.getElementById("message").value = "";
    }
  });
  
  db.collection("guestbook")
    .orderBy("timestamp", "desc")
    .onSnapshot(snapshot => {
      entriesList.innerHTML = "";
      snapshot.forEach(doc => {
        const entry = doc.data();
        const listItem = document.createElement("li");
        listItem.innerHTML = `<strong>${entry.name}:</strong> ${entry.message}`;
        entriesList.appendChild(listItem);
      });
    });
