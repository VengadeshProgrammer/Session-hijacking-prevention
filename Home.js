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
import { getDatabase, ref} from "https://www.gstatic.com/firebasejs/10.12.3/firebase-database.js";
const db = getDatabase();
const dbRef = ref(db);
window.onload = () => {
    var firstval;
   
    if(localStorage.getItem("value") && localStorage.getItem("value").length==64){
      if(!localStorage.getItem("value").includes("<")){
        //main contents goes here..
        firstval=localStorage.getItem("value");
        document.querySelector(".logout").addEventListener("click", ()=>{
          var boolean = confirm("Wanna Logout?");
          if(boolean==true){
            document.write("");
            localStorage.clear();
            window.location.href = "/signup.html";
          }
         else{}
        });
        
       
    }
  else{
    localStorage.clear();
  }}
    //main cotent ends here..
    else if(localStorage.getItem("value")==null||localStorage.getItem("value")==undefined){
        window.location.href="/signup.html";
    }
   else if(localStorage.getItem("value").length!=64){
    localStorage.clear();
   }

//-------------------------
   window.addEventListener("storage", (e)=>{
    if(localStorage.getItem("value")){
    if(e.key == "value" && firstval!=localStorage.getItem("value")){
        localStorage.clear();
        window.location.href="/signup.html";
    }
  }
  });
  window.onbeforeunload=()=>{
    if(firstval!=localStorage.getItem("value")){
    localStorage.clear();
    window.location.href="/signup.html";
    }
  }
};