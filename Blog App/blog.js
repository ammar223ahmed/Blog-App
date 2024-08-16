import { initializeApp } from "https://www.gstatic.com/firebasejs/10.13.0/firebase-app.js";
        import {
             getDatabase,
             set,
             ref,
             get,

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

const db = getDatabase(app);


function GetPostData(){
    const user_ref = ref(db,'post/')
    get(user_ref).then((snapshot)=>{
        const data = snapshot.val()
       
      let html = "";
        const table = document.querySelector('.main')
    
        for (const key in data) {
            if (data.hasOwnProperty(key)) { // Optional: Ensure `key` is a direct property of `data`
                const {title, post_content} = data[key] 
                
            //    console.log(title);
                html+=
                 ` 
                <div class="post">
                    <h2>${title}</h2>
                    <p>${post_content}</p>
                </div>    
                `
            }
        }
        table.innerHTML = html;

GetPostData();

    })
}

GetPostData();