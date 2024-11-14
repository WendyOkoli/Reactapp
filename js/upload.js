// upload.js

const form = document.getElementById('uploadForm');
const status = document.getElementById('status');

form.addEventListener('submit', async (event) => {
  event.preventDefault();

  const fileInput = document.getElementById('file');
  const file = fileInput.files[0];
  
  if (!file) {
    status.textContent = 'Please choose a file before uploading.';
    return;
  }

  // Convert the file to Base64
  const base64File = await toBase64(file);

  try {
    // Make the POST request to API Gateway
    const response = await fetch('https://5t4decxn0a.execute-api.us-east-1.amazonaws.com/stage' {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'file-name': file.name // Pass the file name as a header
      },
      body: JSON.stringify({ fileContent: base64File.split(',')[1] })
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

// Helper function to convert file to Base64
function toBase64(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result);
    reader.onerror = (error) => reject(error);
  });
}
