import {getDatabase, ref, get, set, update, remove, child} from "https://www.gstatic.com/firebasejs/9.9.0/firebase-database.js";

var nameV,rollV,genV,addV;
const db = getDatabase();

var roll = document.getElementById("roll");
var namex = document.getElementById("name");
var gender = document.getElementById("gen");
var address = document.getElementById("address");

function insertData(e){
    e.preventDefault();
    readValue();
    if(rollV=="" && nameV=="" && genV=="" && addV==""){
        alert("Fields cannot be blank");
    }
    // Code to insert data into Firebase
    else{
        set(ref(db,"data/" + rollV),{
            RollNo:rollV,
            Name:nameV,
            Gender:genV,
            Address:addV,
        }).then(()=>{
            alert("Data Stored Successfully");
        }).catch((err)=>{
            alert("Unsuccessfull",err);
        })
        clearValue()
    }
}
function readData(e){
    e.preventDefault();
    readValue();
    if(rollV==""){
        alert("Roll No  cannot be blank");
    }
    // Code to read data from Firebase
    else{
        const dbref = ref(db);
        get(child(dbref,"data/"+rollV))
        .then((snap)=>{
            if(snap.exists()){
                namex.value=snap.val().Name;
                roll.value=snap.val().RollNo;
                gender.value=snap.val().Gender;
                address.value=snap.val().Address;
            }
            else{
                alert("No data Found")
            }
        }).catch((err)=>{
            alert("Unsuccessfull",err);
        })
    }
}
function updateData(e){
    e.preventDefault();
    readValue();
    if(rollV=="" && nameV=="" && genV=="" && addV==""){
        alert("Fields cannot be blank");
    }
    // Code to update data in Firebase
    else{
        update(ref(db,"data/" + rollV),{
            Name:nameV,
            Gender:genV,
            Address:addV,
        }).then(()=>{
            alert("Data Stored Successfully");
        }).catch((err)=>{
            alert("Unsuccessfull",err);
        })
        
        clearValue()
    }
}
function deleteData(e){
    e.preventDefault();
    readValue();
    if(rollV=="" && nameV=="" && genV=="" && addV==""){
        alert("Fields cannot be blank");
    }
    // Code to delete data from Firebase
    else{
        if(confirm("Do you really want to delete?")){
            remove(ref(db,"data/"+rollV))
            .then(()=>{
                alert("Data deleted Successfully");
            }).catch((err)=>{
                alert("Unsuccessfull"+err);
            })
        }
        
        clearValue()
    }
}


function readValue(){
    nameV = namex.value;
    rollV = roll.value;
    genV = gender.value;
    addV = address.value;
    console.log(nameV,rollV,genV,addV);
}

function clearValue(){
    namex.value="";
    roll.value="";
    gender.value="";
    address.value="";
}

document.getElementById("insert").onclick = insertData;
document.getElementById("read").onclick = readData;
document.getElementById("update").onclick = updateData;
document.getElementById("delete").onclick = deleteData;
