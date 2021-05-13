// requires the Potion object constructor
const Potion = require('./Potion');

// object constructor for a new Enemy
function Enemy(name, weapon) {
    // assigns name, weapon, and random potion
    this.name = name;
    this.weapon = weapon;
    this.potion = new Potion();

    // randomly assigns attribute values
    this.health = Math.floor(Math.random() * 10 + 85);
    this.strength = Math.floor(Math.random() * 5 + 5);
    this.agility = Math.floor(Math.random() * 5 + 5);
};

// returns enemy's health
Enemy.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`
};

// returns true if enemy has health remaining and false if enemy's health is 0
Enemy.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
};

// adjusts enemy's health after reduction from damage
Enemy.prototype.reduceHealth = function(health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
};

// returns the enemy's random attack value
Enemy.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (min - max) + max);
};

// returns a description of the enemy object
Enemy.prototype.getDescription = function() {
    return `A ${this.name} holding a ${this.weapon} has appeared!`;
};

// exports Enemy object
module.exports = Enemy;