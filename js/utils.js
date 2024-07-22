export let isLoggedIn = () => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
    let loggedInOut = document.getElementById("logged-in-out");
    let logOutBtn = document.getElementById("log-out-btn-cont")

    if (token && username) {
        if(window.location.pathname.includes("/index.html") || window.location.pathname === "/HalloBlog/" || window.location.pathname == "/HalloBlog"){
            loggedInOut.innerHTML = `<a href="./account/mypage.html">My page</a>`;
        } else{
        loggedInOut.innerHTML = `<a href="../account/mypage.html">My page</a>`;
        }

        logOutBtn.innerHTML = `<button id="logout">Log out</button>`;
        logOutBtn.style.display = "block";
        document.querySelector("button#logout").addEventListener("click", () => {
            localStorage.removeItem("username");
            localStorage.removeItem("token");

            if(window.location.pathname.includes("/index.html") || window.location.pathname === "/HalloBlog/" || window.location.pathname == "/HalloBlog"){
                window.location = "./index.html";
            }else{
            window.location = "../index.html";
            }
        });
    } else {
        if(window.location.pathname.includes("/index.html") || window.location.pathname === "/HalloBlog/" || window.location.pathname == "/HalloBlog"){
        loggedInOut.innerHTML = `<a href="./account/login.html">Sign in</a>`;
        } else{
            loggedInOut.innerHTML = `<a href="../account/login.html">Sign in</a>`
        }
    }
}

export const loggedInAccess = () => {
    let token = localStorage.getItem("token");
    let username = localStorage.getItem("username"); 
if (!token && !username){
    window.location = "../account/login.html"; 
}
}

export function hamburgerMenu() {
    const hamburger = document.querySelector(".hamburger");
    const navMenu = document.querySelector(".nav-menu");
    
    hamburger.addEventListener("click", mobileMenu);
    
    function mobileMenu() {
        hamburger.classList.toggle("active");
        navMenu.classList.toggle("active");
    }

    const navLink = document.querySelectorAll(".nav-link");

    navLink.forEach(n => n.addEventListener("click", closeMenu));

    function closeMenu() {
    hamburger.classList.remove("active");
    navMenu.classList.remove("active");
    }

}