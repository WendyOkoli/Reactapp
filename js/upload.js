// upload.js

// Get form and status elements
const form = document.getElementById('uploadForm');
const status = document.getElementById('status');

// Add event listener to the form submission
form.addEventListener('submit', async (event) => {
  event.preventDefault();  // Prevent the default form submission
  
  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];
  
  if (!file) {
    status.textContent = 'Please choose a file before uploading.';
    return;
  }

  const formData = new FormData();
  formData.append('file', file);

  try {
    // Send the file using fetch
    const response = await fetch('/upload', {
      method: 'POST',
      body: formData
    });

    if (response.ok) {
      status.textContent = 'File uploaded successfully!';
    } else {
      status.textContent = 'File upload failed.';
    }
  } catch (error) {
    console.error('Error:', error);
    status.textContent = 'An error occurred during the upload.';
  }
});                  
