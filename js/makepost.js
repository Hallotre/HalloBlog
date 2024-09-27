import { isLoggedIn, loggedInAccess, hamburgerMenu } from './utils.js';


hamburgerMenu();

window.addEventListener("load", isLoggedIn);
window.addEventListener("load", loggedInAccess);


const addPostForm = document.getElementById("add-post-form");

addPostForm.addEventListener("submit", (event) => {
    event.preventDefault();
    const title = addPostForm.title.value.trim();
    const content = addPostForm.content.value.trim();
    const img = addPostForm.img.value.trim();
    const alt = addPostForm.alt.value.trim();
    if (title && content) {
        addPostToApi(title, content, img, alt);
    }
});

async function addPostToApi(title, content, img, alt) {
    try {
        let accessToken = localStorage.getItem("token");
        let username = "Hallotre"; // Hardcoded username

        // Validate content length
        const maxLength = 8000; // Assuming the max length is 10000 characters
        if (content.length > maxLength) {
            throw new Error(`Content length exceeds the maximum allowed length of ${maxLength} characters.`);
        }

        // Validate image URL
        if (img && !isValidUrl(img)) {
            throw new Error("Invalid image URL");
        }

        const options = {
            method: "POST",
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

        // console.log("Sending request to API with options:", options);

        const response = await fetch(`https://v2.api.noroff.dev/blog/posts/${username}/`, options);

        if (!response.ok) {
            const errorData = await response.json();
            // console.error("Error response from API:", errorData);
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();
        window.location = "./mypage.html";
    } catch (error) {
        alert("Could not make post. Check URL and try again.");
        // console.error("An error has occurred:", error.message);
    }
}

function isValidUrl(string) {
    try {
        new URL(string);
        return true;
    } catch (_) {
        return false;
    }
}

