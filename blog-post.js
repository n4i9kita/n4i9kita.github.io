// Get the post ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const postId = urlParams.get('id');

// Fetch the blog post data based on the post ID
fetch('data/blog-posts.json')
    .then(response => response.json())
    .then(posts => {
        const post = posts.find(post => post.id === parseInt(postId));

        if (post) {
            document.getElementById('post-title').textContent = post.title;

            const postEntriesContainer = document.getElementById('post-entries');

            post.entries.forEach(entry => {
                const entryElement = document.createElement('div');
                entryElement.classList.add('entry');
                entryElement.innerHTML = `
                    <p class="entry-date">${entry.date}</p>
                    <h3 class="entry-subheading">${entry.subheading}</h3>
                    <p class="entry-content">${entry.content}</p>
                    <hr>
                `;
                postEntriesContainer.appendChild(entryElement);
            });
        } else {
            document.getElementById('post-title').textContent = 'Post not found';
        }
    });
