// ***DELETE COMMENT***
// Listens for button clicks on a delete comment confirmation page. If a Delete Comment button is clicked, sends a delete comment to the server with the associated comment id as the parameter.

const deleteComment = async (event) => {

    let commentId;
    let blog_id;
    
    if (event.target.classList.contains('delete-comment-button')) {
    commentId = event.target.getAttribute('data-comment-id');
    blog_id = event.target.getAttribute('data-blog-id');
    }
    console.log(commentId);
    console.log(blog_id);

    try {
        const response = await fetch(`/api/comment/delete/${commentId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        console.log(response);
        if (response.status == 200) {
            // refresh the blogpost page
            window.location.href = `/api/${blog_id}`;
        } else {
            console.log("Delete error.");
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelector('.comment-container').addEventListener('click', deleteComment);