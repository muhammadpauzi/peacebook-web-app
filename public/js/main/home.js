import { formCreatePost } from "./elements.js";
import { fetchData } from "./utils.js";

// init post editor with quill
const quill = new Quill("#post-editor", {
    theme: "snow",
});

formCreatePost.addEventListener("submit", async function (e) {
    e.preventDefault();
    // get content data/value
    const content = this.querySelector("#post-editor .ql-editor").innerHTML;
    const btnSend = this.querySelector("#button-send");
    const btnSendText = btnSend.querySelector(".text");

    try {
        btnSend.disabled = true;
        btnSendText.textContent = "Sending...";
        // send
        await sendCreatePost({ content });
        btnSendText.textContent = "Send";
        btnSend.disabled = false;
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
