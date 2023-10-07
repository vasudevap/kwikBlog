// const { User } = require("../../models");

const handleUpdatePostBtn = async (e) => {
    e.preventDefault();

    // get the title
    const blogTitle = document.getElementById('inputPostTitle');
    const blogBody = document.getElementById('inputPostBody');
    const postId = document.getElementById('postId');

    try {
        // create post body and post
        const addedPost = await fetch('/api/updatePost', {
            method: 'PUT',
            body: JSON.stringify({
                posttitle: blogTitle.value,
                postbody: blogBody.value,
                post_id: postId.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/dashboard');

    } catch (err) {
        console.log(err);
        alert("Error posting comment");
    }
}

const handleDeletePostBtn = async (e) => {
    e.preventDefault();

    // get the title
    const postId = document.getElementById('postId');

    try {
        // create post body and post
        const deletedPost = await fetch('/api/updatePost', {
            method: 'DELETE',
            body: JSON.stringify({
                post_id: postId.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/dashboard');

    } catch (err) {
        console.log(err);
        alert("Error posting comment");
    }
}
document.querySelector('.updatePostBtn').addEventListener('click', handleUpdatePostBtn);
document.querySelector('.deletePostBtn').addEventListener('click', handleDeletePostBtn);