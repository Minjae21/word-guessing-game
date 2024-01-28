const express = require('express');
const app = express();
const cors = require('cors');
const axios = require('axios');
const { randomBytes } = require('crypto');
const port = 3000;

app.use(cors());
app.use(express.json());

// Declaring variables
let userGuesses = [];
let correctGuesses = [];
let totalnum = 0;
let correctnum = 0;
let current_word = "";
let scrambled = "";
let user_word = "";

// Get all correct gesses list
app.get('/api/cor_guess', (req, res) => {
  res.json(correctGuesses);
});

// Get all user guesses list
app.get('/api/user_guess', (req, res) => {
  res.json(userGuesses);
});

// Get success rate
app.get('/api/success-rate', (req, res) => {
    res.json({num: Math.round(correctnum/totalnum*100)});
});

// Retrieving a random word from the API, then scrambling it
app.get('/api/random-word', async (req, res) => {
  try {
    const response = await axios.get('https://random-word-api.herokuapp.com/word');
    const randomWord = response.data[0];
    current_word = randomWord;
    res.json({ word: randomWord });
    let randword_arr = randomWord.split('');
    for (let i = randword_arr.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [randword_arr[i], randword_arr[j]] = [randword_arr[j], randword_arr[i]];
      }
    scrambled = randword_arr.join('');
    console.log(current_word);
  } catch (error) {
    console.error('Error fetching word from API:', error);
    res.status(500).json({ message: 'Error fetching word from API' });
  }
});


//Get the scrambled word--
app.get('/api/scrambledw', async (req, res) => {
  res.json({word:scrambled_word});
})

//Get the original word--
app.get('/api/current-word', async (req, res) => {
  res.json({word:current_word});
})

//Reset the history--
app.get('/api/reset', async (req, res) => {
  userGuesses = [];
  correctGuesses = [];
  totalnum = 0;
  correctnum = 0;
  res.json({ message: "Reset successful" });
})


// Check if the guess is correct or not--
app.post('/api/check-guess', (req, res) => {
  const { guess } = req.body;
  if (!guess) {
    return res.status(400).json({ message: 'A guess is required' });
  }
  user_word = guess;
  userGuesses.push(guess);
  correctGuesses.push(current_word);
  totalnum += 1;
  if (guess.toLowerCase() === current_word.toLowerCase()) {
    correctnum += 1;
    res.json({ message: 'Correct' });
  }else{
    res.json({ message: 'Incorrect' });
  }
});

//Logs the port
app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});