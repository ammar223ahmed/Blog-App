import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
    import { 
      getAuth,
      signInWithEmailAndPassword,
      onAuthStateChanged,
      signOut
       } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-auth.js";
        import {
             getDatabase,
             set,
             ref,
             get,
             remove,
             update
         } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-database.js";


const firebaseConfig = {
  apiKey: "AIzaSyCpxRo-zmrKuicVP-qi8pCzbCmsUB7tHLc",
  authDomain: "fireblog-88fa2.firebaseapp.com",
  projectId: "fireblog-88fa2",
  storageBucket: "fireblog-88fa2.appspot.com",
  messagingSenderId: "326370430034",
  appId: "1:326370430034:web:5de28949bd71e343dea38b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getDatabase(app);



 const my_blog = document.querySelector(".my_blog");
 const login_page = document.querySelector(".login");

 onAuthStateChanged(auth,(user)=>{
    if(user){
        my_blog.classList.add('show');
        login_page.classList.add('hide');
    }else{
        my_blog.classList.remove('show');
        login_page.classList.remove('hide');
    }
 })


 function SignInUser(){
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;
    signInWithEmailAndPassword(auth , email , password).then((userCerdinals)=>{
        console.log(userCerdinals.user.uid);
    })
  
 }


const Sign_btn = document.getElementById("sign_in");

Sign_btn.addEventListener('click', SignInUser); 
 


// Sign Out Logout

const sign_out_btn = document.getElementById("logout");

sign_out_btn.addEventListener('click', ()=>{
    signOut(auth).then(()=>{
        // 
    }).catch((error)=>{
        console.log("Error");
    })
})

// Blog Section Code
const notify = document.querySelector(".notifi");
const add_post_btn = document.getElementById("post_btn");


function Add_Post(){
  const title = document.getElementById("title").value;
  const  post_content = document.getElementById("post_content").value;
  const  id = Math.floor(Math.random()*100); 

  set(ref(db, "post/" + id),{
    title:title,
    post_content:post_content

  })
  notify.innerHTML = "Data Added";
    document.getElementById("title").value="";
    document.getElementById("post_content").value="";

}


add_post_btn.addEventListener('click', Add_Post);



// Get Data from firebase Db


function GetPostData(){
    const user_ref = ref(db,'post/')
    get(user_ref).then((snapshot)=>{
        const data = snapshot.val()
       
      let html = "";
        const table = document.querySelector('table')
    
        for (const key in data) {
            if (data.hasOwnProperty(key)) { // Optional: Ensure `key` is a direct property of `data`
                const {title, post_content} = data[key] 
                
            //    console.log(title);
                html+=
                 ` <tr>
                
                <td> <span class="postNumber"></span></td>
                <td>${title}</td>
                <td> <button class="delete" onclick="delete_data(${key})">Delete</button> </td>
                <td> <button class="update" onclick="update_data(${key})">Update</button> </td>
                
                </tr>
                
                `
            }
        }
        table.innerHTML = html;

GetPostData();

    })
}

GetPostData();


// Delete Data


window.delete_data = function(key){
    remove(ref(db, `post/${key}`))
    notify.innerHTML = "Data Deleted"
    GetPostData();

}
GetPostData();

// Get and Updated Data

window.update_data = function(key){
    const user_ref = ref(db, `post/${key}`)
  get(user_ref).then((item)=>{
    document.querySelector("#title").value = item.val().title;
    document.querySelector("#post_content").value = item.val().post_content;
 })

    const update_btn = document.querySelector(".update_btn");
    update_btn.classList.add("show");
    document.querySelector(".post_btn").classList.add("hide");

// Update
    function Update_form(){
        const title = document.getElementById("title").value;
        const  post_content = document.getElementById("post_content").value;

       update(ref((db),`post/${key}`),{
        title:title,
        post_content:post_content
       })
       
       GetPostData();
    //    notify.innerHTML = "Data Added";
    // document.getElementById("title").value="";
    // document.getElementById("post_content").value="";

    }


  
  
  
    update_btn.addEventListener('click', Update_form);
    notify.innerHTML = "Data Update";
    document.getElementById("title").value="";
    document.getElementById("post_content").value="";
}

























