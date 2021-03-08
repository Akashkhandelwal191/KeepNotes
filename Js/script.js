var imp;
var userdetailemail;
var userdetailname;
var userdetailpassword;
showNotes();

// markupdate();




//Clock Features Add
function realtimeClock(){

  var rtClock = new Date();
  var hours = rtClock.getHours();
  var minutes = rtClock.getMinutes();
  var seconds = rtClock.getSeconds();

  var amPm = (hours<12) ? "AM":"PM";

  hours = (hours>12) ? hours -12 :hours;

  hours = ("0" + hours).slice(-2);
  minutes = ("0"+minutes).slice(-2);
  seconds = ("0"+seconds).slice(-2);

 //  Display the Clock
//  document.getElementById('date').innerHTML = hours + " : "+ minutes + " : "+seconds + " "+amPm;
 
 var arr1 = ["january","Febuaray","March","April","May","June","July","August","September","October","November","December"];
 var arr2 = ["Sunday","Monday","Tuesday","Wednesday","Thrusday","Friday","Saturday"];

 var date = rtClock.getDate();
 var dayname = rtClock.getDay();
 var month = rtClock.getMonth();
 var Fullyear  = rtClock.getFullYear();

//  document.getElementById('time').innerHTML =  arr2[dayname]+","+date+" "+arr1[month]+" "+Fullyear;
 document.getElementById('time23').innerHTML =  arr2[dayname]+","+date+" "+arr1[month]+" "+Fullyear;
}

//if user add a note,add it to a local storage
let addbtn = document.getElementById('addbtn');
addbtn.addEventListener("click", function (e) {

  let addtxt = document.getElementById('addtxt');
  let addtitle = document.getElementById('addtitle');
  
  if(addtitle.value == "" || addtxt.value == "")
  {
    return alert("Please add note title and details");
  }

  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  }
  else {
    notesobj = JSON.parse(notes);
  }
  let myobj = {
    title: addtitle.value,
    text: addtxt.value
  }
  notesobj.push(myobj);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  addtxt.value = "";
  addtitle.value = "";
  showNotes();
})

//Function to show a notes
function showNotes() {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  }
  else {
    notesobj = JSON.parse(notes);
  }

  let html = "";
  notesobj.forEach(function (element, index) {
    html += ` <div  class="notescard my-2 mx-2 card" style="width: 18rem;">
            
             <div class="card-body">
             <div   class="mark" ><i  id="${index}"  class="far fa-star fa-2x"></i></div>
            <h5 class="card-title">${element.title}</h5>
            <p class="card-text">${element.text}</p>
            <button id="${index}" onclick="deleteNote(this.id)" class="btn btn-danger">Delete Note</button>
            <button class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#EditNote" onclick="editnote(${index})">Edit Note</button>
            </div>
            </div>`
            var imp = index;

  });
  let notesElm = document.getElementById('notes');
  if (notesobj.length != 0) {
    notesElm.innerHTML = html;
    
  }
  else {
    notesElm.innerHTML = `<h5 class="text-white">Nothing to show Use "Add a note section" to above add notes</h5>`;
  }
  // markupdate();

}

//Function to delete a note

function deleteNote(index) {
  
  let confirmDel = confirm("Are you sure want to delete this note!!");

  if(confirmDel == true)
  {
  let notes = localStorage.getItem("notes");
  if (notes == null) {
    notesobj = [];
  }
  else {
    notesobj = JSON.parse(notes);
  }
  notesobj.splice(index, 1);
  localStorage.setItem("notes", JSON.stringify(notesobj));
  // deletemark(index);
  showNotes();
  }

}


// function deletemark(ind)
// {

//   let marks = localStorage.getItem("markdetail");
//   if(marks == null)
//   {
//     marksobj = [];
//   }
//   else{
//     marksobj = JSON.parse(marks);
//   }
//   marksobj.splice(ind,1);
//   localStorage.setItem("markdetail",JSON.stringify(marksobj));


// }

//To search in a notes 
let search = document.getElementById('searchtxt');
search.addEventListener("input", function () {

  let inputVal = search.value.toLowerCase();
  let notesCards = document.getElementsByClassName('notescard');
  Array.from(notesCards).forEach(function (element) {
    let cardTxt = element.getElementsByTagName("p")[0].innerText.toLowerCase();
    if (cardTxt.includes(inputVal)) {
      element.style.display = "block";
    }
    else {
      element.style.display = "none";
    }
  })

})


