// Listens for button clicks on the individual blogpost page. If the Save Comment button is clicked, sends a post route to the server with the comment field contents and blog_id.

const saveComment = async () => {

    const blog_id = document.querySelector('.save-button-row-container').getAttribute('data-blogpost-id');

    const payload = {
        comment: document.querySelector('.comment-entry').value,
        blog_id,
    };

    console.log(payload);

    try {
        const response = await fetch('/api/comment/save', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),

        });

        console.log(response);
        if (response.ok) {
            // refresh the blogpost page
            window.location.href = `/api/${blog_id}`;
        } else {
            console.log("Redirect error.");
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelector('#save-comment-button').addEventListener('click', saveComment);