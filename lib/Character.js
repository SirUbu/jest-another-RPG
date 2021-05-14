// object constructor for a new character
class Character {
    constructor(name = '') {
        // assign passed in name
        this.name = name;
    
        // randomly assign attribute values
        this.health = Math.floor(Math.random() * 10 + 95);
        this.strength = Math.floor(Math.random() * 5 + 7);
        this.agility = Math.floor(Math.random() * 5 + 7);
    };
    // returns true if the character has health remaining and false if the character's health is 0
    isAlive() {
        if (this.health === 0) {
            return false;
        }
        return true;
    }
    
    // returns the character's health
    getHealth() {
        return `${this.name}'s health is now ${this.health}!`
    };
    
    // returns the character's random attack value
    getAttackValue() {
        const min = this.strength - 5;
        const max = this.strength + 5;
    
        return Math.floor(Math.random() * (min - max) + max);
    };
    
    // adjusts the character's health after reduction from damage
    reduceHealth(health) {
        this.health -= health;
    
        if (this.health < 0) {
            this.health = 0;
        }
    };
};

// exports Player object
module.exports = Character;