function editnote(index){
 
  let saveindex = document.getElementById("saveindex");
  saveindex.value = index;
  let notes = localStorage.getItem("notes"); 
  let notesobj = JSON.parse(notes);
  
  let addchange = document.getElementById('addchange');
  addchange.style.backgroundColor = "blue";
  let addtxt1 = document.getElementById('addtxt1');
  let addtitle1 = document.getElementById('addtitle1');
          
  addtitle1.value = notesobj[index].title;
  addtxt1.value = notesobj[index].text;
        
}


let addchange = document.getElementById('addchange');
addchange.addEventListener("click",function(e){

  let notes = localStorage.getItem("notes"); 
  let notesobj = JSON.parse(notes);
  let saveindex = document.getElementById("saveindex").value; 
  let addtxt1 = document.getElementById('addtxt1');
  let addtitle1 = document.getElementById('addtitle1');
  notesobj[saveindex].title = addtitle1.value;
  notesobj[saveindex].text = addtxt1.value;
  addchange.style.backgroundColor = "grey";
  localStorage.setItem("notes", JSON.stringify(notesobj));
  
  showNotes();

})


let Deletebtn = document.getElementById('Deletebtn');
Deletebtn.addEventListener("click",function(e){

  let notes = localStorage.getItem("notes"); 
  let notesobj = JSON.parse(notes);
  
  if(notesobj.length == 0)
  {
     notesobj = [];
  }
  else
  {
    let confirmDel = confirm("Do you really want to delete all notes");

    if(confirmDel == true)
    {
    notesobj = JSON.parse(notes);
    notesobj = [];
    localStorage.setItem("notes", JSON.stringify(notesobj));
    showNotes();
    }

  }
 


})
// //Important notes
// function mark(mp){
// var j = 0;
// let marks = localStorage.getItem("markdetail");
// if(marks == null)
// {
//   marksobj = [];
// }
// else{
//   marksobj = JSON.parse(marks);
// }

// // let td = document.getElementById(mp);
// // alert(td);
// marksobj.forEach(function(element,index){

//    if(mp == index)
//    {
//      j++;
//    }


// });

//   if(j==1)
//   {

//     let confirmdel = confirm("Do you really want to move this in Unimportant section");

//     if(confirmdel == true)
//     {
     
//       deletemark(mp);
      
//       document.getElementById(mp).style.backgroundColor =  "white"; 
     
//     }
//   }


//   if(j==0)
//   {
//      let myobj = {
//           check: "mark",
//           color: "yellow",
//        }
//        marksobj.push(myobj);
//        localStorage.setItem("markdetail",JSON.stringify(marksobj));
//        alert("Are You really want to store this note in Important section");
//        markupdate();
//   }
// }


// function markupdate(){
 
//   let marks = localStorage.getItem("markdetail");
//   if(marks == null)
//   {
//      marksobj = [];
//   }
//   else{
//   marksobj = JSON.parse(marks);
//   }

//    marksobj.forEach(function(element,index){
//        document.getElementById(index).style.backgroundColor = element.color;
      
//    });

 
// }




function Register() {
  var i = 0;
  let user = localStorage.getItem("userdetail");
  if (user == null) {
    userobj = [];
  }
  else {
    userobj = JSON.parse(user);
  }   
 
  let name = document.getElementById('formtxt');
  let email = document.getElementById('formemail');
  let password = document.getElementById('formpass');

   userobj.forEach(function(element,index) {
        
      if(element.username == name.value.toLowerCase())
     {
       alert("Username already Exist");
       i++;
       return false;
     }

   });
  
  

  if(i==0)
  {
    let myobj = {
        username: name.value.toLowerCase(),
        email: email.value.toLowerCase(),
         password :password.value.toLowerCase()
       }
      userobj.push(myobj);
      localStorage.setItem("userdetail", JSON.stringify(userobj));
      alert("You Register Successfully With Us Now You Can Sign In!!");
      return true;
  }
   
  return false;
}













function Validate() {

  var i =0;
  let user = localStorage.getItem("userdetail");
  if (user == null) {
    userobj = [];
  }
  else {
    userobj = JSON.parse(user);
  }

  let name = document.getElementById('formtxt');
  let password = document.getElementById('formpass');
  userobj.forEach(function(element,index) {
    
    if (element.username == name.value.toLowerCase() && element.password == password.value.toLowerCase()) 
    {
      i++;
      localStorage.setItem("index",index);
      sessionStorage.setItem('status2','loggedIn2');
      return true;
    }

 });

  if(i==0)
  {
    alert("Username and password are incorrect!!");
    return false;
  }

 return true;

}




let SignOut = document.getElementById("SignOut");
SignOut.addEventListener("click",function(e){

   let confirmDel5 = confirm("Do you really want to Sign out");
   
   if(confirmDel5 == true)
   {
   sessionStorage.clear();
   window.history.go(-window.history.length);
   window.location.href = "SignIn.html";
   }

})