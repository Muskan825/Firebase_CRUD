import {getDatabase, ref, get, set, update, remove, child} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";


const db = getDatabase();

function allData(){
    const dbref = ref(db);
    
    get(child(dbref,"data/"))
    .then((snap)=>{
        var users =[];
        snap.forEach(element => {
            users.push(element.val());
        });
        displayUser(users);
    })
}

var stdNo =0;
var tbody = document.getElementById("tbody");

function displayUser(users){
    stdNo = 0;
    tbody.innerHtml="";
    users.forEach((user)=>{
        let tr = document.createElement("tr");
        
        let td1 = document.createElement("td");
        let td2 = document.createElement("td");
        let td3 = document.createElement("td");
        let td4 = document.createElement("td");
        let td5 = document.createElement("td");
        
        td1.innerText = ++stdNo;
        td2.innerText = user.RollNo;
        td3.innerText = user.Name;
        td4.innerText = user.Gender;
        td5.innerText = user.Address;
        
        tr.appendChild(td1);
        tr.appendChild(td2);
        tr.appendChild(td3);
        tr.appendChild(td4);
        tr.appendChild(td5);
        
        tbody.append(tr);
    });
}

window.onload = allData;