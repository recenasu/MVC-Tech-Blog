// Listens for button clicks on the individual blogpost page. If the Add Comment button is clicked, sends a get route to the server for the Add Comment template.

const addComment = async (event) => {

    if (event.target.classList.contains('add-comment-button')) {
        const blogpostId = event.target.getAttribute('data-blogpost-id')

        const payload = {
            id: blogpostId,
        }

        await fetch('api/comment', {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
        })
        .catch (error => {
            console.log(error);
        })
    
    }
};

document.querySelector('.add-comment-button').addEventListener('click', addComment);