import { isLoggedIn, hamburgerMenu } from './utils.js';

hamburgerMenu();

window.addEventListener("load", isLoggedIn);

let allPostsCont = document.getElementById("all-posts");

async function getAllPosts() {
    try {
        const username = "Hallotre"; // Hardcoded username so everyone can see posts when visiting the site
        const api = `https://v2.api.noroff.dev/blog/posts/${username}/`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const postsApi = data.data;
        listAllposts(postsApi);
    } catch (error) {
        console.error("Error message: " + error);
        allPostsCont.innerHTML = `<p>No posts found.</p>`;
    }
}

getAllPosts();

function listAllposts(api) {
    allPostsCont.innerHTML = "";
    let cont = "";
    for (let post of api) {
        cont += `
        <a class="single-post" href="./singlepost.html?id=${post.id}">
            <img class="single-post-img" src="${post.media.url}" alt="${post.media.alt}">
            <h2 class="single-post-title">${post.title}</h2>
        </a>`;
    }
    allPostsCont.innerHTML = cont;
}