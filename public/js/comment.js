const handleComment = (e) => {
    e.preventDefault();

    const comment = document.querySelector('#inputComment').value.trim();

    console.log(comment);
}
document.querySelector('.commentForm').addEventListener('submit', handleComment);