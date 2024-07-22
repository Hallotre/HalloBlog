import { isLoggedIn, loggedInAccess, hamburgerMenu } from './utils.js';
hamburgerMenu();

window.addEventListener("load", isLoggedIn);
window.addEventListener("load", loggedInAccess);

const editPostForm = document.getElementById("edit-post-form");

let params = new URL(document.location).searchParams;
let id = params.get("id");
let username = localStorage.getItem("username"); 


async function getEditPostInfo(){
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/${username}/${id}`;
        const response = await fetch(api);
        const data = await response.json();
        const postApi = data.data;
        editPostForm.title.value = postApi.title;
        editPostForm.content.value = postApi.body;
        editPostForm.img.value = postApi.media.url;
        editPostForm.alt.value = postApi.media.alt;
    } 
    catch{
        console.error("Error message: " + error)
        editPostForm.innerHTML = `No post found.`;
    }
}

getEditPostInfo();
editPostForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = editPostForm.title.value.trim();
    const content = editPostForm.content.value.trim();
    const  img = editPostForm.img.value.trim();
    const  alt = editPostForm.alt.value.trim();
    if (title && content && img && alt) {
        editPostToApi(title, content, img, alt);
    }
});

async function editPostToApi(title, content, img, alt){  
    try{
        let accessToken = localStorage.getItem("token");
        let username = localStorage.getItem("username"); 
        const options = {
            method: "PUT",
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json"
            },
            body: JSON.stringify({ 
                "title": title,
                "body": content,
                "media": {
                    "url": img,
                    "alt": alt
                } 
            }),
        };
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${id}`, options);

        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        window.location = "./mypage.html";
    } catch (error) {
        alert("Could not make post. Check URL and try again.")
        console.error("An error has occured:", error.message);
    }
    }