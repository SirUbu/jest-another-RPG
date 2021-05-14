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

// handles start new battle logic
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

// handles battle logic
Game.prototype.battle = function() {
    // if Player turn
    if (this.isPlayerTurn) {
        // prompt user to attack or use a Potion
        inquirer
            .prompt({
              type: 'list',
              message: 'What would you like to do?',
              name: 'action',
              choices: ['Attack', 'Use Potion']  
            })
            // if using Potion
            .then(({ action }) => {
                if (action === 'Use Potion') {
                    // display list of Potion objects for user
                    if (!this.player.getInventory()) {
                        console.log("You don't have any potions!");

                        return this.checkEndOfBattle();
                    }

                    inquirer
                        .prompt({
                            type: 'list',
                            message: 'Which potion would you like to use?',
                            name: 'action',
                            choices: this.player.getInventory().map((item, index) => `${index + 1}: ${item.name}`)
                        })
                        // apply selected Potion effect to Player
                        .then(( { action }) => {
                            const potionDetails = action.split(': ');

                            this.player.usePotion(potionDetails[0] - 1);
                            console.log(`You used a ${potionDetails[1]} potion.`);

                            console.log("Your stats are as follows:");
                            console.table(this.player.getStats());

                            this.checkEndOfBattle();
                        });
                // if attacking
                } else {
                    // subtract health from the Enemy based on Player attack value
                    const damage = this.player.getAttackValue();
                    this.currentEnemy.reduceHealth(damage);

                    console.log(`You attacked the ${this.currentEnemy.name}.`);
                    console.log(this.currentEnemy.getHealth());

                    this.checkEndOfBattle();
                }
            });
    // if Enemy turn
    } else {
        // subtract health from Player based on Enemy attack value
        const damage = this.currentEnemy.getAttackValue();
        this.player.reduceHealth(damage);

        // display activity to user
        console.log(`You were attacked by the ${this.currentEnemy.name}.`);
        console.log(this.player.getHealth());

        this.checkEndOfBattle();
    }
};

// handles checking if battle needs to end or continue
Game.prototype.checkEndOfBattle = function() {
    // if both player and enemy alive, continue battle
    if (this.player.isAlive() && this.currentEnemy.isAlive()) {
        this.isPlayerTurn = !this.isPlayerTurn;
        this.battle();
    // if player alive and enemy dead
    } else if (this.player.isAlive() && !this.currentEnemy.isAlive()) {
        console.log(`You've defeated the ${this.currentEnemy.name}.`);

        // add enemy's 'dropped' potion to player inventory
        this.player.addPotion(this.currentEnemy.potion);
        console.log(`${this.player.name} found a ${this.currentEnemy.potion.name} potion.`);

        // increase round number
        this.roundNumber++;

        // check if all enemies have been defeated
        if (this.roundNumber < this.enemies.length) {
            this.currentEnemy = this.enemies[this.roundNumber];
            this.startNewBattle();
        } else {
            console.log('You have defeated all enemies! You Win!');
        }
    // player has been defeated
    } else {
        console.log("You've been defeated!");
    }
};

// exports Game object
module.exports = Game;