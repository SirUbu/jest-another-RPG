// object constructor for a new character
function Character() {};

// returns true if the character has health remaining and false if the character's health is 0
Character.prototype.isAlive = function() {
    if (this.health === 0) {
        return false;
    }
    return true;
}

// returns the character's health
Character.prototype.getHealth = function() {
    return `${this.name}'s health is now ${this.health}!`
};

// returns the character's random attack value
Character.prototype.getAttackValue = function() {
    const min = this.strength - 5;
    const max = this.strength + 5;

    return Math.floor(Math.random() * (min - max) + max);
};

// adjusts the character's health after reduction from damage
Character.prototype.reduceHealth = function(health) {
    this.health -= health;

    if (this.health < 0) {
        this.health = 0;
    }
};

// exports Player object
module.exports = Character;