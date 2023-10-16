// Listens for button clicks on the individual blogpost page. If the Add Comment button is clicked, sends a get route to the server for the Add Comment template.

const saveComment = async () => {

    const blogpostId = document.querySelector('.save-button-row-container').getAttribute('data-blogpost-id');

    const payload = {
        comment: document.querySelector('.comment-entry').value,
        blog_id: blogpostId,
        }

        console.log(payload);

        await fetch('/api/savecomment', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    })
};

document.querySelector('#save-comment-button').addEventListener('click', saveComment);