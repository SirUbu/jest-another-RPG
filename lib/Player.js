// require the Potion object constructor
const Potion = require('../lib/Potion');

// object constructor for a new Player 
function Player(name = '') {
    // assign passed in name as player name
    this.name = name;

    // randomly assign attribute values
    this.health = Math.floor(Math.random() * 10 + 95);
    this.strength = Math.floor(Math.random() * 5 + 7);
    this.agility = Math.floor(Math.random() * 5 + 7);

    // add a health potion and a random potion to inventory
    this.inventory = [new Potion('health'), new Potion()];
};

// returns an object with various player properties
Player.prototype.getStats = function() {
    return {
        potions: this.inventory.length,
        health: this.health,
        strength: this.strength,
        agility: this.agility
    };
};

// returns the inventory array or false if empty
Player.prototype.getInventory = function() {
    if (this.inventory.length) {
        return this.inventory
    }
    return false;
};

// returns player's health
Player.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`
};

// returns true if player has health and false if health is 0
Player.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// adjusts player's health after reduction from damage
Player.prototype.reduceHealth = function(damage) {
    this.health -= damage;

    if (this.health < 0) {
        this.health = 0;
    }
};

// returns the player's random attack value
Player.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (min - max) + max);
};

// adds a new potion to the player's inventory
Player.prototype.addPotion = function(potion) {
    this.inventory.push(potion);
};

// modifies player's potion inventory after player uses a potion
Player.prototype.usePotion = function(index) {
    const potion = this.getInventory().splice(index, 1)[0];

    switch (potion.name) {
        case 'agility':
            this.agility += potion.value;
            break;
        case 'health':
            this.health += potion.value;
            break;
        case 'strength':
            this.strength += potion.value;
            break;
    }
};

// exports Player object
module.exports = Player;