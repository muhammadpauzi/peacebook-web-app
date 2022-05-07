import {
    getPlaceholderPostCardComponent,
    getPostCardComponent,
} from "./components.js";
import { formCreatePost, groupPosts } from "./elements.js";
import { fetchData } from "./utils.js";

// init post editor with quill
const quill = new Quill("#post-editor", {
    theme: "snow",
});

async function getMyPosts() {
    return await fetchData({
        url: "/api/posts",
    });
}
async function displayMyPosts() {
    // show/loading or placeholder
    groupPosts.innerHTML = Array.from(Array(5).keys())
        .map((_) => {
            return getPlaceholderPostCardComponent();
        })
        .join("");

    getMyPosts().then(({ data }) => {
        const { data: posts } = data;
        let postCards = "";
        posts.forEach((post) => {
            postCards += getPostCardComponent(post);
        });
        groupPosts.innerHTML = postCards;
    });
}

formCreatePost.addEventListener("submit", async function (e) {
    e.preventDefault();
    // get content data/value
    const content = this.querySelector("#post-editor .ql-editor");
    const btnSend = this.querySelector("#button-send");
    const btnSendText = btnSend.querySelector(".text");

    try {
        btnSend.disabled = true;
        btnSendText.textContent = "Sending...";
        // send
        await sendCreatePost({ content: content.innerHTML });
        // reset
        btnSendText.textContent = "Send";
        btnSend.disabled = false;
        content.innerHTML = "";
        displayMyPosts();
        // show toast
        Toastify({
            text: "Post has been successfully created!",
            className: "toastify-success",
        }).showToast();
    } catch (error) {}
});
async function sendCreatePost(data) {
    return await fetchData({
        url: "/api/posts",
        options: {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        },
    });
}

displayMyPosts();
