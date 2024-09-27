import { isLoggedIn, hamburgerMenu } from './utils.js';

window.addEventListener("load", isLoggedIn);

hamburgerMenu();

let slideshowCont = document.getElementById("slideshow-cont");

async function getPostsToIndex() {
    try {
        const username = "Hallotre"; // Hardcoded username so everyone can see posts when visiting the site
        const api = `https://v2.api.noroff.dev/blog/posts/${username}/`;
        const response = await fetch(api);
        if (!response.ok) throw new Error(`HTTP error! ${response.status}`);
        const data = await response.json();
        const indexApi = data.data;
        setSlides(indexApi);
        runSlider();
        listNewposts(indexApi);
    } catch (error) {
        console.error("Error message: " + error);
        slideshowCont.innerHTML = `<p>No slides found.</p>`;
    }
}

getPostsToIndex();

function setSlides(api) {
    slideshowCont.innerHTML = "";
    let container = "";
    for (let i = 0; i < 3; i++) {
        container += `
            <div class="single-slide">
                <img class="slider-img" src="${api[i].media.url}" alt="${api[i].media.alt}">
                <div class="single-slide-info-cont">
                    <h2>${api[i].title}</h2>
                    <a class="cta-button" href="./post/singlepost.html?id=${api[i].id}">Read more</a>
                </div>
            </div>`;
    }
    slideshowCont.innerHTML = container;
}

let slideIndex = 0;
let intervalId = null;
let allSlides = [];

function runSlider() {
    allSlides = document.getElementsByClassName("single-slide");
    initializeSlider();
}

function initializeSlider() {
    if (allSlides.length > 0) {
        allSlides[slideIndex].classList.add("display-slide");
        intervalId = setInterval(nextSlide, 5000);
    } else {
        console.error("No posts found.");
    }
}

const next = document.querySelector(".next");
const prev = document.querySelector(".prev");

function nextSlide() {
    slideIndex++;
    showSlide();
}

next.addEventListener("click", () => {
    slideIndex++;
    showSlide();
});

prev.addEventListener("click", () => {
    slideIndex--;
    showSlide();
});

function showSlide() {
    Array.from(allSlides).forEach(slide => {
        slide.classList.remove("display-slide");
    });
    if (slideIndex >= allSlides.length) {
        slideIndex = 0;
    } else if (slideIndex < 0) {
        slideIndex = allSlides.length - 1;
    }
    allSlides[slideIndex].classList.add("display-slide");
}

slideshowCont.addEventListener("mouseover", function() {
    clearInterval(intervalId);
});

slideshowCont.addEventListener("mouseout", function() {
    intervalId = setInterval(nextSlide, 5000);
});

let newPostCont = document.getElementById("new-posts-cont");

function listNewposts(api) {
    newPostCont.innerHTML = '';
    let postsToShow = api.length < 9 ? api : api.slice(3, 9);
    postsToShow.forEach(post => {
        let body = post.body.slice(0, 120);
        let postHTML = `<a href="./post/singlepost.html?id=${post.id}" class="single-post">
            <img class="single-post-img" src="${post.media.url}" alt="${post.media.alt}">
            <h2>${post.title}</h2>
            <p>${body}...</p>
        </a>`;
        newPostCont.innerHTML += postHTML;
    });
}