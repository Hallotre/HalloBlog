import { hamburgerMenu } from './utils.js';

hamburgerMenu();


const alreadyLoggedIn = () => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
if (token && username){
    window.location = "./mypage.html"; 
}
}

alreadyLoggedIn();

const loginForm = document.getElementById("login-form");

loginForm.addEventListener("submit", (event) => {
    event.preventDefault();
   
    const email = loginForm.email.value.trim();
    const password = loginForm.password.value.trim()
    if (email && password) {
        getToken(email, password)
    }
});


async function getToken(email, password) {
    try {
       
        const options = {
            method: "post",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ email, password }),
        };
        const response = await fetch(`https://v2.api.noroff.dev/auth/login/`, options); 
        if (response.ok){
            const data = await response.json();
            localStorage.setItem("username", data.data.name);
            localStorage.setItem("token", data.data.accessToken);
            window.location = "./mypage.html";
        } else {
            
            throw new Error(response.statusText);
            
        }
    } catch (error) {
        console.error(error.message);

        const wrong = document.getElementById("wrong");
        wrong.innerText = "";
        wrong.innerText = "Email or password is incorrect. Please try again.";
    }
}



