import { isLoggedIn, hamburgerMenu } from './utils.js';

hamburgerMenu();

window.addEventListener("load", isLoggedIn);

let mainSinglePost = document.getElementById("main-single-post");

let params = new URL(document.location).searchParams;
let id = params.get("id");

async function getSinglePost() {
    try {
        let username = localStorage.getItem("username");
        if (!username) {
            throw new Error("Username not found in localStorage");
        }
        const api = `https://v2.api.noroff.dev/blog/posts/${username}/${id}`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const postApi = data.data;

        document.title = "HalloBlog | " + postApi.title;

        let longDate = postApi.created;
        let shortDate = longDate.slice(0, 10);
        let splitDate = shortDate.split('-');
        let date = splitDate[2] + '-' + splitDate[1] + '-' + splitDate[0];
        mainSinglePost.innerHTML = `
        <div>
            <img src="${postApi.media.url}" alt="${postApi.media.alt}">
            <div class="single-post-info">
            <p>Author: ${postApi.author.name}</p>
            <p>Published: ${postApi.created.slice(0, 10)}</p>
            <p>Edited: ${postApi.updated.slice(0, 10)}</p>
            </div>
            <h1>${postApi.title}</h1>
            <p>${postApi.body}</p>
        </div>
        `;
    } catch (error) {
        console.error("Error message: " + error);
        mainSinglePost.innerHTML = `<p>Can't find post</p>`;
    }
}

getSinglePost();

