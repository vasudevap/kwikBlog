const handleNewPostBtn = async (e) => {
    e.preventDefault();

    // load the new post route
    document.location.replace('/addPost');
}

document.querySelector('.newPostBtn').addEventListener('click', handleNewPostBtn);