// ***SAVE POST***
// Listens for button clicks on the new post page. If the Save Post button is clicked, sends a post route to the server with the title, post, and emoji data.

const savePost = async () => {

    const payload = {
        title: document.querySelector('.post-title-entry').value,
        blog_content: document.querySelector('.comment-entry').value,
        emoji: document.querySelector('#post-emoji').getAttribute('data-post-emoji'),
    };

    console.log(payload);

    try {
        const response = await fetch('/api/newpost/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),

        });

        if (response.ok) {
            // refresh the dashboard
            window.location.href = "/dashboard";
        } else {
            console.log("Redirect error.");
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelector('#save-comment-button').addEventListener('click', savePost);
