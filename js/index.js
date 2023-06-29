// Get references to the form and search results section
const searchForm = document.getElementById('searchForm');
const searchResults = document.getElementById('searchResults');

// Event listener for form submission
searchForm.addEventListener('submit', function (e) {
  e.preventDefault(); // Prevent default form submission behavior

  // Get the value of the search input field
  const searchTerm = document.getElementById('searchInput').value;

  // Construct the GET request URL
  const url = `https://api.github.com/search/users?q=${searchTerm}`;

  // Include the custom header in the request
  const headers = {
    'Accept': 'application/vnd.github.v3+json'
  };

  // Send the GET request to the API
  fetch(url, { headers })
    .then(response => response.json())
    .then(data => {
      // Clear previous search results
      searchResults.innerHTML = '';

      // Display user information on the page
      data.items.forEach(user => {
        const userDiv = document.createElement('div');
        userDiv.innerHTML = `
          <h2>${user.login}</h2>
          <img src="${user.avatar_url}" alt="Avatar">
          <a href="${user.html_url}" target="_blank">View Profile</a>
        `;
        searchResults.appendChild(userDiv);
      });
    })
    .catch(error => {
      console.error('Error:', error);
    });
});
