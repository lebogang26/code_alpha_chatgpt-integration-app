// WebSocket connection
const socket = new WebSocket('ws://127.0.0.1:8080');

// Chatbox element
const chatbox = document.getElementById('chatbox');

// User input element
const userInput = document.getElementById('userInput');

// Send button element
const sendButton = document.getElementById('sendButton');

// Event listener for send button click
sendButton.addEventListener('click', () => {
  sendMessage();
});

// Event listener for pressing Enter key in the input field
userInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') {
    sendMessage();
  }
});

// Function to send message
function sendMessage() {
  const message = userInput.value;
  if (message.trim() === '') return; // Don't send empty messages
  appendMessage(`You: ${message}`);
  userInput.value = '';
  // Send message to server via WebSocket
  socket.send(message);
}

// Function to append message to chatbox
function appendMessage(message) {
  const messageElement = document.createElement('div');
  messageElement.textContent = message;
  chatbox.appendChild(messageElement);
}

// Event listener for WebSocket message
socket.addEventListener('message', (event) => {
  const message = event.data;
  appendMessage(`ChatGPT: ${message}`);
});
