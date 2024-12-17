const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(bodyParser.json());

// Voting data storage (simple object to hold votes)
let votes = { Bitcoin: 0, Ethereum: 0, XRP: 0 };

// POST route to handle voting
app.post('/vote', (req, res) => {
  const { crypto } = req.body;
  if (votes[crypto] !== undefined) {
    votes[crypto]++;
    res.status(200).json({ message: 'Vote recorded', results: votes });
  } else {
    res.status(400).json({ message: 'Invalid cryptocurrency' });
  }
});

// GET route to fetch the voting results
app.get('/results', (req, res) => {
  res.status(200).json({ results: votes });
});

// Start server
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
