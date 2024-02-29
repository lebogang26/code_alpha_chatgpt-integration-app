const express = require('express');
const http = require('http');
const WebSocket = require('ws');
const { request, gql } = require('graphql-request');

const app = express();
const server = http.createServer(app);
const wss = new WebSocket.Server({ server });

// WebSocket connection handler
wss.on('connection', (ws) => {
  // Message received from client
  ws.on('message', async (message) => {
    try {
      const response = await getChatGPTResponse(message);
      ws.send(response);
    } catch (error) {
      console.error(error);
      ws.send('Error processing your request');
    }
  });
});

// Function to get ChatGPT response
async function getChatGPTResponse(message) {
  // Call OpenAI API to get response
  const query = gql`
    query GetChatGPTResponse($message: String!) {
      chatGPTResponse(message: $message)
    })
  `;

  const variables = {
    message: message,
  };

  const data = await request(`https://api.openai.com/v1/graphql`, query, variables, {
    headers: {
      Authorization: 'Bearer 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',
    },
  });

  return data.chatGPTResponse;
}

// Start server
const PORT = process.env.PORT || 8080;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
