# Word_guessing_game
Author: Minjae Jang
Email: csjae21@gmail.com


How to use the website:
    First, installations to run the backend node_server_game.js:
        npm install express
        npm install cors
        npm install axios
        npm install crypto

    Then to run the backend node_server_game.js:
        -open the terminal
        -cd into the correct directory
        -call "node node_server_game.js"

    Then opening word-guessing.html in the browser to start playing


Brief reflection of the code:
    This game features a dynamic title that changes color throughout the gameplay. It begins with a rules page to guide players.
    During the game, the game retrieves a random word and its scrambled version from a node.js server via an API ('https://random-word-api.herokuapp.com/word'). 
    The hint button accesses the server to reveal the correct word's first half and displays the remaining letters in the scrambled word, aiding users in guessing.
    Once a user inputs a guess, the guess button sends the guess to the server for evaluation - the server then displays whether the guess is correct or not and maintains a history of guesses.
    Upon completing a game, players can view statistics detailing actual words, user guesses ,and accuracy. The reset button clears the guess history and hides the stats display.