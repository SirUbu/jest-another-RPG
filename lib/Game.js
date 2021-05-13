// require dependencies
const inquirer = require('inquirer');
const Enemy = require('./Enemy');
const Player = require('./Player');

// object constructor for a new Game
function Game() {
    this.roundNumber = 0;
    this.isPlayerTurn = false;
    this.enemies = [];
    this.currentEnemy;
    this.player;
};

// adds initial game properties
Game.prototype.initializeGame = function() {
    // adds new enemies
    this.enemies.push(new Enemy('goblin', 'sword'));
    this.enemies.push(new Enemy('orc', 'baseball bat'));
    this.enemies.push(new Enemy('skeleton', 'axe'));

    // assigns current enemy
    this.currentEnemy = this.enemies[0];

    // prompt user to generate Player
    inquirer
        .prompt({
            type: 'test',
            name: 'name',
            message: 'What is your name?'
        })
        // de-structure name from the prompt object
        .then(({ name }) => {
            this.player = new Player(name);

            this.startNewBattle();
        });

};

// exports Game object
module.exports = Game;