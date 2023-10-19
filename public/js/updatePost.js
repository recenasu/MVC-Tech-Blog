// ***UPDATE POST***
// Listens for button clicks on the update post page. If the Update Post button is clicked, sends a put route to the server with the title, post, and emoji data.

const updatePost = async () => {

const blog_id = document.querySelector('#blogpost-id').getAttribute('data-blogpost-id');

    const payload = {
        title: document.querySelector('#blog-post-title').value,
        blog_content: document.querySelector('#blog-post-content').value,
    };

    console.log(payload);

    try {
        const response = await fetch(`/api/post/update/save/${blog_id}`, {
            method: 'PUT',
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

document.querySelector('#update-post-button').addEventListener('click', updatePost);
