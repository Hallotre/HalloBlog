import { isLoggedIn, loggedInAccess, hamburgerMenu } from './utils.js';
hamburgerMenu();

window.addEventListener("load", isLoggedIn);
window.addEventListener("load", loggedInAccess);

let username = localStorage.getItem("username"); 
let postOverviewCont = document.getElementById("posts-overview")

function setH1(username){
    let myPageH1 = document.getElementById("my-page-h1");
    myPageH1.innerText = `Welcome ${username}`.toUpperCase();
}
setH1(username);

async function findPostsFromApi() {
    try{
        const api = `https://v2.api.noroff.dev/blog/posts/${username}/`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const postsApi = data.data;
        listPostsMyPage(postsApi)

    } catch (error){
        console.error("Error message: " + error)
        postOverviewCont.innerHTML = `<p>No posts found.</p>`
    }
}

findPostsFromApi();

function listPostsMyPage(api) {
    postOverviewCont.innerHTML = "";
    let postContainer = "";
    for (let post of api) {
      postContainer += `
      <div class="single-post-overview">
        <div class="single-post-img-text">
            <img class="posts-overview-img" src="${post.media.url}" alt="${post.media.alt}">
            <h3>${post.title}</h3>
        </div>
        <div class="single-post-edit-delete">
            <a href="./editpost.html?id=${post.id}">Edit</a>
            <button id="${post.id}">Delete</button>
        </div>    
    </div>`;
    }
    postOverviewCont.innerHTML = postContainer;

    api.forEach((item) => {
        addEventListenerDeletePost(item.id);
      });
    }
 


function addEventListenerDeletePost(id) {
    let slett = document.getElementById(id);
    slett.addEventListener("click", () => {
        const isConfirmed = confirm("Are you sure you want to delete this post?");
        if (isConfirmed) {
            deletePostsFromApi(id);
        }
    });
}

  async function deletePostsFromApi(id){  
    try{
        let accessToken = localStorage.getItem("token");
        let username = localStorage.getItem("username"); 
        const options = {
            method: "Delete",
            headers: {
                Authorization: `Bearer ${accessToken}`, 
                "Content-Type": "application/json"
            },
        };
        
        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/${id}/`, options);
        window.location.reload();
    }
    catch (error){
        console.log(error.message);
        throw new Error(response.statusText);
        
    }
    }