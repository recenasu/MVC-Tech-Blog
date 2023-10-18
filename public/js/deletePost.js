// ***DELETE POST***
// Listens for button clicks on the delete post confirmation page. If the Delete Post button is clicked, sends a delete route to the server with the blogpost id as the parameter.

const deletePost = async () => {

    const blogpostId = document.querySelector('.delete-post-button').getAttribute('data-blogpost-id');

    console.log(blogpostId);

    try {
        const response = await fetch(`/api/post/delete/${blogpostId}`, {
            method: 'DELETE',
            headers: {
                'Content-Type': 'application/json',
            },

        });

        console.log(response);
        if (response.status == 200) {
            // refresh the dashboard
            window.location.href = '/dashboard';
        } else {
            console.log("Delete error.");
        }
    } catch (error) {
        console.log(error);
    }
};

document.querySelector('.delete-post-button').addEventListener('click', deletePost);