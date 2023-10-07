// const { User } = require("../../models");

const handleUpdatePostBtn = async (e) => {
    e.preventDefault();

    console.log("***** in update post ******");
    // get the title
    const blogTitle = document.getElementById('inputPostTitle');
    const blogBody = document.getElementById('inputPostBody');
    const postId = document.getElementById('postId');
    console.log(blogTitle.value + " " +blogBody.value + " " + postId.value);

    try {
        // create post body and post
        const addedPost = await fetch('/api/updatePost', {
            method: 'POST',
            body: JSON.stringify({
                posttitle: blogTitle.value,
                postbody: blogBody.value,
                post_id: postId.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        // document.location.replace('/dashboard');

    } catch (err) {
        console.log(err);
        alert("Error posting comment");
    }
}

document.querySelector('.updatePostBtn').addEventListener('click', handleUpdatePostBtn);