const handleComment = async (e) => {
    e.preventDefault();

    const comment = document.querySelector('#inputComment').value.trim();
    const blogpostId = document.querySelector('#postId').value.trim();
    const userId = document.querySelector('#userId').value.trim();

    const addedComment = await fetch('/api/comment', {
        method: 'POST',
        body: JSON.stringify({ 
            commentbody: comment, 
            blogpost_id: blogpostId,
            user_id: userId,
         }),
        headers: { 'Content-Type': 'application/json' },
    })

    console.log(addedComment);
}

document.querySelector('.commentForm').addEventListener('submit', handleComment);