const handleAddNewPostBtn = async (e) => {
    e.preventDefault();

    // get the title
    const blogTitle = document.getElementById('inputPostTitle');
    const blogBody = document.getElementById('inputPostBody');
    const userId = document.getElementById('userId');

    try {
        // create post body and post
        const addedPost = await fetch('/api/addPost', {
            method: 'POST',
            body: JSON.stringify({
                posttitle: blogTitle.value,
                postbody: blogBody.value,
                user_id: userId.value,
            }),
            headers: { 'Content-Type': 'application/json' },
        });

        document.location.replace('/dashboard');

    } catch (err) {
        console.log(err);
        alert("Error posting comment");
    }
}

document.querySelector('.addPostBtn').addEventListener('click', handleAddNewPostBtn);