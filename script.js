 // Import the functions you need from the SDKs you need
 import { initializeApp } from "https://www.gstatic.com/firebasejs/10.12.3/firebase-app.js";

const firebaseConfig = {
  apiKey: "AIzaSyCifBZebTJfNFyowQVxV5i0NseB1Gg0gig",
  authDomain: "sessionhalt.firebaseapp.com",
  databaseURL: "https://sessionhalt-default-rtdb.firebaseio.com",
  projectId: "sessionhalt",
  storageBucket: "sessionhalt.appspot.com",
  messagingSenderId: "92487908563",
  appId: "1:92487908563:web:e46414c95add1c1c892826",
  measurementId: "G-N8MF33167V"
};

 // Initialize Firebase
 const app = initializeApp(firebaseConfig);
import {set, getDatabase, ref, child, get} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
const db = getDatabase();
const dbRef = ref(db);
window.onload = () => {
  var dataPresent = false;
  var buttonpressed = false;
  var firstval;

  //Implement autosignin session
var storedValue2 = [];
if(localStorage.getItem("value")){
    if(localStorage.getItem("value").length==64){
      if(!localStorage.getItem("value").includes("<")){
      dataPresent = true;
      firstval = localStorage.getItem("value");
   
    get(child(dbRef, "users/")).then((snapshot)=>{
        if(snapshot.exists()){
            for(const key in snapshot.val()){
                var end = key.indexOf(",")-1;
                var txt = key.slice(0, end);        
                if(txt == localStorage.getItem("value")){
             window.location.href="/Home.html";
                }
            }
        }
        else{
            alert("Username or Password is Wrong!");
        }
    });
}
else{
  localStorage.clear();
}
}
else{
  localStorage.clear();
}}
else{
  dataPresent = false;
var password = document.querySelector(".password");
var username = document.querySelector(".name");
var continuebtn = document.querySelector(".signupbtn");
continuebtn.addEventListener("click", ()=>{

if(password.value.split(/\s/).join("").length>=8 &&username.value.split(/\s/).join("").length>0){
  if(!password.value.includes("<") && !username.value.includes("<")){
    async function sha256(message) {
        // Encode the message as UTF-8
        const msgBuffer = new TextEncoder('utf-8').encode(message);
      
        // Create a SubtleCrypto object
        const crypto = window.crypto.subtle;
      
        // Hash the message using SHA-256
        const hashBuffer = await crypto.digest('SHA-256', msgBuffer);
      
        // Convert the ArrayBuffer to a hex string
        const hashArray = Array.from(new Uint8Array(hashBuffer));
        const hashHex = hashArray.map(b => ('00' + b.toString(16)).slice(-2)).join('');
      
        return hashHex;
      }
      const db = getDatabase();
      const dbRef = ref(db);
var came = false;
      get(child(dbRef, "users/")).then((snapshot)=>{
      if(snapshot.exists()){
        for(const key in snapshot.val()){
          var start = key.indexOf(",")+1;
          var txt = key.slice(start, key.length);        
          if(txt == username.value){
            came = true;
              alert("Username is Already Be Taken. Pick A Another a name");
          }
        }
          if(came == false){
            buttonpressed = true;
            var storedValue = [];
            sha256(username.value)
            .then(hash => {
              const hashedValue = hash; 
             storedValue.push(hash);
            })
            .catch(error => {
              console.error("Error hashing data:", error);
            });
       
             sha256(password.value)
             .then(hash => {
               const hashedValue = hash; 
               storedValue.push(hash);
             })
             .catch(error => {
               console.error("Error hashing data:", error);
             });
             
             sha256(password.value + username.value + window.navigator.userAgent)
             .then(hash => {
               const hashedValue = hash; 
               storedValue.push(hash);
             })
             .catch(error => {
               console.error("Error hashing data:", error);
             });
         
         
             
             let inter = setInterval(() => {
              localStorage.setItem("value", storedValue[1]);
            
              set(ref(db, "users/" + storedValue[1] + "," + username.value), {
                username: username.value,
                password: storedValue[0],
                total: storedValue[1],
              })
                .then(() => {
                  window.location.href = "/Home.html";
                })
                .catch((error) => {
                  console.error("Error creating account: ", error);
                  alert("Failed to create account. Please try again.");
                })
                .finally(() => {
                  clearInterval(inter);
                });
            }, 100);
            
             
          }
      }
      }); //---
     }
     else{
      password.innerHTML="";
      username.innerHTML="";
     }
    }
 else{
  alert("Please Fill Up The Requirement! And Ensure If The Password has no white spaces and length is 8 or more characters");
 }
});
}
window.addEventListener("storage", (e)=>{
  if(localStorage.getItem("value")){
  if(e.key == "value" && firstval!=localStorage.getItem("value")){
    if(buttonpressed == true){
      window.location.href="/Home.html";
    }
    else if(buttonpressed == false){
      localStorage.clear();
    }
  }
}
});
window.onbeforeunload=()=>{
  if(firstval!=localStorage.getItem("value")){
    if(buttonpressed == true){
    }
    else if(buttonpressed == false){
      localStorage.clear();
    }
  }
}
}