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
var storedValue = [];
var storedValue2 = [];
 var storedValue3=[];
if(localStorage.getItem("value")){
    if(localStorage.getItem("value").length==64){
      if(!localStorage.getItem("value").includes("<")){
      dataPresent=true;
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
    });
}
else{
  localStorage.clear();
}
}
}
else{
  dataPresent = false;
    var password = document.querySelector(".password");
    var username = document.querySelector(".name");
    var continuebtn = document.querySelector(".signinbtn");
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
              sha256(password.value)
         .then(hash => {
           const hashedValue = hash; 
           storedValue3.push(hash);
         })
         .catch(error => {
           console.error("Error hashing data:", error);
         });
  
       var came2 = false;
         get(child(dbRef, "users/")).then((snapshot)=>{
            if(snapshot.exists()){
                for(const key in snapshot.val()){
                    var start = key.indexOf(",")+1;
                    var txt = key.slice(start, key.length);        
                    if(txt == username.value){
                      came2 = true;       
                       if(snapshot.val()[key]["password"] == storedValue3[0]){
                        buttonpressed = true;
                        localStorage.setItem("value", snapshot.val()[key]["total"]);
                        var inter2 = setInterval(()=>{
                          window.location.href="/Home.html";
                          clearInterval(inter2);
                        },100)
                        
                       }
                       else{
                        alert("Password is Incorrect!");
                        storedValue = [];
                       }
                      }
                  }
                        
                    if(came2 == false){
                      alert("No Account Found!")
                    }
            }
        });
      }
      else{
        localStorage.clear();
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
};
