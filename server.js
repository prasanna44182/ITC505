const express = require('express');
const logger = require('morgan');
const path = require('path');
const server = express();

server.use(express.urlencoded({ extended: true })); // Parse POST data
server.use(logger('dev'));

// Serve static files
const publicServedFilesPath = path.join(__dirname, 'public');
server.use(express.static(publicServedFilesPath));

// Route to generate a random number
server.get('/do_a_random', (req, res) => {
  const randomNumber = Math.floor(Math.random() * 100) + 1;
  res.send(`Your random number is: ${randomNumber}`);
});

// POST route for handling Mad Lib form submission
server.post('/submit', (req, res) => {
  const { noun, adjective, verb, pluralNoun, place } = req.body;

  // Validation to ensure all fields are filled
  if (!noun || !adjective || !verb || !pluralNoun || !place) {
    res.send(`
      <h1>Submission Failed</h1>
      <p>Please fill out ALL fields.</p>
      <a href="/">Go Back to Form</a>
    `);
    return;
  }

  // Generate the Mad Lib story
  const madLib = `
    Once upon a time in <strong>${place}</strong>, a <strong>${adjective}</strong> <strong>${noun}</strong>
    loved to <strong>${verb}</strong> with a group of <strong>${pluralNoun}</strong>.
  `;

  // Send the response
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Mad Lib Result</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <h1>Mad Lib Story</h1>
      <p>${madLib}</p>
      <a href="/">Create Another Mad Lib</a>
    </body>
    </html>
  `);
});

// Set the server port
let port = 8081;
if (process.argv[2] === 'local') {
  port = 8082;
}
server.listen(port, () => console.log(`Ready on http://localhost:${port}`));
