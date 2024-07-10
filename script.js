// Function to load the header and footer
function loadHTMLContent(id, file) {
    fetch(file)
        .then(response => response.text())
        .then(data => {
            document.getElementById(id).innerHTML = data;
        })
        .catch(error => console.log('Error loading the file:', error));
}

// Load header and footer
document.addEventListener("DOMContentLoaded", function() {
    loadHTMLContent('header', 'header.html');
    loadHTMLContent('footer', 'footer.html');

    // Fetch tags from JSON file
    fetch('data/tags.json')
        .then(response => response.json())
        .then(tags => {
            const postContainer = document.getElementById('post-container');
            const tagDropdown = document.getElementById('tag-dropdown');

            // Populate the tag dropdown menu
            tags.forEach(tag => {
                const option = document.createElement('option');
                option.value = tag.id;
                option.textContent = tag.name;
                tagDropdown.appendChild(option);
            });

            // Handle tag dropdown change event
            tagDropdown.addEventListener('change', () => {
                const selectedTagId = parseInt(tagDropdown.value);

                // Clear existing post container
                postContainer.innerHTML = '';

                // Fetch blog posts for the selected tag
                fetch('data/blog-posts.json')
                    .then(response => response.json())
                    .then(posts => {
                        const tagPosts = posts.filter(post => post.tagId === selectedTagId);

                        // Display blog posts for the selected tag
                        tagPosts.forEach(post => {
                            const postElement = document.createElement('div');
                            postElement.classList.add('card');
                            postElement.innerHTML = `
                                <div class="card-header">
                                    <h5>${post.title}</h5>
                                </div>
                                <div class="card-body">
                                    <div class="vertical-line"></div>
                                    ${post.entries.map(entry => `
                                        <div class="entry">
                                            <p class="entry-date">${entry.date}</p>
                                            <h6 class="entry-subheading">${entry.subheading}</h6>
                                            <p class="entry-content">${entry.content.slice(0, 400)}...</p>
                                            <a href="blog-post.html?id=${post.id}" class="read-more">Read More</a>
                                        </div>
                                    `).join('')}
                                </div>
                            `;
                            postContainer.appendChild(postElement);
                        });
                    });
            });

            // Initial rendering of blog posts for the first tag
            const initialTagId = tags[0].id;
            tagDropdown.value = initialTagId;
            tagDropdown.dispatchEvent(new Event('change'));
        });
});
