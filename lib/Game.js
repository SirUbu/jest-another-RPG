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

// adds initial game properties and then starts a new battle
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

// handles new battle logic
Game.prototype.startNewBattle = function() {
    // determines based on agility if player or enemy gets to attack first
    if (this.player.agility > this.currentEnemy.agility) {
        this.isPlayerTurn = true;
    } else {
        this.isPlayerTurn = false;
    }

    // console logs player stats and enemy description
    console.log('Your stats are as follows:');
    console.table(this.player.getStats());
    console.log(this.currentEnemy.getDescription());

    // runs the battle prototype
    this.battle();
};

Game.prototype.battle = function() {
    // if Player turn
    if (this.isPlayerTurn) {
        // prompt user to attack or use a Potion

        // if using Potion
            // display list of Potion objects for user

            // apply selected Potion effect to Player

        // if attacking
            // subtract health from the Enemy based on Player attack value
    // if Enemy turn
    } else {
        // subtract health from Player based on Enemy attack value
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        // display activity to user
        console.log(`You were attacked byu the ${this.currentEnemy.name}`);
        console.log(this.player.getHealth());
    }
};

// exports Game object
module.exports = Game;