const newPostButton = document.getElementById("new-post");
const postList = document.getElementById("post-list");
const postForm = document.getElementById("post-form");
const cancelButton = document.getElementById("cancel");
const form = postForm.querySelector("form");

// Add event listeners
newPostButton.addEventListener("click", () => {
	postForm.classList.remove("hidden");
});

cancelButton.addEventListener("click", () => {
	form.reset();
	postForm.classList.add("hidden");
});

form.addEventListener("submit", (event) => {
	event.preventDefault();
	
	// Get the form values
	const title = form.title.value;
	const author = form.author.value;
	const content = form.content.value;
	const postDate = new Date().toLocaleDateString();
	
	// Create a new post object
	const post = {
		title,
		author,
		content,
		postDate
	};
	
	// Save the post in the local storage
	let posts = JSON.parse(localStorage.getItem("posts")) || [];
	posts.push(post);
	localStorage.setItem("posts", JSON.stringify(posts));
	
	// Add the post to the post list
	addPostToDOM(post);
	
	// Reset the form and hide it
	form.reset();
	postForm.classList.add("hidden");
});

postList.addEventListener("click", (event) => {
	if (event.target.classList.contains("delete-button")) {
		// Get the index of the post in the array
		const index = event.target.dataset.index;
		
		// Remove the post from the local storage
		let posts = JSON.parse(localStorage.getItem("posts")) || [];
		posts.splice(index, 1);
		localStorage.setItem("posts", JSON.stringify(posts));
		
		// Remove the post from the DOM
		event.target.parentElement.remove();
	}
});

// Helper function to add a post to the post list
function addPostToDOM(post) {
	const postElement = document.createElement("div");
	postElement.classList.add("post");


    postElement.innerHTML = `<h3> ${post.title} </h3> <br> 
                             <p>${post.content}</p> <br>
                             <p class="author">By ${post.author} on ${post.postDate}</p>
                             <button class='delete-button' data-index=${postList.children.length - 1}>Delete</button>`

	postList.appendChild(postElement);
}

// Initialize the blog with the posts saved in the local storage
let posts = JSON.parse(localStorage.getItem("posts")) || [];
posts.forEach(post => addPostToDOM(post));
